<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">Button</h2>

    <div class="button-groups">
      <!-- Variants -->
      <div class="button-group">
        <div class="group-label q-text-caption q-c-dark-3">Variants</div>
        <div class="flow">
          <QButton class="outlined">Outlined</QButton>
          <QButton class="primary">Primary</QButton>
          <QButton class="highlight">Highlight</QButton>
          <QButton class="plain">Plain</QButton>
          <QButton class="stripe">Stripe</QButton>
          <QButton class="placeholder">Placeholder</QButton>
        </div>
      </div>

      <!-- States -->
      <div class="button-group">
        <div class="group-label q-text-caption q-c-dark-3">States (Outlined)</div>
        <div class="flow">
          <QButton class="outlined">Normal</QButton>
          <QButton class="outlined" disabled>Disabled</QButton>
          <QButton class="outlined" loading>Loading</QButton>
          <QButton class="outlined toggle-on">Toggled</QButton>
        </div>
      </div>

      <!-- Danger variants -->
      <div class="button-group">
        <div class="group-label q-text-caption q-c-dark-3">Danger</div>
        <div class="flow">
          <QButton class="danger">Danger</QButton>
          <QButton class="outlined danger">Outlined</QButton>
          <QButton class="plain danger">Plain</QButton>
          <QButton class="danger" disabled>Disabled</QButton>
        </div>
      </div>

      <!-- Sizes -->
      <div class="button-group">
        <div class="group-label q-text-caption q-c-dark-3">Sizes</div>
        <div class="flow">
          <QButton class="outlined">Normal (44px)</QButton>
          <QButton class="sm outlined">Small (38px)</QButton>
          <QButton class="xs outlined">XS (32px)</QButton>
          <QButton class="xxs outlined">XXS (24px)</QButton>
        </div>
      </div>

      <!-- Icon buttons -->
      <div class="button-group">
        <div class="group-label q-text-caption q-c-dark-3">Icon Buttons</div>
        <div class="flow">
          <QButton class="icon primary">
            <QIconPlus class="icon" />
          </QButton>
          <QButton class="icon danger">
            <QIconTrash class="icon" />
          </QButton>
          <QButton class="icon highlight">
            <QIconBatteryFull class="icon" />
          </QButton>
          <QButton class="icon outlined">
            <QIconSun class="icon" />
          </QButton>
          <QButton class="icon plain">
            <QIconQuail class="icon" />
          </QButton>
          <QButton class="primary">
            <QIconSearch class="icon" />
            <span class="button-label">With Text</span>
          </QButton>
        </div>
      </div>

      <!-- Toggle Button -->
      <div class="button-group">
        <div class="group-label q-text-caption q-c-dark-3">Toggle Button</div>
        <div class="flow">
          <QToggleButton v-model="toggleValue">On/Off</QToggleButton>
          <QToggleButton v-model="toggleValue" class="icon">
            <QIconMenu class="icon"/>
          </QToggleButton>
          <div class="frame q-text-desc q-c-dark-2 p-3">value: {{ toggleValue }}</div>
        </div>
      </div>

      <!-- Link -->
      <div class="button-group">
        <div class="group-label q-text-caption q-c-dark-3">Link Button</div>
        <div class="flow">
          <QButton class="outlined" href="https://www.google.com" target="_blank">Visit Google</QButton>
        </div>
      </div>

      <!-- Keyboard Shortcuts -->
      <div class="button-group">
        <div class="group-label q-text-caption q-c-dark-3">Keyboard Shortcuts</div>
        <div class="flow">
          <QButton class="primary" shortcut="W">Download</QButton>
          <QButton class="outlined" shortcut="Cmd+K">Search</QButton>
          <QButton class="highlight" shortcut="Cmd+S">Save</QButton>
          <QButton class="danger" shortcut="Del">Delete</QButton>
          <QButton class="plain" shortcut="Shift+N">New</QButton>
        </div>
      </div>

      <!-- Border Radius -->
      <div class="button-group">
        <div class="group-label q-text-caption q-c-dark-3">Border Radius</div>
        <div class="flow">
          <QButton class="outlined">Default</QButton>
          <QButton class="outlined border-radius-sm">SM</QButton>
          <QButton class="outlined border-radius-xs">XS</QButton>
          <QButton class="outlined border-radius-xxs">XXS</QButton>
          <QButton class="outlined border-radius-none">None</QButton>
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
  .group-label {
    margin-bottom: 0.5rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
}
</style>
