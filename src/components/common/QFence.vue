<template>
  <div class="q-fence" :class="type">
    <a v-if="link" class="q-fence-inner with-link" :href="link" target="_blank">
      <template v-if="icon && components">
        <component :is="components[icon]" class="icon" />
      </template>
      <q-icon-help v-else class="icon" ></q-icon-help>
      <div class="q-fence-text q-text-body-title">
        {{ text }}
      </div>
    </a>
    <div v-else class="q-fence-inner">
      <template v-if="icon && components">
        <component :is="components[icon]" class="icon" />
      </template>
      <q-icon-help v-else class="icon" ></q-icon-help>
      <div class="q-fence-text q-text-body-title">
        {{ text }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, getCurrentInstance } from "vue";
import QIconHelp from '../icons/QIconHelp.vue';
const components = getCurrentInstance()?.appContext.components;

const props = defineProps({
  link: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "default",
  },
  icon: {
    type: String,
  },
});
</script>
<style lang="scss">
@use "@/styles/mixin/blur-glass.scss" as blur-glass;

.q-fence {
  display: block;
  width: 100%;
  .q-fence-inner {
    @include blur-glass.blur-glass;
    border-radius: var(--q-fence-radius);
    border: var(--q-fence-border-width) solid var(--q-fence-border-color);
    display: flex;
    align-items: flex-start;
    width: 100%;
    padding: 0.5rem 0.8rem;
    color: var(--q-fence-text);
    opacity: var(--q-fence-opacity);
    background: var(--q-fence-bg);
    text-decoration: none;
    transition: all 0.2s ease-in-out;
    cursor: default;
    .icon {
      width: 16px;
      min-width: 16px;
      margin-right: 0.75rem;
    }
    &.with-link:hover {
      opacity: 1;
    }
    .q-fence-text {
      line-height: 1.6 !important;
    }
  }
  &.warning {
    .q-fence-inner {
      color: var(--q-fence-warning-text);
      background-color: var(--q-fence-warning-bg);
    }
  }
  &.error {
    .q-fence-inner {
      color: var(--q-fence-danger-text);
      background-color: var(--q-fence-danger-bg);
    }
  }
  &.success {
    .q-fence-inner {
      color: var(--q-fence-success-text);
      background-color: var(--q-fence-success-bg);
    }
  }
}
.dark {
  .q-fence {
    .q-fence-inner {
      color: var(--q-c-light-2);
      background: rgba(255, 255, 255, 0.03);
      opacity: 1;
    }
    &.warning {
      .q-fence-inner {
        color: var(--q-c-orange-light);
        background-color: var(--q-c-orange-dimm-1);
      }
    }
    &.error {
      .q-fence-inner {
        color: var(--q-c-red-light);
        background-color: var(--q-c-red-dimm-1);
      }
    }
    &.success {
      .q-fence-inner {
        color: var(--q-c-green);
        background-color: var(--q-c-green-dimm-1);
      }
    }
  }
}
</style>
