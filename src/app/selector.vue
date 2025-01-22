<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">LanguageSelector and CurrencySelector</h2>
    <div class="grid gap-4 grid-cols-2 mb-4">
      <div class="grid gap-4 grid-cols-3">
        <QLanguageSelector :lang="'en'" auto @change="onLangSelected"/>
        <QLanguageSelector :lang="selectedLang" no-flag :presist="true" @change="onLangSelected"/>
      </div>
    </div>
    <div class="grid gap-4 grid-cols-3">
      <QCurrencySelector :currency="'USD'" @change="onCurrencySelected"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selectedLang = ref('en');

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