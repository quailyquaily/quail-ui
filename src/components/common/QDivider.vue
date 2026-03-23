<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(defineProps<{
  label?: string;
  focus?: boolean;
  double?: boolean;
}>(), {
  label: "",
  focus: false,
  double: false,
});

const cls = computed(() => {
  return [
    "q-divider",
    props.label ? "q-divider-labeled" : "",
    props.focus ? "q-divider-focus" : "",
    props.double ? "q-divider-double" : "",
  ].filter(Boolean).join(" ");
});
</script>

<template>
  <div :class="cls" role="separator" :aria-label="label || undefined">
    <span v-if="label" class="q-divider-label">{{ label }}</span>
  </div>
</template>

<style lang="scss">
.q-divider {
  position: relative;
  width: 100%;
  min-height: 1px;
  border-top: var(--q-divider-line-width) solid var(--q-divider-border-color);

  &.q-divider-focus {
    border-top: 4px solid var(--q-divider-accent-color);
    border-radius: 0.5rem;
  }

  &.q-divider-double {
    height: 4px;
    border-bottom: var(--q-divider-line-width) solid var(--q-divider-border-color);
  }

  &.q-divider-labeled {
    display: flex;
    align-items: center;
    gap: var(--q-divider-label-gap);
    min-height: auto;
    border-top: none;
  }

  &.q-divider-labeled::after {
    content: "";
    flex: 1;
    min-width: var(--q-divider-label-min-width);
    border-top: var(--q-divider-label-line-width) solid var(--q-divider-border-color);
  }

  &.q-divider-labeled.q-divider-focus::after {
    border-top-color: var(--q-divider-accent-color);
  }
}

.q-divider-label {
  display: inline-flex;
  align-items: center;
  flex: none;
  min-height: 1em;
  padding: 0;
  background: var(--q-divider-label-bg);
  color: var(--q-divider-label-color);
  font-family: var(--q-font-mono);
  font-size: var(--q-divider-label-font-size);
  font-weight: 600;
  letter-spacing: var(--q-divider-label-letter-spacing);
  line-height: 1;
  text-transform: uppercase;
}

body[data-theme="morph"] .q-divider.q-divider-labeled,
body[data-theme="warm"] .q-divider.q-divider-labeled {
  --q-divider-border-color: var(--q-divider-accent-color);
}

body[data-theme="morph"] .q-divider.q-divider-labeled .q-divider-label::before,
body[data-theme="warm"] .q-divider.q-divider-labeled .q-divider-label::before {
  content: "[ ";
}

body[data-theme="morph"] .q-divider.q-divider-labeled .q-divider-label::after,
body[data-theme="warm"] .q-divider.q-divider-labeled .q-divider-label::after {
  content: " ]";
}
</style>
