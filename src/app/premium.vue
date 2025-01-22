<script setup lang="ts">
import QTextarea from '../components/common/QTextarea.vue';

</script>

<template>
  <div class="section mb-4">
    <h2 class="q-text-h2 mb-4">Premium Decoration</h2>
    <div class="grid gap-4 grid-cols-3">
      <div class="premium-wrapper">
        <QPremiumDecoration>
          <div class="image-wrapper">
            <img src="https://quaily.com/portal-images/illustration/stat-0.webp" class="image"/>
          </div>
        </QPremiumDecoration>
      </div>
      <div class="premium-wrapper">
        <QPremiumDecoration>
          <div class="frame pl-5 py-3">
            <div class="q-text-display">Title</div>
            <div class="q-text-desc q-c-dark-2">It is technology married with liberal arts, married with the humanities, that yields us the results that make our hearts sing.</div>
          </div>
        </QPremiumDecoration>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.premium-wrapper {
  &:deep(.image-wrapper) {
    width: 100%;
  }
  &:deep(.q-textarea) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
.image {
  width: 100%;
  height: 100%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;
  display: block;
}
</style>