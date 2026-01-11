<template>
  <div class="q-premium-decoration">
    <div class="q-premium-decoration-inner">
      <slot></slot><div class="q-premium-decoration-image" :style="sty"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch, onMounted} from 'vue';

const props = defineProps({
  borderRadius: {
    type: String,
    default: '0px',
  },
});

const sty = computed(() => {
  return {
    borderTopLeftRadius: props.borderRadius,
    borderBottomLeftRadius: props.borderRadius,
  };
});

onMounted(() => {})
</script>

<style scoped lang="scss">
.q-premium-decoration-inner {
  position: relative;
}
.q-premium-decoration-image {
  top: 0;
  bottom: 0;
  left: 0;
  width: 11px;
  z-index: 1;
  position: absolute;
  background-repeat: repeat-y;
  background-image: url('@/assets/images/premium-decoration.svg');
}
</style>
