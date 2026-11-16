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
    if (!await confirm(`Prepare version files for ${tag}?`)) {
        console.log('Release cancelled. No version files were changed.');
        return;
    }
    npm('version', nextVersion, '--no-git-tag-version');

    console.log(
        '\nVersion files prepared. Nothing was committed, tagged, or pushed.\n'
        + 'Please review and commit the version files, then push them yourself:\n'
        + 'git add package.json package-lock.json\n'
        + `git commit -m "chore(release): ${nextVersion}"\n`
        + 'git push origin main\n'
        + `\nGitHub Actions creates tag ${tag} at your pushed version commit and publishes the package.\n`
        + 'No manual tag command is needed. Do not rerun this script just to publish the prepared version.',
    );
    console.log(
        '\nAfter the GitHub Release workflow succeeds, run this in a consuming project:\n'
        + `npm install https://github.com/larsliin/ChromeExtensionComponentLibrary/releases/download/${tag}/chrome-extension-component-library-${nextVersion}.tgz`,
    );
}

release().catch((error) => {
    console.error(`Release failed: ${error.message}\nReview git status before retrying.`);
    process.exitCode = 1;
});
