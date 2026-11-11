<script setup>
import BaseHeroButton from '../../src/components/BaseHeroButton.vue'
</script>

# BaseHeroButton

Large, glossy call-to-action for a popup's primary action, e.g. "Pick a color from screen". Full width with an icon tile, title and caption.

<ComponentPreview>
  <BaseHeroButton>
    <template #icon>
      <i class="bi bi-eyedropper" aria-hidden="true" />
    </template>
    Pick a color from screen
    <template #caption>Click to start · Sample colors across your entire screen</template>
  </BaseHeroButton>
  <BaseHeroButton disabled>
    <template #icon>
      <i class="bi bi-eyedropper" aria-hidden="true" />
    </template>
    Pick a color from screen
    <template #caption>Unavailable in this version of Chrome</template>
  </BaseHeroButton>
</ComponentPreview>

```vue
<BaseHeroButton :disabled="!isAvailable" @click="pickColor">
  <template #icon><i class="bi bi-eyedropper" aria-hidden="true" /></template>
  Pick a color from screen
  <template #caption>Click to start · Sample colors across your entire screen</template>
</BaseHeroButton>
```

## Slots

| Slot | Description |
|------|-------------|
| `default` | Title |
| `caption` | Supporting line under the title |
| `icon` | Bootstrap Icon in the glossy tile, sized to 24px |

Native attributes (`disabled`, `aria-label`, ...) and listeners fall through to the `<button>`.

## Tokens used

All `--color-hero-*` tokens (surface gradient, gloss, shadows, icon tile, and the `--color-hero-disabled-*` set, which differs per theme), plus `--color-focus` and `--font-family-base`. Override the `--color-hero-gradient-*` tokens to rebrand the surface.
