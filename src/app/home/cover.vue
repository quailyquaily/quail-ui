<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">Cover</h2>

    <div class="demo-groups">
      <!-- Pack Cover -->
      <div class="demo-group">
        <div class="group-label q-text-caption q-c-dark-3">Pack Cover</div>
        <div class="cover-row">
          <QPackCover src="https://static.quaily.com/media/jo4uz87q.jpg"
            title="A Pack Title"
            subtitle="A Pack Subtitle, it's a bit long"
            desc="10 items"
            :width="200"/>
          <QPackCover
            title="A Pack Title"
            subtitle="A Pack Subtitle, it's a bit long"
            desc="10 items"
            :width="200"/>
        </div>
      </div>

      <!-- Text Ellipsis -->
      <div class="demo-group">
        <div class="group-label q-text-caption q-c-dark-3">Text Ellipsis</div>
        <div class="frame p-4">
          <h3 class="one-line-ellipsis q-text-h2 mb-2">A Pack Title That Is Very Long And Should Be Truncated</h3>
          <div class="two-line-ellipsis q-text-desc q-c-dark-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
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

.cover-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
