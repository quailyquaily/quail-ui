<script setup lang="ts">
import { computed } from 'vue';
import imagePlaceholder from "../../assets/images/image-placeholder.png";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  subtitle: {
    type: String,
    default: "",
  },
  desc: {
    type: String,
    default: 0,
  },
  src: {
    type: String,
    default: imagePlaceholder,
  },
  alt: {
    type: String,
  },
  width: {
    type: Number,
    default: 128,
  },
});

const height = computed(() => {
  return props.width / 0.718;
});
</script>

<template>
<div class="q-pack-cover" :style="`width: ${width}px; height: ${height}px;`">
  <div class="q-pack-cover-layer one"></div>
  <div class="q-pack-cover-layer two"></div>
  <div class="q-pack-cover-inner" :style="`width: ${width}px; height: ${height}px;`">
    <img :src="props.src" :alt="alt"/>
    <div class="q-pack-cover-content">
      <h3 v-if="props.title" class="q-pack-cover-title q-text-h2 mb-1">{{ title }}</h3>
      <div v-if="props.subtitle" class="q-pack-cover-subtitle q-text-desc mb-2">{{ subtitle }}</div>
      <div v-if="props.desc" class="q-pack-cover-desc q-text-caption">{{ desc }}</div>
    </div>
  </div>
  <div class="q-pack-cover-seals"></div>
</div>
</template>

<style lang="scss" scoped>
.q-pack-cover {
  position: relative;
  background-color: var(--q-c-white);
}
.q-pack-cover-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #C2C2C2;
  transform: scale(0.98) translateX(3%);
  z-index: 2;
  &.one {
    background: #E6E6E6;
    transform: scale(0.96) translateX(6%);
    z-index: 1;
  }
}
.q-pack-cover-inner {
  display: block;
  background: var(--q-c-white);
  position: relative;
  box-shadow: 0 0px 2px var(--q-c-dark-4), 0 3px 10px var(--q-c-dark-4);
  overflow: hidden;
  z-index: 3;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
    color: rgba(0, 0, 0, 0.3);
    text-align: center;
    font-size: 0.8rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .q-pack-cover-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 2rem 0.6rem 8% 12%;
    background: linear-gradient(0deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%);
    z-index: 2;
    color: var(--q-c-white);
    text-shadow: 0 0 4px rgba(0,0,0,0.1);
    .q-pack-cover-desc {
      opacity: 0.5;
    }
  }
}
.q-pack-cover-seals {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 8%;
  background: var(--q-c-light-4);
  border-right: 0.5px dashed var(--q-c-dark-4);
  z-index: 4;
}

.dark {
  .q-pack-cover-layer {
    background: #4A4A4A;
    &.one {
      background: #2A2A2A;
    }
  }
}

</style>