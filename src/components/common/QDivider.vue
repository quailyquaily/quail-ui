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
  <div :class="cls">
    <span v-if="label" class="q-divider-label">{{ label }}</span>
  </div>
</template>

<style lang="scss">
.q-divider {
  position: relative;
  width: 100%;
  border-top: 0.5px solid var(--q-divider-border-color);

  &.q-divider-focus {
    border-top: 4px solid var(--q-divider-accent-color);
    border-radius: 0.5rem;
  }

  &.q-divider-double {
    height: 4px;
    border-bottom: 0.5px solid var(--q-divider-border-color);
  }

  &.q-divider-labeled {
    min-height: 1px;
    padding-top: 28px;
    border-top-width: 1px;
    isolation: isolate;
  }

  &.q-divider-labeled::after {
    content: "";
    position: absolute;
    left: 0;
    top: -1px;
    width: 100%;
    height: 1px;
    background: var(--q-divider-accent-color);
    z-index: 0;
  }
}

.q-divider-label {
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  z-index: 1;
  padding: 0 8px 0 4px;
  background: var(--q-divider-label-bg);
  color: var(--q-divider-label-color);
  font-family: var(--q-font-mono);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  line-height: 1;
  text-transform: uppercase;
}

.dark .q-divider {
  --q-divider-border-color: var(--q-c-light-4);
  --q-divider-accent-color: var(--q-c-light-2);
  --q-divider-label-bg: var(--q-bg-dark);
  --q-divider-label-color: var(--q-c-light-3);
}
</style>
