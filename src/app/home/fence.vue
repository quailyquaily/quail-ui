<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">Fence</h2>

    <div class="demo-groups">
      <!-- Types -->
      <div class="demo-group">
        <div class="group-label q-text-caption q-c-dark-3">Types</div>
        <div class="demo-row">
          <QFence text="Some text here to tell you something useful." />
          <QFence text="Some text here to tell you important information." type="warning" />
          <QFence text="Some text here to tell you some words of critical." type="error" />
          <QFence text="Some text here to make you happy." type="success" />
        </div>
      </div>

      <!-- With Link & Icon -->
      <div class="demo-group">
        <div class="group-label q-text-caption q-c-dark-3">With Link & Custom Icon</div>
        <div class="demo-row">
          <QFence text="This will redirect you to an external page" link="https://quail.ink" />
          <QFence text="Use your favorite icon to replace the default one." icon="QIconSun" />
        </div>
      </div>

      <!-- Long Text -->
      <div class="demo-group">
        <div class="group-label q-text-caption q-c-dark-3">Long Text</div>
        <QFence text="Super long text here, very blah blah bla, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."/>
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
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}
</style>
