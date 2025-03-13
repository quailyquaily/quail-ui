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
.q-fence {
  display: block;
  width: 100%;
  .q-fence-inner {
    border-radius: 6px;
    display: flex;
    align-items: flex-start;
    width: 100%;
    padding: 0.5rem 0.8rem;
    color: var(--q-c-dark);
    opacity: 0.7;
    background: rgba(0, 0, 0, 0.04);
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
      color: var(--q-c-orange-dark);
      background-color: var(--q-c-orange-dimm-1);
    }
  }
  &.error {
    .q-fence-inner {
      color: var(--q-c-red-dark);
      background-color: var(--q-c-red-dimm-1);
    }
  }
  &.success {
    .q-fence-inner {
      color: var(--q-c-green-dark);
      background-color: var(--q-c-green-dimm-1);
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
