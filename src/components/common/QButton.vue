<template>
  <button :class="cls" :disabled="!validated" :ariaLabel="realAriaLabel">
    <span v-if="!href" class="button-inner">
      <slot></slot>
    </span>
    <a v-else :href="href" class="button-inner" :title="title" :target="target" :rel="rel">
      <slot></slot>
    </a>
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
  href: {
    type: String,
    default: '',
  },
  target: {
    type: String,
    default: '_self',
  },
  rel: {
    type: String,
    default: 'nofollow noopener noreferrer',
  },
  title: {
    type: String,
    default: '',
  },
  ariaLabel: {
    type: String,
    default: '',
  }
});

const cls = computed(() => {
  const ret = ['q-button touchable'];
  ret.push(props.class);
  if (props.loading) {
    ret.push('loading');
  }
  if ((window as any)?._quailui_use_squircle) {
    ret.push('squircle');
  }
  return ret.join(' ');
});

const validated = computed(() => {
  return !props.disabled;
});

const realAriaLabel = computed(() => {
  if (props.ariaLabel) {
    return props.ariaLabel;
  }
  if (props.title) {
    return props.title;
  }

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
  padding: 0;
  &.sm {
    height: 38px;
    font-size: 0.875rem;
    .button-inner {
      padding: 0.6rem 0.8rem;
    }
  }
  &.xs {
    height: 32px;
    font-size: 0.75rem;
    .button-inner {
      padding: 0.6rem 0.8rem;
    }
  }
  &.xxs {
    height: 24px;
    font-size: 0.7rem;
    .button-inner {
      padding: 0.4rem 0.8rem;
    }
  }
  .button-inner {
    padding: 0.8rem 1rem;
    align-self: center;
    color: inherit;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
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
    &.xxs {
      padding: 0.4rem;
      width: 24px;
    }
  }
}
</style>
