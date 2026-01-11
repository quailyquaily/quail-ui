<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">Switch and Checkbox</h2>

    <div class="demo-groups">
      <!-- Switch Themes -->
      <div class="demo-group">
        <div class="group-label q-text-caption q-c-dark-3">Switch Themes</div>
        <div class="flow">
          <QSwitch v-model="switchValue1" />
          <QSwitch v-model="switchValue2" />
          <QSwitch v-model="switchValue2" theme="clear-sky"/>
          <QSwitch v-model="switchValue2" theme="plastic"/>
        </div>
      </div>

      <!-- Checkbox -->
      <div class="demo-group">
        <div class="group-label q-text-caption q-c-dark-3">Checkbox</div>
        <div class="flow">
          <div class="flex items-center">
            <input id="checkbox1" type="checkbox" class="q-checkbox" v-model="switchValue1" />
            <label for="checkbox1" class="q-text-body-title ml-3">Checkbox</label>
          </div>
          <div class="flex items-center">
            <input id="checkbox2" type="checkbox" class="q-checkbox" disabled v-model="switchValue1" />
            <label for="checkbox2" class="q-text-body-title ml-3">Disabled</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const switchValue1 = ref(false);
const switchValue2 = ref(true);
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
