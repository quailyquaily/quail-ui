<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">Progress</h2>

    <div class="demo-groups">
      <!-- Basic -->
      <div class="demo-group">
        <div class="group-label q-text-caption q-c-dark-3">Basic</div>
        <div class="demo-row">
          <QProgress :value="50" :max="100" />
          <QProgress :value="100" :max="100" />
          <QProgress :infinite="true" />
        </div>
      </div>

      <!-- Colors -->
      <div class="demo-group">
        <div class="group-label q-text-caption q-c-dark-3">Colors</div>
        <div class="demo-row">
          <QProgress :value="50" :max="100" color="red" />
          <QProgress :value="50" :max="100" color="green" />
          <QProgress :value="50" :max="100" color="orange" />
        </div>
      </div>
    </div>
  </div>
</template>

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
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}
</style>
