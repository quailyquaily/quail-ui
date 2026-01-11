<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">Pagination</h2>

    <div class="demo-groups">
      <!-- With Total Pages -->
      <div class="demo-group">
        <div class="group-label q-text-caption q-c-dark-3">With Total Pages</div>
        <div class="flow">
          <QPagination
            v-model="currentPage"
            :total-page="10"
            :has-prev="currentPage > 1"
            :has-next="currentPage < 10"
            @change:prev="() => { currentPage-- }"
            @change:next="() => { currentPage++; console.log(currentPage) }"
            @change:goto="(val: any) => { currentPage = val; console.log(val)}"
          />
        </div>
      </div>

      <!-- Without Total Pages -->
      <div class="demo-group">
        <div class="group-label q-text-caption q-c-dark-3">Without Total Pages</div>
        <div class="flow">
          <QPagination
            v-model="currentPage"
            :has-prev="currentPage > 1"
            :has-next="currentPage < 10"
            @change:prev="() => { currentPage-- }"
            @change:next="() => { currentPage++; console.log(currentPage) }"
            @change:goto="(val: any) => { currentPage = val; console.log(val)}"
          />
        </div>
      </div>

      <!-- Interaction -->
      <div class="demo-group">
        <div class="group-label q-text-caption q-c-dark-3">Interaction</div>
        <div class="flow">
          <QButton class="outlined" @click="currentPage = 1">Go to Page 1</QButton>
          <div class="frame p-3 q-text-desc">
            Current page: {{ currentPage }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentPage = ref(1);
</script>

<style scoped lang="scss">
.demo-groups {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.demo-group {
  .group-label {
    margin-bottom: 0.5rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
}
</style>
