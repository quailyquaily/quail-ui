<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
  }
});
</script>

<template>
<div class="q-pack-cover">
  <div class="q-pack-cover-layer one"></div>
  <div class="q-pack-cover-layer two"></div>
  <div class="q-pack-cover-inner">
    <img :src="props.src" :alt="alt"/>
  </div>
</div>
</template>

<style lang="scss" scoped>
.q-pack-cover {
  width: 128px;
  position: relative;
  background-color: var(--q-c-white);
  &::after {
    display: block;
    content: " ";
    position: absolute;
    background: rgba(0,0,0,0.2);
    width: 80%;
    height: 80%;
    bottom: 0;
    filter: blur(10px);
    transform: translateY(2%);
    left: 10%;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }
  &.lighter {
    &::after {
      background: rgba(0,0,0,0.05);
    }
  }

}
.q-pack-cover-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // border: 1px solid #ccc;
  background: var(--q-c-white);
  box-shadow: 0 0px 2px var(--q-c-dark-4);
  transform: scale(0.97) translateY(5%);
  border-radius: 8px;
  z-index: 2;
  &.one {
    transform: scale(0.94) translateY(10%);
    z-index: 1;
  }
}
.q-pack-cover-inner {
  flex-basis: 128px;
  width: 128px;
  height: 100px;
  display: block;
  background: var(--q-c-white);
  border-radius: 8px;
  position: relative;
  box-shadow: 0 0px 2px var(--q-c-dark-4), 0 3px 10px var(--q-c-dark-4);
  overflow: hidden;
  z-index: 3;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    z-index: 1;
    color: rgba(0, 0, 0, 0.3);
    text-align: center;
    font-size: 0.8rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
}

@media only screen and (max-width: 720px) {
  .q-pack-cover {
    width: 112px;
  }
  .q-pack-cover-inner {
    flex-basis: 112px;
    width: 112px;
    height: 96px;
  }
}
.dark {
  .q-pack-cover {
    background-color: var(--q-bg-dark);
    &::after {
      background: rgba(0,0,0,0.2);
    }
  }
  .q-pack-cover-layer {
    background: var(--q-bg-dark);
    box-shadow: 0 0px 2px var(--q-c-light-3);
  }
  .q-pack-cover-inner {
    background: var(--q-bg-dark);
  }
}

</style>