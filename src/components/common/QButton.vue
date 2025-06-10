<template>
  <button :class="cls" :disabled="!validated" :ariaLabel="ariaLabel">
    <span class="button-inner">
      <slot></slot>
    </span>
    <div v-if="props.loading" class="ocean">
      <div class="wave"></div>
    </div>
  </button>
</template>

<script lang="ts" setup>
import { computed, useSlots } from 'vue';
import { useUtil } from '../../composables/useUtil';

const slots = useSlots();

const { extractText, extractIconName } = useUtil();

const props = defineProps({
  class: {
    type: String,
    default: 'primary',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const cls = computed(() => {
  const ret = ['q-button touchable'];
  ret.push(props.class);
  if (props.loading) {
    ret.push('loading');
  }
  return ret.join(' ');
});

const validated = computed(() => {
  return !props.disabled;
});

const ariaLabel = computed(() => {
  const defaultSlotNodes = slots.default?.();
  let text = '';

  if (defaultSlotNodes) {
    text = extractText(defaultSlotNodes).trim();
  }

  if (text === '' && cls.value.includes('icon')) {
    // try to get the text from the icon
    text = extractIconName(defaultSlotNodes);
  }

  // Return the extracted text if non-empty, otherwise undefined
  // so the aria-label attribute is only added when meaningful text is found.
  return text || undefined;
});
</script>

<style scoped lang="scss">
@import "@/styles/mixin/touchable.scss";

.q-button {
  height: 44px;
  font-weight: 400;
  padding: 0.8rem 1rem;
  text-align: center;
  text-decoration: none;
  display: flex;
  cursor: default;
  font-size: 0.875rem;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;
  line-height: 1;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow:hidden;
  &.sm {
    padding: 0.6rem 0.8rem;
    height: 38px;
    font-size: 0.875rem;
    border-radius: 0.5rem;
  }
  &.xs {
    padding: 0.6rem 0.8rem;
    height: 32px;
    font-size: 0.75rem;
  }
  &.xxs {
    padding: 0.6rem 0.8rem;
    height: 24px;
    font-size: 0.7rem;
  }
  .button-inner {
    align-self: center;
    color: inherit;
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &.weight-bold {
    font-weight: 500;
  }
  &:deep(.icon) {
    margin-right: 0.5rem;
    height: 16px !important;
    width: 16px !important;
    align-self: center;
  }
  &.block {
    width: 100%;
  }
  &.icon {
    padding: 0.8rem;
    width: 44px;
    &:deep(.icon) {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 0;
      height: 16px;
      width: 16px;
    }
    &.sm {
      padding: 0.6rem;
      width: 38px;
    }
    &.xs {
      padding: 0.6rem;
      width: 32px;
    }
  }
}
</style>