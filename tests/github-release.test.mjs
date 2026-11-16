import assert from 'node:assert/strict';
import test from 'node:test';
import { getReleasePlan } from '../scripts/github-release.mjs';

const context = {
    repo: { owner: 'example', repo: 'library' },
    ref: 'refs/heads/main',
    sha: 'version-commit',
};

function client({ release, ref, tag } = {}) {
    function response(data) {
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
            repos: { getReleaseByTag: async () => response(release) },
            git: {
                getRef: async () => response(ref),
                getTag: async () => response(tag),
            },
        },
    };
}

test('a main-branch push with an unpublished version plans a new release', async () => {
    assert.deepEqual(await getReleasePlan({ github: client(), context, version: '0.1.2' }), {
        tag: 'v0.1.2',
        publish: true,
    });
});

test('normal pushes do not republish a version whose archive already exists', async () => {
    const github = client({
        release: { draft: false, assets: [{ name: 'chrome-extension-component-library-0.1.2.tgz' }] },
    });
    assert.deepEqual(await getReleasePlan({ github, context, version: '0.1.2' }), {
        tag: 'v0.1.2',
        publish: false,
    });
});

test('an existing annotated tag can be published only from its original commit', async () => {
    const github = client({
        ref: { object: { type: 'tag', sha: 'annotated-tag' } },
        tag: { object: { type: 'commit', sha: context.sha } },
    });
    const plan = await getReleasePlan({ github, context, version: '0.1.2' });
    assert.equal(plan.publish, true);

    await assert.rejects(
        getReleasePlan({ github, context: { ...context, sha: 'different-commit' }, version: '0.1.2' }),
        /already points to a different commit/,
    );
});

test('manual tag pushes must match the package version', async () => {
    await assert.rejects(
        getReleasePlan({ github: client(), context: { ...context, ref: 'refs/tags/v0.1.1' }, version: '0.1.2' }),
        /must match package.json version/,
    );
});

test('API permission failures are surfaced rather than treated as missing releases', async () => {
    const error = Object.assign(new Error('Forbidden'), { status: 403 });
    await assert.rejects(
        getReleasePlan({ github: client({ release: error }), context, version: '0.1.2' }),
        error,
    );
    await assert.rejects(
        getReleasePlan({ github: client({ ref: error }), context, version: '0.1.2' }),
        error,
    );
});

test('an incomplete existing release fails explicitly instead of overwriting it', async () => {
    await assert.rejects(
        getReleasePlan({ github: client({ release: { draft: true, assets: [] } }), context, version: '0.1.2' }),
        /exists but is incomplete/,
    );
});
