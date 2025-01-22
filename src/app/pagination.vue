<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">Pagination</h2>
    <div class="grid gap-4 grid-cols-2">
      <QPagination
        v-model="currentPage"
        :total-page="10"
        :has-prev="currentPage > 1"
        :has-next="currentPage < 10"
        @change:prev="() => { currentPage-- }"
        @change:next="() => { currentPage++; console.log(currentPage) }"
        @change:goto="(val: any) => { currentPage = val; console.log(val)}"
      />
      <br />
      <QPagination
        v-model="currentPage"
        :has-prev="currentPage > 1"
        :has-next="currentPage < 10"
        @change:prev="() => { currentPage-- }"
        @change:next="() => { currentPage++; console.log(currentPage) }"
        @change:goto="(val: any) => { currentPage = val; console.log(val)}"
      />
      <br />
      <QButton class="outlined" @click="currentPage = 1">Go to 1</QButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentPage = ref(1);
</script>

<style scoped lang="scss">
</style>