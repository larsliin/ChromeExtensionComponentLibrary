import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import { once } from 'node:events';
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';

function command(cwd, executable, args) {
    const result = spawnSync(executable, args, { cwd, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    return result.stdout.trim();
}

function fixture(t, testScript = 'node -e "process.exit(0)"') {
    const root = mkdtempSync(join(tmpdir(), 'library-release-'));
    t.after(() => rmSync(root, { recursive: true, force: true }));
    const repo = join(root, 'library');
    const remote = join(root, 'remote.git');
    mkdirSync(join(repo, 'scripts'), { recursive: true });
    copyFileSync(new URL('../scripts/release.mjs', import.meta.url), join(repo, 'scripts', 'release.mjs'));
    const pkg = { name: 'release-fixture', version: '0.1.0', scripts: { test: testScript } };
    writeFileSync(join(repo, 'package.json'), JSON.stringify(pkg));
    writeFileSync(join(repo, 'package-lock.json'), JSON.stringify({
        name: pkg.name,
        version: pkg.version,
        lockfileVersion: 3,
        packages: { '': { name: pkg.name, version: pkg.version } },
    }));
    const git = (...args) => command(repo, 'git', args);
    git('init', '--initial-branch=main');
    git('config', 'user.name', 'Release Test');
    git('config', 'user.email', 'release-test@example.invalid');
    git('config', 'commit.gpgsign', 'false');
    git('config', 'tag.gpgsign', 'false');
    git('config', 'core.hooksPath', join(root, 'no-hooks'));
    git('add', '.');
    git('commit', '-m', 'Initial fixture');
    git('init', '--bare', remote);
    git('remote', 'add', 'origin', remote);
    git('push', '-u', 'origin', 'main');
    return { repo, git, initialCommit: git('rev-parse', 'HEAD') };
}

async function release(repo, answers = [], bump = 'patch') {
    const child = spawn(process.execPath, [join(repo, 'scripts', 'release.mjs'), bump], {
        cwd: repo,
        env: process.env,
        timeout: 30000,
        stdio: ['pipe', 'pipe', 'pipe'],
    });
    let output = '';
    let answered = false;
    const collect = (chunk) => {
        output += chunk.toString();
        if (!answered && answers.length > 0 && output.includes('Prepare version files')) {
            child.stdin.write(`${answers[0]}\n`);
            answered = true;
        }
    };
    child.stdout.on('data', collect);
    child.stderr.on('data', collect);
    const [code, signal] = await once(child, 'close');
    assert.equal(signal, null, output);
    return { code, output };
}

for (const scenario of [
    {
        name: 'uncommitted source changes',
        prepare: ({ repo }) => writeFileSync(join(repo, 'uncommitted.txt'), 'change'),
        error: /working tree must be clean/i,
    },
    {
        name: 'an existing next-version tag',
        prepare: ({ git }) => git('tag', 'v0.1.1'),
        error: /tag v0\.1\.1 already exists/i,
    },
    {
        name: 'failing library tests',
        testScript: 'node -e "process.exit(1)"',
        error: /command failed/i,
    },
]) {
    test(`release refuses ${scenario.name} without creating a version commit`, async (t) => {
        const state = fixture(t, scenario.testScript);
        scenario.prepare?.(state);
        const result = await release(state.repo);
        assert.equal(result.code, 1, result.output);
        assert.match(result.output, scenario.error);
        assert.equal(state.git('rev-parse', 'HEAD'), state.initialCommit);
        assert.equal(JSON.parse(readFileSync(join(state.repo, 'package.json'))).version, '0.1.0');
    });
}

test('declining version creation leaves the repository unchanged', async (t) => {
    const { repo, git, initialCommit } = fixture(t);
    const result = await release(repo, ['no']);
    assert.equal(result.code, 0, result.output);
    assert.equal(git('rev-parse', 'HEAD'), initialCommit);
    assert.equal(git('tag', '--list'), '');
    assert.equal(git('status', '--porcelain'), '');
});

test('release prepares matching version files and reminds the user to commit and push without manual tags', async (t) => {
    const { repo, git, initialCommit } = fixture(t);
    const result = await release(repo, ['yes']);
    assert.equal(result.code, 0, result.output);
    assert.equal(JSON.parse(readFileSync(join(repo, 'package.json'))).version, '0.1.1');
    const lock = JSON.parse(readFileSync(join(repo, 'package-lock.json')));
    assert.equal(lock.version, '0.1.1');
    assert.equal(lock.packages[''].version, '0.1.1');
    assert.equal(git('rev-parse', 'HEAD'), initialCommit);
    assert.equal(git('tag', '--list'), '');
    assert.equal(git('diff', '--cached', '--name-only'), '');
    assert.deepEqual(git('diff', '--name-only').split('\n').sort(), ['package-lock.json', 'package.json']);
    assert.match(git('ls-remote', 'origin', 'refs/heads/main'), new RegExp(initialCommit));
    assert.equal(git('ls-remote', '--tags', 'origin'), '');
    assert.match(result.output, /Please review and commit the version files/);
    const commit = result.output.indexOf('git commit -m "chore(release): 0.1.1"');
    const push = result.output.indexOf('git push origin main');
    assert.ok(commit >= 0 && push > commit, result.output);
    assert.doesNotMatch(result.output, /git tag|refs\/tags\//);
    assert.match(result.output, /GitHub Actions creates tag v0\.1\.1/);
});

test('minor releases also remain uncommitted and print the correct version-specific instructions', async (t) => {
    const { repo, git, initialCommit } = fixture(t);
    const result = await release(repo, ['yes'], 'minor');
    assert.equal(result.code, 0, result.output);
    assert.equal(JSON.parse(readFileSync(join(repo, 'package.json'))).version, '0.2.0');
    assert.equal(git('rev-parse', 'HEAD'), initialCommit);
    assert.equal(git('tag', '--list'), '');
    assert.match(git('ls-remote', 'origin', 'refs/heads/main'), new RegExp(initialCommit));
    assert.equal(git('ls-remote', '--tags', 'origin'), '');
    assert.match(result.output, /GitHub Actions creates tag v0\.2\.0/);
    assert.match(result.output, /releases\/download\/v0\.2\.0\/chrome-extension-component-library-0\.2\.0\.tgz/);
});
