<template>
  <div class="q-premium-decoration">
    <div class="q-premium-decoration-inner">
      <slot></slot><div class="q-premium-decoration-image"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch, onMounted} from 'vue';

const emit = defineEmits(["update:modelValue", "close"]);

onMounted(() => {
})
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