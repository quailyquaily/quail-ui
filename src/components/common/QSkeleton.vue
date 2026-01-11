<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'text', // text, avatar, image, card, button
  },
  width: {
    type: String,
    default: '',
  },
  height: {
    type: String,
    default: '',
  },
  animation: {
    type: String,
    default: 'wave', // wave, pulse, none
  },
  rounded: {
    type: [Boolean, String],
    default: false,
  },
  count: {
    type: Number,
    default: 1,
  },
  class: {
    type: String,
    default: '',
  },
});

const variantDefaults: Record<string, { width: string; height: string; radius: string }> = {
  text: { width: '100%', height: '16px', radius: 'var(--q-radius-xs)' },
  avatar: { width: '40px', height: '40px', radius: '50%' },
  image: { width: '100%', height: '200px', radius: 'var(--q-radius-md)' },
  card: { width: '100%', height: '120px', radius: 'var(--q-radius-md)' },
  button: { width: '100px', height: '44px', radius: 'var(--q-radius-md)' },
};

const cls = computed(() => {
  const classes = ['q-skeleton', `q-skeleton-${props.variant}`];
  if (props.animation !== 'none') {
    classes.push(`q-skeleton-${props.animation}`);
  }
  if (props.class) classes.push(props.class);
  return classes.join(' ');
});

const style = computed(() => {
  const defaults = variantDefaults[props.variant] || variantDefaults.text;

  let borderRadius = defaults.radius;
  if (props.rounded === true) {
    borderRadius = 'var(--q-radius-full)';
  } else if (typeof props.rounded === 'string' && props.rounded) {
    borderRadius = props.rounded;
  }

  return {
    width: props.width || defaults.width,
    height: props.height || defaults.height,
    borderRadius,
  };
});

const items = computed(() => {
  return Array.from({ length: props.count }, (_, i) => i);
});
</script>

<template>
  <template v-if="count === 1">
    <div :class="cls" :style="style">
      <slot></slot>
    </div>
  </template>
  <template v-else>
    <div class="q-skeleton-group">
      <div v-for="i in items" :key="i" :class="cls" :style="style">
        <slot></slot>
      </div>
    </div>
  </template>
</template>

<style lang="scss">
.q-skeleton {
  display: block;
  background: var(--q-c-dark-4);
  position: relative;
  overflow: hidden;

  &-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &-avatar {
    flex-shrink: 0;
  }

  &-text {
    &:nth-child(3n + 2) {
      width: 90% !important;
    }
    &:nth-child(3n) {
      width: 70% !important;
    }
  }

  &-wave {
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      animation: q-skeleton-wave 1.5s infinite;
    }
  }

  &-pulse {
    animation: q-skeleton-pulse 1.5s ease-in-out infinite;
  }
}

@keyframes q-skeleton-wave {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes q-skeleton-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.dark {
  .q-skeleton {
    background: var(--q-c-light-4);

    &-wave::after {
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent);
    }
  }
}
</style>
