import { getCurrentScope, onScopeDispose, readonly, shallowRef } from 'vue';

/**
 * Copies text to the clipboard and remembers which item was copied for `resetMs`,
 * so UIs can show a temporary "Copied" state. Pass a `key` when several items share
 * one composable (e.g. one per color format); it defaults to the copied text.
 */
export function useCopyToClipboard(resetMs = 1500) {
    const copiedKey = shallowRef<string | null>(null);
    const error = shallowRef<string | null>(null);
    let resetTimer: ReturnType<typeof setTimeout> | undefined;

    async function copy(text: string, key = text): Promise<boolean> {
        clearTimeout(resetTimer);
        try {
            await navigator.clipboard.writeText(text);
        } catch {
            copiedKey.value = null;
            error.value = 'Could not copy to the clipboard.';
            return false;
        }
        error.value = null;
        copiedKey.value = key;
        resetTimer = setTimeout(() => {
            copiedKey.value = null;
        }, resetMs);
        return true;
    }

    function isCopied(key: string) {
        return copiedKey.value === key;
    }

    if (getCurrentScope()) onScopeDispose(() => clearTimeout(resetTimer));

    return {
        copy,
        isCopied,
        copiedKey: readonly(copiedKey),
        error: readonly(error),
    };
}
