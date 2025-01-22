<script setup lang="ts">
import { computed, ref, watch } from "vue";


import SecTypeface from "./app/typeface.vue"
import SecFrameAndDivider from "./app/frame.vue"
import SecPremiumDecoration from "./app/premium.vue"
import SecButton from "./app/button.vue"
import SecInput from "./app/input.vue"
import SecTextarea from "./app/textarea.vue"
import SecForm from "./app/form.vue"
import SecInputWithButton from "./app/input-with-btn.vue"
import SecFence from "./app/fence.vue"
import SecProgress from "./app/progress.vue"
import SecSwitch from "./app/switch.vue"
import SecMenu from "./app/menu.vue"
import SecSelector from "./app/selector.vue"
import SecDialog from "./app/dialog.vue"
import SecDatetimePicker from "./app/datetime.vue"
import SecPagination from "./app/pagination.vue"
import SecTab from "./app/tab.vue"
import SecCover from "./app/cover.vue"
import SecAvatar from "./app/avatar.vue"
import SecShare from "./app/share.vue"
import SecPayment from "./app/payment.vue"
import SecIcon from "./app/icon.vue"

const switchTheme = ref(true);

watch(() => switchTheme.value, (val) => {
  if (val) {
    document.body.classList.remove("dark");
  } else {
    document.body.classList.add("dark");
  }
})

</script>

<template>
  <div class="container" :class="switchTheme ? '' : 'dark'">
    <div class="grid gap-4 grid-cols-2">
      <div class="">
        <h1 class="q-text-display mb-2">Quail UI</h1>
        <div class="q-text-desc">
          👉 <a href="https://github.com/quail-ink/quail-ui" target="_blank" class="q-c-dark-2">Fork at Github</a>
        </div>
      </div>
      <div class="text-right">
        <QSwitch theme="clear-sky" v-model="switchTheme" />
      </div>
    </div>
    <div class="divider focus mt-4"></div>

    <SecTypeface />

    <SecFrameAndDivider />

    <SecPremiumDecoration />

    <SecButton />

    <SecInput />

    <SecTextarea />

    <SecForm />

    <SecInputWithButton />

    <SecFence />

    <SecProgress />

    <SecSwitch />

    <SecMenu />

    <SecSelector />

    <SecDialog />

    <SecDatetimePicker />

    <SecPagination />

    <SecTab />

    <SecCover />

    <SecAvatar />

    <SecShare />

    <SecPayment />

    <SecIcon />

  </div>
</template>

<style lang="scss">
body {
  background-color: var(--q-bg-light);
  &.dark {
    background-color: var(--q-bg-dark);
  }
}
</style>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900&display=swap');

.container {
  max-width: 1280px;
  padding: 1rem;
  margin: 0 auto;
  font-family: var(--q-font-sans);
}
.section {
  margin: 2rem 0;
}

.icon-wrapper {
  padding: 1rem 0.5rem !important;
  display: flex;
  align-items: center;
  height: 24px;
  .icon {
    height: 20px;
    width: 20px;
    min-width: 20px;
  }
  .label {
    font-family: monospace;
  }
}
</style>
