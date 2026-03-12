<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">Button</h2>

    <div class="button-groups">
      <div class="button-group">
        <div class="group-label q-text-caption q-c-dark-3">Core hierarchy</div>
        <p class="group-copy q-text-body-text q-c-dark-2">
          Teach one primary action, one supporting action, one low-emphasis action, and one destructive path first.
        </p>
        <div class="flow">
          <QButton class="primary">Publish</QButton>
          <QButton class="outlined">Preview</QButton>
          <QButton class="plain">Save draft</QButton>
          <QButton class="danger">Delete</QButton>
        </div>
      </div>

      <div class="button-group">
        <div class="group-label q-text-caption q-c-dark-3">States</div>
        <div class="flow">
          <QButton class="primary">Ready</QButton>
          <QButton class="primary" loading>Publishing</QButton>
          <QButton class="outlined" disabled>Disabled</QButton>
          <QButton class="outlined toggle-on">Selected</QButton>
          <QButton class="danger" disabled>Locked</QButton>
        </div>
      </div>

      <div class="button-group">
        <div class="group-label q-text-caption q-c-dark-3">Sizes</div>
        <div class="flow">
          <QButton class="outlined">Normal</QButton>
          <QButton class="sm outlined">Small</QButton>
          <QButton class="xs outlined">Compact</QButton>
          <QButton class="xxs outlined">Dense</QButton>
        </div>
      </div>

      <div class="button-group">
        <div class="group-label q-text-caption q-c-dark-3">Utility patterns</div>
        <div class="flow">
          <QButton class="icon outlined" aria-label="Search">
            <QIconSearch class="icon" />
          </QButton>
          <QButton class="primary">
            <QIconPlus class="icon" />
            <span class="button-label">New post</span>
          </QButton>
          <QButton class="outlined" shortcut="Cmd+K">Search</QButton>
          <QButton class="primary" shortcut="Cmd+S">Save draft</QButton>
          <QButton class="outlined" href="https://www.google.com" target="_blank">External link</QButton>
        </div>
      </div>

      <div class="button-group">
        <div class="group-label q-text-caption q-c-dark-3">Toggle button</div>
        <div class="flow">
          <QToggleButton v-model="toggleValue">Following</QToggleButton>
          <QToggleButton v-model="toggleValue" class="icon" aria-label="Toggle menu">
            <QIconMenu class="icon"/>
          </QToggleButton>
          <div class="frame q-text-desc q-c-dark-2 p-3">value: {{ toggleValue }}</div>
        </div>
      </div>

      <div class="button-group is-secondary">
        <div class="group-label q-text-caption q-c-dark-3">Expressive styles</div>
        <p class="group-copy q-text-body-text q-c-dark-2">
          Keep these for special surfaces and campaigns, not the default interaction hierarchy.
        </p>
        <div class="flow">
          <QButton class="highlight">Highlight</QButton>
          <QButton class="stripe">Stripe</QButton>
          <QButton class="placeholder">Placeholder</QButton>
          <QButton class="outlined border-radius-sm">Soft edge</QButton>
          <QButton class="outlined border-radius-none">Square</QButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const toggleValue = ref(false);
</script>

<style scoped lang="scss">
.button-groups {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.button-group {
  display: grid;
  gap: 0.625rem;

  .group-label {
    margin: 0;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
}

.group-copy {
  max-width: 52ch;
  margin: 0;
  line-height: 1.6;
}
</style>
