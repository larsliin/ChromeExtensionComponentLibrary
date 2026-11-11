<script setup>
import BaseHeroButton from '../../src/components/BaseHeroButton.vue'
</script>

# BaseHeroButton

Large, glossy call-to-action for a popup's primary action, e.g. "Pick a color from screen". Full width with an icon tile, title and caption.

<ComponentPreview>
  <BaseHeroButton>
    <template #icon>
      <svg viewBox="0 0 16 16" fill="currentColor"><path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708z" /></svg>
    </template>
    Pick a color from screen
    <template #caption>Click to start · Sample colors across your entire screen</template>
  </BaseHeroButton>
  <BaseHeroButton disabled>
    <template #icon>
      <svg viewBox="0 0 16 16" fill="currentColor"><path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708z" /></svg>
    </template>
    Pick a color from screen
    <template #caption>Unavailable in this version of Chrome</template>
  </BaseHeroButton>
</ComponentPreview>

```vue
<BaseHeroButton :disabled="!isAvailable" @click="pickColor">
  <template #icon><EyeDropperIcon /></template>
  Pick a color from screen
  <template #caption>Click to start · Sample colors across your entire screen</template>
</BaseHeroButton>
```

## Slots

| Slot | Description |
|------|-------------|
| `default` | Title |
| `caption` | Supporting line under the title |
| `icon` | Icon in the glossy tile. An `<svg>` is sized to 24px |

Native attributes (`disabled`, `aria-label`, ...) and listeners fall through to the `<button>`.

## Tokens used

All `--color-hero-*` tokens (surface gradient, gloss, shadows, icon tile, and the `--color-hero-disabled-*` set, which differs per theme), plus `--color-focus` and `--font-family-base`. Override the `--color-hero-gradient-*` tokens to rebrand the surface.
