<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">LanguageSelector and CurrencySelector</h2>

    <div class="demo-groups">
      <!-- Language Selector -->
      <div class="demo-group">
        <div class="group-label q-text-caption q-c-dark-3">Language Selector</div>
        <div class="flow">
          <QLanguageSelector :lang="'en'" auto @change="onLangSelected"/>
          <QLanguageSelector :lang="selectedLang" no-flag :presist="true" @change="onLangSelected"/>
          <QLanguageSelector :lang="'ja'" @change="onLangSelected"/>
        </div>
      </div>

      <!-- Currency Selector -->
      <div class="demo-group">
        <div class="group-label q-text-caption q-c-dark-3">Currency Selector</div>
        <div class="flow">
          <QCurrencySelector :currency="'USD'" @change="onCurrencySelected"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selectedLang = ref('zh');

const selectedCurrency = ref('USD');

function onLangSelected(item: any) {
  console.log("Language selected", item);
  selectedLang.value = item.value;
}

function onCurrencySelected(item: any) {
  console.log("Currency selected", item);
  selectedCurrency.value = item.value;
}
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
