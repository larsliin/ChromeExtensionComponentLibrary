import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { createInterface } from 'node:readline/promises';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const usage = 'Usage: npm run release -- [patch|minor|major] (default: patch)';

function run(command, args, capture = false) {
    const result = spawnSync(command, args, {
        cwd: root,
        encoding: 'utf8',
        stdio: capture ? 'pipe' : 'inherit',
    });
    if (result.error) {
        throw result.error;
    }
    if (result.status !== 0) {
        throw new Error(`Command failed: ${command} ${args.join(' ')}\n${result.stderr ?? ''}`);
    }
    if (capture) {
        return result.stdout.trim();
    }
}

const git = (...args) => run('git', args, true);

function requireCleanTree() {
    if (git('status', '--porcelain')) {
        throw new Error('The working tree must be clean. Commit or stash your changes first.');
    }
}

async function confirm(question) {
    const prompt = createInterface({ input: process.stdin, output: process.stdout });
    try {
        return (await prompt.question(`${question} (yes/No): `)).trim().toLowerCase() === 'yes';
    } finally {
        prompt.close();
    }
}

async function release() {
    const [bump = 'patch', ...extra] = process.argv.slice(2);
    if (bump === '--help' && extra.length === 0) {
        console.log(usage);
        return;
    }
    if (!['patch', 'minor', 'major'].includes(bump) || extra.length > 0) {
        throw new Error(usage);
    }
    if (!process.env.npm_execpath) {
        throw new Error(`Run this script through npm. ${usage}`);
    }
    const npm = (...args) => run(process.execPath, [process.env.npm_execpath, ...args]);
    requireCleanTree();
    if (git('branch', '--show-current') !== 'main') {
        throw new Error('Release from the main branch, not a feature branch or detached HEAD.');
    }
    git('var', 'GIT_AUTHOR_IDENT');
    git('var', 'GIT_COMMITTER_IDENT');
    run('git', ['fetch', 'origin', 'refs/heads/main:refs/remotes/origin/main', '--tags']);
    if (Number(git('rev-list', '--count', 'HEAD..refs/remotes/origin/main')) > 0) {
        throw new Error('Local main is behind or diverged from origin/main. Sync it before releasing.');
    }

    const { version } = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
    if (!/^\d+\.\d+\.\d+$/.test(version)) {
        throw new Error('Automatic releases require a stable major.minor.patch version, not a prerelease.');
    }
    const parts = version.split('.').map(Number);
    const index = { major: 0, minor: 1, patch: 2 }[bump];
    parts[index]++;
    parts.fill(0, index + 1);
    if (!parts.every(Number.isSafeInteger)) {
        throw new Error('The next version exceeds the supported integer range.');
    }
    const nextVersion = parts.join('.');
    const tag = `v${nextVersion}`;
    if (git('tag', '--list', tag)) {
        throw new Error(`Tag ${tag} already exists. Existing releases are never overwritten.`);
    }

    console.log(`Release ${version} -> ${nextVersion} (${bump})`);
    npm('test');
    requireCleanTree();
    if (!await confirm(`Create version commit and tag ${tag}?`)) {
        console.log('Release cancelled. No version commit or tag was created.');
        return;
    }
    npm(
        'version', nextVersion,
        '--git-tag-version',
        '--tag-version-prefix=v',
        '--message=chore(release): %s\n\nCo-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>',
    );

    const pushArgs = ['push', '--atomic', 'origin', 'HEAD:refs/heads/main', `refs/tags/${tag}`];
    if (await confirm(`Push commit and tag ${tag} to origin to publish the GitHub Release?`)) {
        run('git', pushArgs);
        console.log('Pushed. GitHub Actions will build, test, and publish the package.');
    } else {
        console.log(`Release kept locally. To publish it later:\ngit ${pushArgs.join(' ')}`);
    }
    console.log(
        '\nAfter the GitHub Release workflow succeeds, run this in a consuming project:\n'
        + `npm install https://github.com/larsliin/ChromeExtensionComponentLibrary/releases/download/${tag}/chrome-extension-component-library-${nextVersion}.tgz`,
    );
}

release().catch((error) => {
    console.error(`Release failed: ${error.message}\nReview git status before retrying.`);
    process.exitCode = 1;
});
