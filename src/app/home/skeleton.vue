<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">Skeleton</h2>

    <div class="skeleton-groups">
      <!-- Variants -->
      <div class="skeleton-group">
        <div class="group-label q-text-caption q-c-dark-3">Variants</div>
        <div class="skeleton-demos">
          <div class="skeleton-demo">
            <div class="demo-label">text</div>
            <QSkeleton variant="text" />
          </div>
          <div class="skeleton-demo">
            <div class="demo-label">avatar</div>
            <QSkeleton variant="avatar" />
          </div>
          <div class="skeleton-demo">
            <div class="demo-label">button</div>
            <QSkeleton variant="button" />
          </div>
          <div class="skeleton-demo">
            <div class="demo-label">image</div>
            <QSkeleton variant="image" height="100px" />
          </div>
          <div class="skeleton-demo">
            <div class="demo-label">card</div>
            <QSkeleton variant="card" height="80px" />
          </div>
        </div>
      </div>

      <!-- Animations -->
      <div class="skeleton-group">
        <div class="group-label q-text-caption q-c-dark-3">Animations</div>
        <div class="skeleton-demos">
          <div class="skeleton-demo">
            <div class="demo-label">wave (default)</div>
            <QSkeleton variant="text" animation="wave" />
          </div>
          <div class="skeleton-demo">
            <div class="demo-label">pulse</div>
            <QSkeleton variant="text" animation="pulse" />
          </div>
          <div class="skeleton-demo">
            <div class="demo-label">none</div>
            <QSkeleton variant="text" animation="none" />
          </div>
        </div>
      </div>

      <!-- Multiple lines -->
      <div class="skeleton-group">
        <div class="group-label q-text-caption q-c-dark-3">Multiple Lines</div>
        <div class="skeleton-demos">
          <div class="skeleton-demo" style="width: 300px;">
            <QSkeleton variant="text" :count="3" />
          </div>
        </div>
      </div>

      <!-- Custom sizes -->
      <div class="skeleton-group">
        <div class="group-label q-text-caption q-c-dark-3">Custom Sizes</div>
        <div class="skeleton-demos">
          <div class="skeleton-demo">
            <div class="demo-label">60x60 avatar</div>
            <QSkeleton variant="avatar" width="60px" height="60px" />
          </div>
          <div class="skeleton-demo">
            <div class="demo-label">200x20 text</div>
            <QSkeleton variant="text" width="200px" height="20px" />
          </div>
        </div>
      </div>

      <!-- Card example -->
      <div class="skeleton-group">
        <div class="group-label q-text-caption q-c-dark-3">Card Example</div>
        <div class="skeleton-card">
          <QSkeleton variant="avatar" width="48px" height="48px" />
          <div class="skeleton-card-content">
            <QSkeleton variant="text" width="120px" height="14px" />
            <QSkeleton variant="text" width="200px" height="12px" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.skeleton-groups {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.skeleton-group {
  .group-label {
    margin-bottom: 0.5rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
}

.skeleton-demos {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: flex-start;
}

.skeleton-demo {
  .demo-label {
    font-size: 0.75rem;
    color: var(--q-c-dark-3);
    margin-bottom: 0.5rem;
  }
}

.skeleton-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: var(--q-bg-light);
  border-radius: var(--q-radius-md);

  .skeleton-card-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}

.dark {
  .skeleton-card {
    background: var(--q-bg-dark-2);
  }
}
</style>
