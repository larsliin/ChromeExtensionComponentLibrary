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

function versionParts(version) {
    if (!/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.test(version)) {
        throw new Error(`Expected a stable major.minor.patch version, received: ${version}`);
    }
    const parts = version.split('.').map(Number);
    if (!parts.every(Number.isSafeInteger)) {
        throw new Error('Version exceeds the supported integer range.');
    }
    return parts;
}

export async function getReleasePlan({ github, context, version, bump }) {
    if (context.ref !== 'refs/heads/main') {
        throw new Error('Create packages from the main branch only.');
    }
    if (!['patch', 'minor', 'major'].includes(bump)) {
        throw new Error('Select patch, minor, or major.');
    }
    const source = versionParts(version);
    const latest = await find(() => github.rest.repos.getLatestRelease(context.repo));
    const published = latest ? versionParts(latest.tag_name.replace(/^v/, '')) : source;
    const difference = source.findIndex((part, index) => part !== published[index]);
    const base = difference >= 0 && source[difference] > published[difference] ? source : published;
    const baseVersion = base.join('.');
    const next = [...base];
    const index = { major: 0, minor: 1, patch: 2 }[bump];
    next[index]++;
    next.fill(0, index + 1);
    const nextVersion = next.join('.');
    versionParts(nextVersion);
    const tag = `v${nextVersion}`;
    const release = await find(() => github.rest.repos.getReleaseByTag({ ...context.repo, tag }));
    const ref = await find(() => github.rest.git.getRef({ ...context.repo, ref: `tags/${tag}` }));
    if (release || ref) {
        throw new Error(`${tag} already exists. Inspect the existing tag/release; it will not be overwritten.`);
    }
    return { baseVersion, version: nextVersion, tag };
}
