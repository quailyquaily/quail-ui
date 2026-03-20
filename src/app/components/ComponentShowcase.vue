<script setup lang="ts">
import { ref } from 'vue';

const props = withDefaults(defineProps<{
  id: string;
  title: string;
  description?: string;
  sourceCode?: string;
  variant?: 'default' | 'feature';
  showSourceToggle?: boolean;
}>(), {
  variant: 'default',
  showSourceToggle: true,
});

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
</script>

<template>
  <div :id="`demo-section-${id}`" class="component-showcase" :class="variant">
    <div class="showcase-header">
      <div class="showcase-title-area">
        <h2 class="q-text-h2">{{ title }}</h2>
        <p v-if="description" class="q-text-desc q-c-dark-3 mt-1">{{ description }}</p>
      </div>

      <QButton
        v-if="sourceCode && showSourceToggle"
        :class="`showcase-toggle xs ${showCode ? 'outlined' : 'plain'}`"
        :aria-pressed="showCode"
        @click="showCode = !showCode"
      >
        <span class="toggle-text">{{ showCode ? 'Hide code' : 'Show code' }}</span>
        <span class="toggle-icon-wrap">
          <QIconCode class="icon" />
        </span>
      </QButton>
    </div>

    <div v-if="sourceCode && showSourceToggle" class="showcase-code-shell" :class="{ open: showCode }">
      <div class="showcase-code">
        <div class="code-header">
          <span class="q-text-caption code-label">Source Code</span>
          <QButton class="plain xs copy-btn" @click="copyCode">
            <QIconCopy class="icon" />
            <span class="btn-text">{{ copySuccess ? 'Copied!' : 'Copy' }}</span>
          </QButton>
        </div>
        <pre class="code-content"><code>{{ sourceCode }}</code></pre>
      </div>
    </div>

    <div class="showcase-preview">
      <div class="preview-surface">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.component-showcase {
  display: grid;
  --showcase-inline-pad: clamp(0.95rem, 2.2vw, 1.25rem);
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.showcase-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  padding-inline: var(--showcase-inline-pad);

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
  }
}

.component-showcase.feature {
  display: grid;
  grid-template-columns: minmax(15rem, 20rem) minmax(0, 1fr);
  gap: clamp(1rem, 2.4vw, 1.6rem);
  margin-bottom: 0;
  padding: clamp(0.85rem, 2.2vw, 1.2rem) 0;
  border-top: 0.5px solid var(--q-c-dark-5);

  .showcase-header {
    padding: 0;
    flex-direction: column;
    gap: 0.75rem;
  }

  .showcase-title-area {
    max-width: 18rem;
  }

  .showcase-preview {
    min-height: 0;
  }

  .preview-surface {
    min-height: 100%;
  }

  .showcase-code-shell {
    grid-column: 1 / -1;
  }
}

.showcase-title-area {
  flex: 1;
  min-width: 0;
}

.showcase-toggle {
  display: flex;
  align-items: center;
  flex-shrink: 0;

  :deep(.button-inner) {
    gap: 0.45rem;
  }

  :deep(.icon) {
    margin-right: 0;
    margin-left: 0;
    flex-shrink: 0;
  }

  @media (max-width: 640px) {
    justify-content: flex-end;
  }
}

.toggle-text {
  white-space: nowrap;
  line-height: 1;
}

.toggle-icon-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.showcase-code-shell {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transition:
    grid-template-rows 0.22s cubic-bezier(0.19, 1, 0.22, 1),
    opacity 0.18s ease-out;

  &.open {
    grid-template-rows: 1fr;
    opacity: 1;
  }
}

.showcase-code {
  min-height: 0;
  background: #1a1a1f;
  border: 0.5px solid var(--q-c-dark-4);
  border-radius: 10px;
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
  overflow-y: auto;
  font-family: var(--q-font-mono);
  font-size: 0.8125rem;
  line-height: 1.6;
  color: #d4d4d8;
  max-height: 400px;

  code {
    font-family: inherit;
    white-space: pre;
  }
}

.showcase-preview {
  min-height: 100px;
}

.preview-surface {
  padding: var(--showcase-inline-pad);
  border: 0.5px solid var(--q-c-dark-5);
  border-radius: 10px;
  background: color-mix(in srgb, var(--q-bg-light) 94%, white 6%);

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

@media (max-width: 900px) {
  .component-showcase.feature {
    grid-template-columns: 1fr;
  }
}

</style>

<style lang="scss">
.dark {
  .component-showcase {
    border-color: var(--q-c-light-4);
  }

  .component-showcase.feature {
    border-color: var(--q-c-light-5);

    .preview-surface {
      border-color: var(--q-c-light-5);
      background: color-mix(in srgb, var(--q-bg-dark) 88%, black 12%);
    }
  }

  .showcase-header {
    .q-text-h2 {
      color: var(--q-c-light);
    }

    .q-text-desc {
      color: var(--q-c-light-2) !important;
    }
  }

  .showcase-code {
    border-color: var(--q-c-light-5);
  }

  .showcase-preview {
    color: var(--q-c-light);
  }

  .preview-surface {
    border-color: var(--q-c-light-4);
    background: color-mix(in srgb, var(--q-bg-dark) 82%, black 18%);
  }
}
</style>
