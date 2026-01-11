<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">TextFieldWithButton</h2>

    <div class="demo-groups">
      <!-- Vertical Layout -->
      <div class="demo-group">
        <div class="group-label q-text-caption q-c-dark-3">Vertical Layout</div>
        <div class="demo-row">
          <QTextFieldWithButton v-model="fieldValue" type="text" placeholder="type here!" action-label="Go!" button-cls="primary" @submit="submit"/>
          <QTextFieldWithButton v-model="fieldValue" type="email" placeholder="your email here!" action-label="Subscribe" @submit="submit"/>
        </div>
      </div>

      <!-- Button Variants -->
      <div class="demo-group">
        <div class="group-label q-text-caption q-c-dark-3">Button Variants</div>
        <div class="demo-row">
          <QTextFieldWithButton v-model="fieldValue" type="text" placeholder="type here!" default-text="some default text" button-cls="highlight" action-label="Go!" @submit="submit"/>
          <QTextFieldWithButton v-model="fieldValue" type="text" placeholder="type here!" default-text="some default text" button-cls="danger" action-label="Do something" @submit="submit"/>
        </div>
      </div>

      <!-- Horizontal Layout -->
      <div class="demo-group">
        <div class="group-label q-text-caption q-c-dark-3">Horizontal Layout</div>
        <div class="demo-row">
          <QTextFieldWithButton v-model="fieldValue" type="email" layout="horizontal" placeholder="your email here!" action-label="Subscribe" @submit="submit"/>
          <QTextFieldWithButton v-model="fieldValue" type="email" layout="horizontal" placeholder="your email here!" action-label="Subscribe" button-cls="highlight elevated" @submit="submit"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const fieldValue = ref<string>('');
const submit = () => {
  console.log('submit', fieldValue.value);
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

.demo-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}
</style>
