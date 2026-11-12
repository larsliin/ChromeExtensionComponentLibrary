<script setup>
import BaseHeroButton from '../../src/components/BaseHeroButton.vue'
</script>

# BaseHeroButton

Large, glossy, full-width call-to-action. A single default slot gives you control over all button content and its layout.

<ComponentPreview>
  <BaseHeroButton>
    <i class="bi bi-eyedropper" aria-hidden="true" />
    <span>
      <strong>Pick a color from screen</strong><br>
      <small>Click to start · Sample colors across your entire screen</small>
    </span>
  </BaseHeroButton>
  <BaseHeroButton disabled>
    <i class="bi bi-eyedropper" aria-hidden="true" />
    <span>
      <strong>Pick a color from screen</strong><br>
      <small>Unavailable in this version of Chrome</small>
    </span>
  </BaseHeroButton>
</ComponentPreview>

```vue
<BaseHeroButton :disabled="!isAvailable" @click="pickColor">
  <i class="bi bi-eyedropper" aria-hidden="true" />
  <span>
    <strong>Pick a color from screen</strong><br>
    <small>Click to start · Sample colors across your entire screen</small>
  </span>
</BaseHeroButton>
```

## Slots

| Slot | Description |
|------|-------------|
| `default` | All button content, including any icons, title, caption, or custom layout |

Style slotted content in the consuming component. The button provides its surface, spacing, focus, pressed and disabled states, but does not wrap or style an icon, title or caption.

The former `icon` and `caption` named slots are no longer supported. Move their markup into the default slot and provide any content-specific styles in the parent. Keep content valid for a native button: use non-interactive content and do not nest links or controls.

Native attributes (`disabled`, `aria-label`, ...) and listeners fall through to the `<button>`.

## Tokens used

The surface, gradient, gloss, shadow, text, border and disabled surface tokens from `--color-hero-*`, plus `--color-focus` and `--font-family-base`. Override the `--color-hero-gradient-*` tokens to rebrand the surface. The shared icon and caption tokens remain available for use in consumer-owned content styles.
