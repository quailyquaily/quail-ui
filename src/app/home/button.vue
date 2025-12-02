<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">Button</h2>
    <div class="grid gap-4 grid-cols-3">
      <div class="flow">
        <QButton class="outlined">Outlined</QButton>
        <QButton class="outlined" disabled>Outlined</QButton>
        <QButton class="outlined" loading>Loading</QButton>
        <QButton class="outlined toggle-on">Toggled</QButton>
        <QButton class="outlined weight-bold">Focused</QButton>
      </div>
      <div class="flow">
        <QButton class="primary" @click="() => console.log('OK')">Primary</QButton>
        <QButton class="primary" disabled>Primary</QButton>
        <QButton class="primary" loading>Loading</QButton>
      </div>
      <div class="flow">
        <QButton class="highlight">Highlight</QButton>
        <QButton class="highlight" disabled>Highlight</QButton>
        <QButton class="highlight" loading>Loading</QButton>
      </div>
      <div class="flow">
        <QButton class="plain">Plain</QButton>
        <QButton class="plain" disabled>Plain</QButton>
        <QButton class="plain" loading>Loading</QButton>
      </div>
      <div class="flow">
        <QButton class="stripe">Stripe</QButton>
        <QButton class="stripe" disabled>Stripe</QButton>
        <QButton class="stripe" loading>Loading</QButton>
      </div>
      <div class="flow">
        <QButton class="danger">Danger</QButton>
        <QButton class="danger" disabled>Danger</QButton>
        <QButton class="danger" loading>Loading</QButton>
      </div>
      <div class="flow">
        <QButton class="outlined danger">Danger</QButton>
        <QButton class="outlined danger" disabled>Danger</QButton>
        <QButton class="outlined danger" loading>Loading</QButton>
      </div>
      <div class="flow">
        <QButton class="plain danger">Danger</QButton>
        <QButton class="plain danger" disabled>Danger</QButton>
        <QButton class="plain danger" loading>Loading</QButton>
      </div>
      <div class="flow">
        <QButton class="placeholder">Placeholder</QButton>
        <QButton class="placeholder icon" disabled>
          <QIconPlus class="icon"/>
        </QButton>
        <QButton class="placeholder" loading>Placeholder</QButton>
      </div>
      <div class="flow">
        <QButton class="outlined">Normal</QButton>
        <QButton class="sm outlined">Small</QButton>
        <QButton class="xs outlined">Smaller</QButton>
        <QButton class="xxs outlined">Smallest</QButton>
      </div>
      <div class="flow">
        <QButton class="icon primary">
          <QIconPlus class="icon" />
        </QButton>
        <QButton class="icon danger">
          <QIconTrash class="icon" />
        </QButton>
        <QButton class="icon outlined danger">
          <QIconArrowDown class="icon" />
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
          <span class="button-label">Search</span>
        </QButton>
      </div>
      <div class="flow">
        <QToggleButton v-model="toggleValue">On/Off</QToggleButton>
        <QToggleButton v-model="toggleValue" class="icon">
          <QIconMenu class="icon"/>
        </QToggleButton>
        <div class="frame q-text-desc q-c-dark-2 p-3">value: {{ toggleValue }}</div>
        <QButton class="primary" @click="toggleValue = !toggleValue">Toggle</QButton>
      </div>
      <div class="flow">
        <QButton class="outlined" href="https://www.google.com" target="_blank">Visit Google</QButton>
      </div>
      <div class="flow grid gap-4 grid-cols-2">
        <QButton class="outlined block">border-radius</QButton>
        <QButton class="outlined block border-radius-sm">border-radius-sm</QButton>
        <QButton class="outlined block border-radius-xs">border-radius-xs</QButton>
        <QButton class="outlined block border-radius-xxs">border-radius-xxs</QButton>
        <QButton class="outlined block border-radius-none">border-radius-none</QButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
const toggleValue = ref(false);
</script>
