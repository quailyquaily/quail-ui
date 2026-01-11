<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">Badge</h2>

    <div class="badge-groups">
      <!-- Types -->
      <div class="badge-group">
        <div class="group-label q-text-caption q-c-dark-3">Types</div>
        <div class="flow">
          <QBadge type="default">Default</QBadge>
          <QBadge type="primary">Primary</QBadge>
          <QBadge type="success">Success</QBadge>
          <QBadge type="warning">Warning</QBadge>
          <QBadge type="danger">Danger</QBadge>
          <QBadge type="info">Info</QBadge>
        </div>
      </div>

      <!-- Variants -->
      <div class="badge-group">
        <div class="group-label q-text-caption q-c-dark-3">Variants</div>
        <div class="flow">
          <QBadge type="primary" variant="filled">Filled</QBadge>
          <QBadge type="primary" variant="outlined">Outlined</QBadge>
          <QBadge type="primary" variant="light">Light</QBadge>
        </div>
      </div>

      <!-- Sizes -->
      <div class="badge-group">
        <div class="group-label q-text-caption q-c-dark-3">Sizes</div>
        <div class="flow">
          <QBadge type="primary" size="sm">Small</QBadge>
          <QBadge type="primary" size="md">Medium</QBadge>
          <QBadge type="primary" size="lg">Large</QBadge>
        </div>
      </div>

      <!-- Rounded -->
      <div class="badge-group">
        <div class="group-label q-text-caption q-c-dark-3">Rounded</div>
        <div class="flow">
          <QBadge type="success" rounded>Rounded</QBadge>
          <QBadge type="warning" rounded>99+</QBadge>
          <QBadge type="danger" rounded>New</QBadge>
        </div>
      </div>

      <!-- Closable -->
      <div class="badge-group">
        <div class="group-label q-text-caption q-c-dark-3">Closable</div>
        <div class="flow">
          <QBadge v-for="tag in tags" :key="tag" type="primary" variant="light" closable @close="removeTag(tag)">
            {{ tag }}
          </QBadge>
        </div>
      </div>

      <!-- Dot -->
      <div class="badge-group">
        <div class="group-label q-text-caption q-c-dark-3">Dot</div>
        <div class="flow">
          <QBadge type="primary" dot />
          <QBadge type="success" dot />
          <QBadge type="warning" dot />
          <QBadge type="danger" dot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tags = ref(['Vue', 'TypeScript', 'Vite', 'SCSS']);

function removeTag(tag: string) {
  const index = tags.value.indexOf(tag);
  if (index > -1) {
    tags.value.splice(index, 1);
  }
}
</script>

<style scoped lang="scss">
.badge-groups {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.badge-group {
  .group-label {
    margin-bottom: 0.5rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
}
</style>
