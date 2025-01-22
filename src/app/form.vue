<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">Form</h2>
    <div class="grid gap-4 grid-cols-2">
      <div class="form" style="width: 100%">
          <div class="form-row">
            <div class="form-row-left">
              <label class="form-label">General Setting</label>
              <div class="form-desc">The description about the setting.</div>
            </div>
            <div class="form-row-right">
              <QSwitch v-model="switchValue" />
            </div>
          </div>
          <div class="form-row column">
            <div class="form-label">Put a text field</div>
            <QInput type="text" placeholder="type here!" />
            <div class="form-hint">
              What you're typing here will be an example
            </div>
          </div>
          <div class="form-row column">
            <div class="form-label">Error</div>
            <div class="form-error">It seems you're typing something wrong</div>
          </div>
          <div class="form-row">
            <QButton class="highlight">Save</QButton>
          </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const switchValue = ref(false);
</script>

<style scoped lang="scss">
</style>