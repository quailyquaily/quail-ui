<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  items: {
    type: Array<any>,
    required: true,
  },
  persistent: {
    type: Boolean,
    default: false,
  },
  noFrame: {
    type: Boolean,
    default: false,
  },
  noShadow: {
    type: Boolean,
    default: false,
  },
  focusedIndex: {
    type: Number,
    default: -1,
  },
});

const emit = defineEmits(["action"]);

const menuCls = computed(() => {
  let _cls = []
  if (props.persistent) {
    _cls.push("persistent");
  }
  if (props.noFrame) {
    _cls.push("no-frame");
  }
  if (props.noShadow) {
    _cls.push("no-shadow");
  }
  return _cls.join(" ");
});

// Map focusedIndex (navigable items only) to actual item index
const focusedItemIndex = computed(() => {
  if (props.focusedIndex < 0) return -1;
  let navIndex = -1;
  for (let i = 0; i < props.items.length; i++) {
    const item = props.items[i];
    if (!item.divider && !item.disabled) {
      navIndex++;
      if (navIndex === props.focusedIndex) {
        return i;
      }
    }
  }
  return -1;
});

function cls(item: any, index: number) {
  let _cls = "";
  if (item.disabled) {
    _cls += " disabled";
  }
  if (item.danger) {
    _cls += " danger";
  }
  if (item.icon) {
    _cls += " with-icon";
  }
  if (item.image) {
    _cls += " with-image";
  }
  if (item.divider) {
    _cls += " with-divider";
  }
  if (index === focusedItemIndex.value) {
    _cls += " focused";
  }
  return _cls;
}

function doAction(item: any) {
  if (item.action) {
    item.action(item);
  }
  if (item.disabled !== true) {
    emit("action", item);
  }
}
</script>
<template>
  <div class="q-menu" :class="menuCls" role="menu">
    <div
      class="q-menu-item"
      v-for="(item, index) in props.items"
      :key="`q-menu-item-${item.id}`"
      :class="cls(item, index)"
      :role="item.divider ? 'separator' : 'menuitem'"
      :aria-disabled="item.disabled ? 'true' : undefined"
      @click="doAction(item)"
    >
      <div v-if="item.divider" class="q-menu-item-divider"></div>
      <div v-else class="q-menu-item-inner">
        <img
          v-if="item.image"
          class="q-menu-image"
          :src="item.image"
          :alt="item.title"
        />
        <component
          v-else-if="item.icon"
          class="q-menu-icon"
          :is="item.icon"
        />
        <div class="q-menu-item-content">
          <div class="q-menu-title q-text-body-text">{{ item.title }}</div>
          <div v-if="item.subtitle" class="q-menu-subtitle q-text-caption q-c-dark-3">
            {{ item.subtitle }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.q-menu {
  position: absolute;
  width: 100%;
  min-width: 220px;
  background: var(--q-c-white);
  transform: translateY(0.5rem);
  border: 0.5px solid var(--q-c-dark-4);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0;
  border-radius: 6px;
  z-index: 20;
  &.no-frame {
    border: none;
  }
  &.no-shadow {
    box-shadow: none;
  }
  &.persistent {
    position: static;
    transform: none;
    z-index: inherit;
  }
  .q-menu-item {
    cursor: default;
    &.danger {
      color: var(--q-c-red);
    }
    &.disabled {
      opacity: 0.5;
      .q-menu-item-inner {
        &:hover {
          background-color: transparent;
        }
      }
    }
    &.with-icon,
    &.with-image {
      .q-menu-item-inner {
        .q-menu-item-content {
          margin-left: 1rem;
        }
      }
    }
    &.with-divider {
      height: 0px;
      padding: 0.5rem 0;
    }

    .q-menu-item-divider {
      border-top: 0.5px solid var(--q-c-dark-4);
      margin: 0 1rem;
      height: 0px;
      transform: translateY(-0.5px);
    }

    .q-menu-item-inner {
      display: flex;
      justify-items: center;
      align-items: center;
      padding: 0.5rem 1rem;
      transition: background-color 0.01s ease-in;
      user-select: none;
      &:hover {
        background-color: rgba(0, 0, 0, 0.06);
      }
      .q-menu-item-content {
        margin-left: 0rem;
      }
    }
    &.focused {
      .q-menu-item-inner {
        background-color: rgba(0, 0, 0, 0.06);
      }
    }

    .q-menu-image {
      height: 24px;
      width: 24px;
      min-height: 24px;
      min-width: 24px;
      border-radius: 6px;
    }

    .q-menu-icon {
      width: 20px;
      height: 20px;
      min-width: 20px;
      min-height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
@media (max-width: 768px) {
  .q-menu {
    .q-menu-item {
      .q-menu-item-inner {
        min-height: 44px;
      }
    }
  }
}
.dark {
  .q-menu {
    background: var(--q-bg-dark);
    border: 0.5px solid var(--q-c-light-4);
    box-shadow: 0 0 0px 0.5px var(--q-c-light-4);
    &.no-frame {
      border: none;
    }
    &.no-shadow {
      box-shadow: none;
    }
    .q-menu-item {
      &.danger {
        color: var(--q-c-red-light);
      }
      .q-menu-item-divider {
        border-top: 1px solid var(--q-c-light-4);
      }
      .q-menu-item-inner {
        &:hover {
          background-color: rgba(255, 255, 255, 0.12);
        }
      }
      &.focused {
        .q-menu-item-inner {
          background-color: rgba(255, 255, 255, 0.12);
        }
      }
    }
  }
}
</style>
