<script setup lang="ts">
import { computed, useSlots } from "vue";

const props = withDefaults(defineProps<{
  variant?: "default" | "dashed" | "annotated" | "tile";
  hoverable?: boolean;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  marker?: string;
  markerStyle?: "plate" | "chip";
}>(), {
  variant: "default",
  hoverable: false,
  eyebrow: "",
  title: "",
  subtitle: "",
  marker: "",
  markerStyle: "chip",
});

const slots = useSlots();

const hasHeader = computed(() => !!slots.header || !!props.eyebrow || !!props.title || !!props.subtitle);
const hasMedia = computed(() => !!slots.media);
const hasFooter = computed(() => !!slots.footer);
const markerParts = computed(() => {
  const [number = "", ...rest] = props.marker
    .split("/")
    .map((part) => part.trim())
    .filter(Boolean);

  return {
    number,
    type: rest.join(" / "),
  };
});
const hasChipMarker = computed(() => props.variant === "annotated" && props.markerStyle === "chip" && !!props.marker);
const hasPlateMarker = computed(() => props.variant === "annotated" && props.markerStyle === "plate" && !!markerParts.value.number);
const hasMarker = computed(() => hasChipMarker.value || hasPlateMarker.value);
const hasTileCode = computed(() => props.variant === "tile" && !!props.marker);
const hasLeader = computed(() => hasMarker.value);

const cls = computed(() => {
  return [
    "q-card",
    `q-card-${props.variant}`,
    props.hoverable ? "q-card-hoverable" : "",
    hasMedia.value ? "q-card-with-media" : "",
    hasMarker.value ? `q-card-marker-${props.markerStyle}` : "",
  ].filter(Boolean).join(" ");
});
</script>

<template>
  <div :class="cls">
    <div v-if="hasChipMarker" class="q-card-marker">{{ marker }}</div>
    <div v-else-if="hasPlateMarker" class="q-card-spec-plate">
      <span class="q-card-spec-number">{{ markerParts.number }}</span>
      <span v-if="markerParts.type" class="q-card-spec-type">{{ markerParts.type }}</span>
    </div>
    <div v-if="hasLeader" class="q-card-leader-line"></div>
    <div v-if="hasTileCode" class="q-card-tile-code">{{ marker }}</div>

    <div v-if="hasMedia" class="q-card-media">
      <slot name="media"></slot>
    </div>

    <div class="q-card-body">
      <div v-if="hasHeader" class="q-card-header">
        <slot name="header">
          <div v-if="eyebrow" class="q-card-eyebrow">{{ eyebrow }}</div>
          <h3 v-if="title" class="q-card-title">{{ title }}</h3>
          <p v-if="subtitle" class="q-card-subtitle">{{ subtitle }}</p>
        </slot>
      </div>

      <div class="q-card-content">
        <slot></slot>
      </div>
    </div>

    <div v-if="hasFooter" class="q-card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style lang="scss">
.q-card {
  position: relative;
  display: grid;
  gap: var(--q-card-gap);
  min-width: 0;
  padding: var(--q-card-padding);
  border: var(--q-card-border-width) solid var(--q-card-border-color);
  border-radius: var(--q-card-radius);
  background: var(--q-card-bg);
  box-shadow: var(--q-card-shadow);
  transition:
    border-color 0.18s ease,
    background-color 0.18s ease,
    box-shadow 0.18s ease;

  &.q-card-default,
  &.q-card-dashed,
  &.q-card-annotated {
    min-height: 210px;
  }

  &.q-card-hoverable:hover {
    border-color: var(--q-card-accent);
    box-shadow: 0 10px 24px color-mix(in srgb, var(--q-card-accent-soft) 22%, transparent);
  }

  &.q-card-dashed {
    border-style: dashed;
    background: var(--q-card-muted-bg);
  }

  &.q-card-tile {
    min-height: 116px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    background: var(--q-card-catalog-bg);

    .q-card-body {
      align-items: center;
      text-align: center;
      gap: 6px;
    }

    .q-card-title {
      font-family: var(--q-font-sans);
      font-size: 1rem;
      font-weight: 600;
      letter-spacing: 0;
      line-height: 1.25;
    }

    .q-card-subtitle {
      max-width: 22ch;
      font-size: 0.84rem;
      line-height: 1.45;
    }
  }
}

.q-card-marker {
  display: none;
}

.q-card-leader-line {
  display: none;
}

.q-card-spec-plate {
  display: none;
}

.q-card-spec-number,
.q-card-spec-type {
  display: none;
}

.q-card-tile-code {
  display: none;
}

.q-card-media {
  min-width: 0;
}

.q-card-body,
.q-card-header {
  display: grid;
  gap: 0.5rem;
  min-width: 0;
}

.q-card-footer {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 12px;
  align-items: flex-start;
}

.q-card-eyebrow {
  font-family: var(--q-font-mono);
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--q-card-eyebrow-color);
}

.q-card-title {
  margin: 0;
  color: var(--q-card-title-color);
  font-family: var(--q-card-title-font-family);
  font-size: clamp(1.25rem, 2.1vw, 1.65rem);
  font-weight: 600;
  line-height: 1.02;
  letter-spacing: -0.03em;
}

.q-card-subtitle,
.q-card-content {
  color: var(--q-card-subtitle-color);
  font-size: 0.97rem;
  line-height: 1.68;
}

.q-card-subtitle {
  margin: 0;
}

.dark .q-card {
  --q-card-border-color: color-mix(in srgb, var(--q-c-light-4) 78%, transparent);
  --q-card-bg: color-mix(in srgb, var(--q-bg-dark-2) 92%, black);
  --q-card-title-color: var(--q-c-light);
  --q-card-subtitle-color: var(--q-c-light-2);
  --q-card-eyebrow-color: var(--q-c-light-3);
  --q-card-accent: var(--q-c-light-2);
  --q-card-accent-soft: rgba(250, 250, 250, 0.14);
  --q-card-catalog-bg: color-mix(in srgb, var(--q-bg-dark-2) 84%, black);
  --q-card-catalog-hover-bg: color-mix(in srgb, var(--q-bg-dark-2) 74%, black);
  --q-card-muted-bg: rgba(255, 255, 255, 0.02);
}

body[data-theme="morph"] .q-card,
body[data-theme="warm"] .q-card {
  --q-card-radius: 2px;
  --q-card-border-width: 1px;

  &.q-card-default.q-card-hoverable:hover,
  &.q-card-annotated.q-card-hoverable:hover {
    box-shadow: 0 4px 20px color-mix(in srgb, var(--q-card-accent-soft) 42%, transparent);
  }

  &.q-card-default::before,
  &.q-card-default::after,
  &.q-card-dashed::before,
  &.q-card-dashed::after,
  &.q-card-annotated::before,
  &.q-card-annotated::after {
    content: "";
    position: absolute;
    width: 12px;
    height: 12px;
    border: 2px solid var(--q-card-accent);
    transition: inherit;
    pointer-events: none;
  }

  &.q-card-default::before,
  &.q-card-dashed::before,
  &.q-card-annotated::before {
    top: -1px;
    left: -1px;
    border-right: 0;
    border-bottom: 0;
  }

  &.q-card-default::after,
  &.q-card-dashed::after,
  &.q-card-annotated::after {
    right: -1px;
    bottom: -1px;
    border-left: 0;
    border-top: 0;
  }

  &.q-card-default.q-card-hoverable:hover::before,
  &.q-card-default.q-card-hoverable:hover::after,
  &.q-card-dashed.q-card-hoverable:hover::before,
  &.q-card-dashed.q-card-hoverable:hover::after,
  &.q-card-annotated.q-card-hoverable:hover::before,
  &.q-card-annotated.q-card-hoverable:hover::after {
    width: 16px;
    height: 16px;
  }

  &.q-card-dashed {
    background: transparent;
  }

  &.q-card-annotated {
    overflow: visible;
  }

  &.q-card-annotated.q-card-marker-plate {
    padding-top: calc(var(--q-card-padding) + 10px);
  }

  &.q-card-dashed.q-card-hoverable:hover {
    background: var(--q-card-muted-bg);
    border-style: solid;
    box-shadow: none;
  }

  &.q-card-tile {
    border-style: dashed;
    background: var(--q-card-catalog-bg);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
  }

  &.q-card-tile .q-card-tile-code {
    top: 4px;
    left: 6px;
    padding: 0;
    min-height: auto;
    font-size: 0.52rem;
    color: var(--q-card-marker-color);
    opacity: 0.6;
  }

  &.q-card-tile.q-card-hoverable:hover {
    background: var(--q-card-catalog-hover-bg);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    box-shadow: none;
  }

  &.q-card-tile.q-card-hoverable:hover .q-card-tile-code {
    opacity: 1;
  }

  &.q-card-marker-plate .q-card-spec-plate {
    top: -1px;
    left: 20px;
    align-items: center;
    gap: 0.45rem;
    padding: 0 0.55rem;
    background: var(--q-card-marker-bg);
  }

  &.q-card-marker-plate .q-card-spec-number {
    padding: 2px 6px;
    background: var(--q-card-marker-color);
    color: var(--q-card-marker-bg);
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.12em;
  }

  &.q-card-marker-plate .q-card-spec-type {
    color: var(--q-card-marker-color);
    font-size: 0.65rem;
    font-weight: 500;
    letter-spacing: 0.12em;
  }

  &.q-card-marker-chip .q-card-marker {
    top: -7px;
    left: 20px;
    transform: none;
    padding: 0 6px;
    min-height: auto;
    background: var(--q-card-marker-bg);
  }
}

body[data-theme="morph"] .q-card-marker,
body[data-theme="morph"] .q-card-spec-plate,
body[data-theme="morph"] .q-card-spec-number,
body[data-theme="morph"] .q-card-spec-type,
body[data-theme="morph"] .q-card-tile-code,
body[data-theme="warm"] .q-card-marker,
body[data-theme="warm"] .q-card-spec-plate,
body[data-theme="warm"] .q-card-spec-number,
body[data-theme="warm"] .q-card-spec-type,
body[data-theme="warm"] .q-card-tile-code {
  display: block;
  position: absolute;
  z-index: 2;
  font-family: var(--q-font-mono);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--q-card-marker-color);
}

body[data-theme="morph"] .q-card-spec-plate,
body[data-theme="warm"] .q-card-spec-plate {
  display: flex;
  position: absolute;
  z-index: 2;
}

body[data-theme="morph"] .q-card-spec-number,
body[data-theme="morph"] .q-card-spec-type,
body[data-theme="warm"] .q-card-spec-number,
body[data-theme="warm"] .q-card-spec-type {
  display: block;
  position: static;
  font-family: var(--q-font-mono);
  text-transform: uppercase;
  white-space: nowrap;
}

body[data-theme="morph"] .q-card-leader-line,
body[data-theme="warm"] .q-card-leader-line {
  display: block;
  position: absolute;
  top: 50%;
  left: -30px;
  width: 25px;
  height: 1px;
  background: var(--q-card-accent);

  &::before {
    content: "";
    position: absolute;
    right: -1px;
    top: -3px;
    border: 3px solid transparent;
    border-left: 5px solid var(--q-card-accent);
  }

  &::after {
    content: "";
    position: absolute;
    left: -4px;
    top: -3px;
    width: 6px;
    height: 6px;
    border: 1px solid var(--q-card-accent);
    border-radius: 50%;
    background: var(--q-card-marker-bg);
  }
}

body[data-theme="morph"] .q-card-eyebrow::before,
body[data-theme="warm"] .q-card-eyebrow::before {
  content: "▷";
  display: inline-block;
  margin-right: 8px;
  transform: translateY(-1px);
}

@media (max-width: 640px) {
  body[data-theme="morph"] .q-card.q-card-annotated,
  body[data-theme="warm"] .q-card.q-card-annotated {
    overflow: hidden;
  }

  body[data-theme="morph"] .q-card-leader-line,
  body[data-theme="warm"] .q-card-leader-line {
    display: none;
  }
}
</style>
