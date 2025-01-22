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

const defaultAvatar = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHNjcmlwdCB4bWxucz0iIi8+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF8yMF8yKSI+CjxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiBmaWxsPSIjRjJGMkYyIiBmaWxsLW9wYWNpdHk9IjAuNSIvPgo8Y2lyY2xlIGN4PSIxMjgiIGN5PSIxMjgiIHI9IjY0IiBmaWxsPSIjRDlEOUQ5IiBmaWxsLW9wYWNpdHk9IjAuNiIvPgo8Y2lyY2xlIGN4PSIxMjgiIGN5PSIyNzIiIHI9IjgwIiBmaWxsPSIjRDlEOUQ5IiBmaWxsLW9wYWNpdHk9IjAuNiIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzIwXzIiPgo8cmVjdCB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4=";
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
