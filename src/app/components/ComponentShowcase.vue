<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  id: string;
  title: string;
  description?: string;
  sourceCode?: string;
}>();

const showCode = ref(false);
const copySuccess = ref(false);

function copyCode() {
  if (props.sourceCode) {
    navigator.clipboard.writeText(props.sourceCode);
    copySuccess.value = true;
    setTimeout(() => {
      copySuccess.value = false;
    }, 2000);
  }
}

function toggleCode() {
  showCode.value = !showCode.value;
}
</script>

<template>
  <div :id="`demo-section-${id}`" class="component-showcase">
    <div class="showcase-header">
      <div class="showcase-title-area">
        <h2 class="q-text-h2">{{ title }}</h2>
        <p v-if="description" class="q-text-desc q-c-dark-3 mt-1">{{ description }}</p>
      </div>

      <div v-if="sourceCode" class="showcase-controls">
        <QButton
          class="outlined xs code-btn"
          @click="toggleCode"
        >
          <QIconCode class="icon" />
          <span class="btn-text">{{ showCode ? 'Hide' : 'Code' }}</span>
        </QButton>
      </div>
    </div>

    <div class="showcase-preview" :class="{ 'code-visible': showCode && sourceCode }">
      <div class="preview-inner">
        <slot></slot>
      </div>
    </div>

    <Transition name="slide-down">
      <div v-if="showCode && sourceCode" class="showcase-code">
        <div class="code-header">
          <span class="q-text-caption code-label">Source Code</span>
          <QButton class="plain xs copy-btn" @click="copyCode">
            <QIconCopy class="icon" />
            <span class="btn-text">{{ copySuccess ? 'Copied!' : 'Copy' }}</span>
          </QButton>
        </div>
        <pre class="code-content"><code>{{ sourceCode }}</code></pre>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.component-showcase {
  margin-bottom: 1.5rem;
  border: 0.5px solid var(--q-c-dark-4);
  border-radius: 8px;
  background: var(--q-bg-light);
}

.showcase-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0.875rem 1.25rem;
  background: var(--q-bg-light-2);
  border-bottom: 0.5px solid var(--q-c-dark-4);
  border-radius: 8px 8px 0 0;
  gap: 1rem;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
  }
}

.showcase-title-area {
  flex: 1;
  min-width: 0;
}

.showcase-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;

  @media (max-width: 640px) {
    justify-content: flex-end;
  }
}

.code-btn {
  .btn-text {
    margin-left: 0.375rem;
    @media (max-width: 480px) {
      display: none;
    }
  }
}

.showcase-preview {
  padding: 1.5rem;
  min-height: 100px;
  border-radius: 0 0 8px 8px;

  &.code-visible {
    border-radius: 0;
  }
}

.preview-inner {
  :deep(.section) {
    margin: 0;
  }

  :deep(.divider) {
    display: none;
  }

  :deep(.q-text-h2:first-child) {
    display: none;
  }
}

.showcase-code {
  border-top: 0.5px solid var(--q-c-dark-4);
  background: #1a1a1f;
  border-radius: 0 0 8px 8px;
  overflow: hidden;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background: #252529;
}

.code-label {
  color: var(--q-c-light-3);
}

.copy-btn {
  color: var(--q-c-light-2);

  .btn-text {
    margin-left: 0.375rem;
  }

  &:hover {
    color: var(--q-c-light);
  }
}

.code-content {
  padding: 1rem 1.25rem;
  margin: 0;
  overflow-x: auto;
  font-family: var(--q-font-mono);
  font-size: 0.8125rem;
  line-height: 1.6;
  color: #d4d4d8;
  max-height: 400px;
  overflow-y: auto;

  code {
    font-family: inherit;
    white-space: pre;
  }
}

// Slide animation
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.25s ease;
  overflow: hidden;
}

.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
}

.slide-down-enter-to,
.slide-down-leave-from {
  max-height: 500px;
  opacity: 1;
}

</style>

<style lang="scss">
.dark {
  .component-showcase {
    border-color: var(--q-c-light-4);
    background: var(--q-bg-dark);
  }

  .showcase-header {
    background: var(--q-bg-dark-2);
    border-bottom-color: var(--q-c-light-4);

    .q-text-h2 {
      color: var(--q-c-light);
    }

    .q-text-desc {
      color: var(--q-c-light-2) !important;
    }
  }

  .showcase-preview {
    color: var(--q-c-light);
  }

  .showcase-code {
    border-top-color: var(--q-c-light-4);
  }
}
</style>
