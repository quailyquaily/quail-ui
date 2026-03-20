<script setup lang="ts">
import { computed, useSlots } from "vue";

const props = withDefaults(defineProps<{
  src?: string;
  alt?: string;
  ratio?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  topLabel?: string;
  bottomLabel?: string;
  caption?: string;
  crt?: boolean;
  showCorners?: boolean;
  showCoordinates?: boolean;
}>(), {
  src: "",
  alt: "",
  ratio: "12 / 5",
  objectFit: "cover",
  topLabel: "",
  bottomLabel: "",
  caption: "",
  crt: false,
  showCorners: true,
  showCoordinates: true,
});

const slots = useSlots();

const hasCaption = computed(() => !!slots.caption || !!props.caption);

const styleVars = computed(() => ({
  "--q-media-frame-ratio": props.ratio,
  "--q-media-frame-object-fit": props.objectFit,
}));

const cls = computed(() => {
  return [
    "q-media-frame",
    props.crt ? "crt" : "",
    props.showCorners ? "with-corners" : "",
    props.showCoordinates ? "with-coordinates" : "",
  ].filter(Boolean).join(" ");
});
</script>

<template>
  <figure :class="cls" :style="styleVars">
    <div v-if="showCoordinates && topLabel" class="q-media-frame-coordinate top">{{ topLabel }}</div>

    <div class="q-media-frame-shell">
      <div v-if="showCorners" class="q-media-frame-corner top-right"></div>
      <div v-if="showCorners" class="q-media-frame-corner bottom-left"></div>

      <div class="q-media-frame-content">
        <slot>
          <img
            v-if="src"
            class="q-media-frame-image"
            :src="src"
            :alt="alt"
          />
          <div v-else class="q-media-frame-placeholder">
            <span>Media</span>
          </div>
        </slot>

        <div v-if="crt" class="q-media-frame-overlay"></div>
      </div>
    </div>

    <div v-if="showCoordinates && bottomLabel" class="q-media-frame-coordinate bottom">{{ bottomLabel }}</div>

    <figcaption v-if="hasCaption" class="q-media-frame-caption">
      <slot name="caption">
        {{ caption }}
      </slot>
    </figcaption>
  </figure>
</template>

<style lang="scss">
.q-media-frame {
  position: relative;
  display: grid;
  gap: 0.75rem;
}

.q-media-frame-shell {
  position: relative;
  padding: var(--q-media-frame-padding);
  border: var(--q-media-frame-border-width) solid var(--q-media-frame-border-color);
  border-radius: var(--q-media-frame-radius);
  background: var(--q-media-frame-bg);
  box-shadow: var(--q-media-frame-shadow);
}

.q-media-frame-shell::before {
  content: "";
  position: absolute;
  inset: calc(var(--q-media-frame-padding) * -1);
  border: var(--q-media-frame-outer-border-width) solid var(--q-media-frame-outer-border-color);
  border-radius: calc(var(--q-media-frame-radius) + 2px);
  pointer-events: none;
}

.q-media-frame-content {
  position: relative;
  overflow: hidden;
  min-width: 0;
  border-radius: var(--q-media-frame-content-radius);
  background: color-mix(in srgb, var(--q-bg-light-2) 88%, white);
  aspect-ratio: var(--q-media-frame-ratio);
}

.q-media-frame-image,
.q-media-frame-content > :first-child {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: inherit;
}

.q-media-frame-image {
  object-fit: var(--q-media-frame-object-fit);
  filter: var(--q-media-frame-image-filter);
}

.q-media-frame-placeholder {
  display: grid;
  place-items: center;
  min-height: 100%;
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--q-c-blue-dimm-1) 55%, white), transparent 62%),
    linear-gradient(180deg, color-mix(in srgb, var(--q-bg-light-2) 88%, white), var(--q-bg-light));
  color: var(--q-media-frame-coordinate-color);
  font-family: var(--q-font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.q-media-frame-corner {
  position: absolute;
  z-index: 2;
  display: none;
  width: 24px;
  height: 24px;
  border: 3px solid var(--q-media-frame-corner-color);
  pointer-events: none;

  &.top-right {
    top: 8px;
    right: 8px;
    border-left: 0;
    border-bottom: 0;
  }

  &.bottom-left {
    left: 8px;
    bottom: 8px;
    border-right: 0;
    border-top: 0;
  }
}

.q-media-frame-coordinate {
  position: absolute;
  z-index: 3;
  padding: 0 0.35rem;
  background: var(--q-media-frame-coordinate-bg);
  color: var(--q-media-frame-coordinate-color);
  font-family: var(--q-font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;

  &.top {
    top: -0.8rem;
    left: 0;
  }

  &.bottom {
    right: 0;
    bottom: -0.8rem;
  }
}

.q-media-frame-caption {
  color: var(--q-c-dark-2);
  font-size: 0.9rem;
  line-height: 1.6;
}

.q-media-frame.crt .q-media-frame-shell {
  animation: q-media-frame-tear 4s ease-in-out infinite;
  animation-delay: 1.2s;
}

.q-media-frame.crt .q-media-frame-image,
.q-media-frame.crt .q-media-frame-placeholder,
.q-media-frame.crt .q-media-frame-content > :first-child {
  animation: q-media-frame-flicker 4s ease-in-out infinite;
  animation-delay: 1.2s;
}

.q-media-frame-overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  border-radius: inherit;
  pointer-events: none;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    var(--q-media-frame-overlay-line) 2px,
    var(--q-media-frame-overlay-line) 4px
  );
  animation: q-media-frame-scanlines 0.4s linear infinite;
}

.dark .q-media-frame {
  --q-media-frame-border-color: var(--q-c-light-4);
  --q-media-frame-outer-border-color: var(--q-c-light-5);
  --q-media-frame-bg: var(--q-bg-dark-2);
  --q-media-frame-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.22);
  --q-media-frame-corner-color: var(--q-c-light);
  --q-media-frame-coordinate-bg: var(--q-bg-dark);
  --q-media-frame-coordinate-color: var(--q-c-light-3);
  --q-media-frame-overlay-line: rgba(255, 255, 255, 0.06);
}

body[data-theme="morph"] .q-media-frame.with-corners .q-media-frame-corner,
body[data-theme="warm"] .q-media-frame.with-corners .q-media-frame-corner {
  display: block;
}

@media (max-width: 640px) {
  .q-media-frame.with-coordinates .q-media-frame-coordinate,
  .q-media-frame.with-corners .q-media-frame-corner {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .q-media-frame.crt .q-media-frame-shell,
  .q-media-frame.crt .q-media-frame-image,
  .q-media-frame.crt .q-media-frame-placeholder,
  .q-media-frame.crt .q-media-frame-content > :first-child,
  .q-media-frame.crt .q-media-frame-overlay {
    animation: none !important;
  }
}

@keyframes q-media-frame-flicker {
  0%,
  92%,
  100% {
    opacity: 1;
    filter: var(--q-media-frame-image-filter);
  }

  93% {
    opacity: 0.72;
    filter: saturate(0.55) contrast(1.24) brightness(1.08);
  }

  95% {
    opacity: 0.56;
    filter: saturate(0.28) contrast(1.38) brightness(0.88);
  }

  98% {
    opacity: 1;
    filter: var(--q-media-frame-image-filter);
  }
}

@keyframes q-media-frame-tear {
  0%,
  92%,
  100% {
    transform: skewX(0) translateX(0);
  }

  93% {
    transform: skewX(-0.45deg) translateX(-3px);
  }

  93.5% {
    transform: skewX(0.7deg) translateX(4px);
  }

  96.5% {
    transform: skewX(-0.55deg) translateX(-4px);
  }
}

@keyframes q-media-frame-scanlines {
  from {
    background-position: 0 0;
  }

  to {
    background-position: 0 4px;
  }
}
</style>
