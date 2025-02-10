<template>
  <div class="q-avatar" :style="sty" :class="cls">
    <template v-if="props.src === '' && $slots.default">
      <slot></slot>
    </template>
    <img v-else :src="imgSrc" :alt="alt" @error="handleError" />
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import imagePlaceholder from "../../assets/images/image-placeholder-small.png";
const defaultAvatar = imagePlaceholder;
const props = defineProps({
  src: {
    type: String,
    default: "",
  },
  alt: {
    type: String,
    default: "An Avatar",
  },
  size: {
    type: Number,
    default: 32,
  },
  variant: {
    type: String,
    default: "circle", // circle, rounded, square
  },
  borderType: {
    type: String, // none, solid, hollow
    default: "none",
  },
  borderColor: { // only for borderType="hollow"
    type: String,
    default: "#000",
  }
});

const imgSrc = computed(() => props.src || defaultAvatar);

const cls = computed(() => {
  const ret = [];
  if (props.variant === "circle") {
    ret.push("circle");
  } else if (props.variant === "rounded") {
    ret.push("rounded");
  } else if (props.variant === "square") {
    ret.push("square");
  }
  if (props.borderType === 'solid') {
    ret.push('border-solid');
  } else if (props.borderType === 'hollow') {
    ret.push('border-hollow');
  }
  return ret.join(" ");
});


const sty = computed(() => {
  const ret:any = {
    width: `${props.size}px`,
    height: `${props.size}px`,
    'max-width': `${props.size}px`,
    'max-height': `${props.size}px`,
  };
  if (props.borderType === 'hollow') {
    ret['border-color'] = props.borderColor;
  }
  return ret;
});

function handleError(e: Event) {
  const img = e.target as HTMLImageElement;
  img.src = defaultAvatar;
}
</script>
<style lang="scss">
.q-avatar {
  display: block;
  border-radius: 50%;
  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
  & > svg {
    width: 100%;
    height: 100%;
  }
  &.rounded {
    border-radius: 8px;
    img {
      border-radius: 6px;
    }
  }
  &.square {
    border-radius: 0;
    img {
      border-radius: 0;
    }
  }
  &.border-solid {
    border: 3px solid var(--q-c-white);
    box-shadow: 0 0 1px var(--q-c-dark-4), 0 1px 2px var(--q-c-dark-4);
  }
  &.border-hollow {
    padding: 2px;
    border-width: 1px;
    border-style: solid;
  }
}
.dark {
  .q-avatar {
    &.border-solid {
      border-color: var(--q-c-light-4);
      box-shadow: none;
    }
    &.border-hollow {
      border-color: var(--q-c-light-4);
    }
  }
}
</style>
