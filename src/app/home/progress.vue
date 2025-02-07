<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">Progress</h2>
    <div class="grid gap-4 grid-cols-3">
      <QProgress :value="50" :max="100" />
      <QProgress :value="100" :max="100" />
      <QProgress :infinite="true" />
      <QProgress :value="50" :max="100" color="red" />
      <QProgress :value="50" :max="100" color="green" />
      <QProgress :value="50" :max="100" color="orange" />
    </div>
  </div>
</template>