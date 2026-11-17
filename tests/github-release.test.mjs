import assert from 'node:assert/strict';
import test from 'node:test';
import { getReleasePlan } from '../scripts/github-release.mjs';

const context = { repo: { owner: 'example', repo: 'library' }, ref: 'refs/heads/main' };

function client({ latest, release, ref } = {}) {
    async function response(data) {
        if (data instanceof Error) {
            throw data;
        }
        if (data === undefined) {
            throw Object.assign(new Error('Not found'), { status: 404 });
        }
        return { data };
    }
    return {
        rest: {
            repos: {
                getLatestRelease: () => response(latest),
                getReleaseByTag: () => response(release),
            },
            git: { getRef: () => response(ref) },
        },
    };
}

test('each bump is calculated from the published version rather than stale source files', async () => {
    for (const [bump, version] of [['patch', '0.2.5'], ['minor', '0.3.0'], ['major', '1.0.0']]) {
        const github = client({ latest: { tag_name: 'v0.2.4' } });
        assert.deepEqual(await getReleasePlan({ github, context, version: '0.1.3', bump }), {
            baseVersion: '0.2.4', version, tag: `v${version}`,
        });
    }
});

test('the first release and a newer source version provide a valid version baseline', async () => {
    for (const github of [client(), client({ latest: { tag_name: 'v0.1.0' } })]) {
        const plan = await getReleasePlan({ github, context, version: '0.1.3', bump: 'patch' });
        assert.equal(plan.version, '0.1.4');
    }
});

test('existing releases and unpublished tags are never overwritten', async () => {
    for (const github of [client({ release: {} }), client({ ref: {} })]) {
        await assert.rejects(
            getReleasePlan({ github, context, version: '0.1.3', bump: 'patch' }),
            /v0\.1\.4 already exists/,
        );
    }
});

test('invalid input, non-main branches, and API failures stop publishing explicitly', async () => {
    const options = { github: client(), context, version: '0.1.3', bump: 'patch' };
    await assert.rejects(getReleasePlan({ ...options, bump: 'invalid' }), /Select patch/);
    await assert.rejects(getReleasePlan({ ...options, version: '0.1.3-beta' }), /stable/);
    await assert.rejects(getReleasePlan({ ...options, context: { ...context, ref: 'refs/heads/feature' } }), /main branch/);
    const forbidden = Object.assign(new Error('Forbidden'), { status: 403 });
    await assert.rejects(getReleasePlan({ ...options, github: client({ latest: forbidden }) }), forbidden);
});
