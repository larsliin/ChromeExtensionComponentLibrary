async function find(request) {
    try {
        return (await request()).data;
    } catch (error) {
        if (error.status !== 404) {
            throw error;
        }
        return null;
    }
}

export async function getReleasePlan({ github, context, version }) {
    if (!/^\d+\.\d+\.\d+$/.test(version)) {
        throw new Error('Releases require a stable major.minor.patch version.');
    }
    const tag = `v${version}`;
    if (context.ref.startsWith('refs/tags/') && context.ref !== `refs/tags/${tag}`) {
        throw new Error('Release tag must match package.json version.');
    }
    const release = await find(() => github.rest.repos.getReleaseByTag({
        ...context.repo,
        tag,
    }));
    if (release) {
        const archive = `chrome-extension-component-library-${version}.tgz`;
        if (release.draft || !release.assets.some((asset) => asset.name === archive)) {
            throw new Error(`Release ${tag} exists but is incomplete. Inspect it manually; it will not be overwritten.`);
        }
        return { tag, publish: false };
    }

    const ref = await find(() => github.rest.git.getRef({
        ...context.repo,
        ref: `tags/${tag}`,
    }));
    if (ref) {
        let object = ref.object;
        while (object.type === 'tag') {
            const result = await github.rest.git.getTag({ ...context.repo, tag_sha: object.sha });
            object = result.data.object;
        }
        if (object.type !== 'commit' || object.sha !== context.sha) {
            throw new Error(`Tag ${tag} already points to a different commit. Rerun its original workflow or bump the version.`);
        }
    }
    return { tag, publish: true };
}
