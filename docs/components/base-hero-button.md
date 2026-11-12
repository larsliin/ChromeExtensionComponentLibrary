<script setup>
import BaseHeroButton from '../../src/components/BaseHeroButton.vue'
import './base-hero-button-example.css'
</script>

# BaseHeroButton

Large, glossy, full-width call-to-action. A single default slot gives you control over all button content and its layout.

<ComponentPreview>
  <BaseHeroButton class="hero-example-button">
    <span class="hero-example-icon" aria-hidden="true">
      <svg viewBox="0 0 16 16" fill="currentColor">
        <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708zM2 12.707l7-7L10.293 7l-7 7H2z" />
      </svg>
    </span>
    <span>
      <strong>Pick a color from screen</strong><br>
      <small>Click to start · Sample colors across your entire screen</small>
    </span>
  </BaseHeroButton>
  <BaseHeroButton class="hero-example-button" disabled>
    <span class="hero-example-icon" aria-hidden="true">
      <svg viewBox="0 0 16 16" fill="currentColor">
        <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708zM2 12.707l7-7L10.293 7l-7 7H2z" />
      </svg>
    </span>
    <span>
      <strong>Pick a color from screen</strong><br>
      <small>Unavailable in this version of Chrome</small>
    </span>
  </BaseHeroButton>
</ComponentPreview>

```vue
<BaseHeroButton class="hero-example-button" :disabled="!isAvailable" @click="pickColor">
  <span class="hero-example-icon" aria-hidden="true">
    <svg viewBox="0 0 16 16" fill="currentColor">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708zM2 12.707l7-7L10.293 7l-7 7H2z" />
    </svg>
  </span>
  <span>
    <strong>Pick a color from screen</strong><br>
    <small>Click to start · Sample colors across your entire screen</small>
  </span>
</BaseHeroButton>
```

The example uses the same 24px eyedropper inside a 48px tile with a 14px corner radius as the ColorPicker app. Add these example-specific styles to the consuming component's stylesheet (or its `<style scoped>` block):

<<< @/components/base-hero-button-example.css

## Slots

| Slot | Description |
|------|-------------|
| `default` | All button content, including any icons, title, caption, or custom layout |

Style slotted content in the consuming component. The button provides its surface, spacing, focus, pressed and disabled states, but does not wrap or style an icon, title or caption.

The former `icon` and `caption` named slots are no longer supported. Move their markup into the default slot and provide any content-specific styles in the parent. Keep content valid for a native button: use non-interactive content and do not nest links or controls.

Native attributes (`disabled`, `aria-label`, ...) and listeners fall through to the `<button>`.

## Tokens used

The surface, gradient, gloss, shadow, text, border and disabled surface tokens from `--color-hero-*`, plus `--color-focus` and `--font-family-base`. Override the `--color-hero-gradient-*` tokens to rebrand the surface. The shared icon and caption tokens remain available for use in consumer-owned content styles.
