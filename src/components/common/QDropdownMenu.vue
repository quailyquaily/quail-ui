<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch, type Ref } from "vue";
import { closePopupMenu, onPopupClose, debounce } from "../../util";
import { useSlots } from 'vue'

const slots = useSlots()
const focusedIndex = ref(-1)

const props = defineProps({
  items: {
    type: Array<any>,
    required: true,
  },
  initialItem: {
    type: Object,
    default: null,
  },
  hideSelected: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: "outlined",
  },
  hideActionLabel: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: "",
  },
  useDialog: {
    type: String,
    default: 'auto',
  },
  useFilter: {
    type: Boolean,
    default: false,
  },
  scrollHeight: {
    type: String,
    default: 'auto',
  },
  emptyHit: {
    type: String,
    default: "No item",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["change"]);
const expanded = ref(false);
const selectedItem: Ref<any> = ref(null);
const menuWrapper: Ref<any> = ref(null);
const scrollArea: Ref<any> = ref(null);
const scrollAreaCls = ref("");
const filterText = ref("");

const actionCls = computed(() => {
  const cls: string[] = [];
  if (expanded.value) {
    cls.push("expanded");
  }

  if (props.variant === "outlined") {
    cls.push("outlined");
  } else if (props.variant === "plain") {
    cls.push("plain");
  }

  if (props.hideSelected) {
    cls.push("hide-selected");
  }

  if (selectedItem.value && (selectedItem.value.icon || selectedItem.value.image)) {
    cls.push("prepend");
  } else {
    cls.push("no-prepend");
  }

  if (props.loading) {
    cls.push("loading");
  }

  if ((window as any)?._quailui_use_squircle) {
    cls.push("squircle");
  }

  return cls.join(" ");
});

const hasSlot = computed(() => {
  return slots.default !== undefined;
});

const filteredItems = computed(() => {
  if (props.items && props.items.length > 0) {
    if (filterText.value.trim() === "") {
      return props.items;
    }
    const text = filterText.value.toLowerCase();
    return props.items.filter((item) => {
      if (item?.title?.toLowerCase().includes(text)) {
        return true;
      }
      return false;
    });
  }
  return [];
});

const useDialogFlag = computed(() => {
  if (props.useDialog === "always") {
    return true
  } else if (props.useDialog === "never") {
    return false
  } else {
    return window.innerWidth < 768
  }
});

function toggle() {
  if (props.disabled || props.loading) {
    return;
  }

  if (!expanded.value) {
    // want to expand? close other menus
    closePopupMenu();
  }
  // toggle
  expanded.value = !expanded.value;
  focusedIndex.value = -1;
  // adjust menu position to make sure it's visible
  if (expanded.value) {
    if (!useDialogFlag.value) {
      requestAnimationFrame(() => {
        const wrapper = menuWrapper?.value;
        const menu = wrapper?.querySelector(".q-menu");
        if (!menu) return;
        const rect = menu.getBoundingClientRect();
        if (rect.left < 0) {
          menu.style.left = "0";
        }
      });
    } else {
      debounce(() => {
        scrollArea?.value?.addEventListener("scroll", () => {
          debounce(() => {
            scrollAreaCls.value = scrollArea.value.scrollTop > 0 ? "scrolled" : "";
          }, 100)()
        });
      }, 1000)();
    }
  }
}

function menuItemClick(item: any) {
  if (item.divider) {
    return ;
  }
  expanded.value = false;
  selectedItem.value = item;
  emit("change", item);
}

// Keyboard navigation
function handleKeyDown(event: KeyboardEvent) {
  if (!expanded.value) return;

  const items = filteredItems.value.filter((item: any) => !item.divider && !item.disabled);
  if (!items.length) return;

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault();
      focusedIndex.value = Math.min(focusedIndex.value + 1, items.length - 1);
      break;
    case 'ArrowUp':
      event.preventDefault();
      focusedIndex.value = Math.max(focusedIndex.value - 1, 0);
      break;
    case 'Enter':
      event.preventDefault();
      if (focusedIndex.value >= 0 && focusedIndex.value < items.length) {
        menuItemClick(items[focusedIndex.value]);
      }
      break;
    case 'Escape':
      event.preventDefault();
      expanded.value = false;
      break;
  }
}

// Popup close handler
function handlePopupClose() {
  expanded.value = false;
}

watch(
  () => props.initialItem,
  () => {
    if (props.initialItem) {
      selectedItem.value = props.initialItem;
    }
  }
);

let cleanupPopupClose: (() => void) | null = null;

onMounted(() => {
  if (props.initialItem) {
    selectedItem.value = props.initialItem;
  }

  cleanupPopupClose = onPopupClose(handlePopupClose);
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  cleanupPopupClose?.();
  window.removeEventListener("keydown", handleKeyDown);
});
</script>

<template>
  <div class="q-dropdown-menu">
    <div class="q-dropdown-menu-inner narrow-view">
      <div class="q-dropdown-menu-action touchable" :class="actionCls" @click.stop="toggle">
        <div v-if="props.loading" class="ocean">
          <div class="wave"></div>
        </div>
        <div v-if="!hideSelected && selectedItem && !hasSlot" class="q-dropdown-selected">
          <img
            v-if="selectedItem.image"
            class="menu-image"
            :src="selectedItem.image"
            :alt="selectedItem.title"
          />
          <component
            v-else-if="selectedItem.icon"
            class="icon menu-icon"
            :is="selectedItem.icon"
          ></component>
          <div v-if="!hideActionLabel" class="menu-title q-text-body-text">
            {{
              selectedItem
                ? selectedItem.title
                : props.placeholder || "Select ..."
            }}
          </div>
        </div>
        <slot></slot>
        <div v-if="hideSelected || hasSlot" class="empty-block"></div>
        <q-icon-chevron-down class="icon chevron-icon" ></q-icon-chevron-down>
      </div>
      <div v-if="!useDialogFlag" ref="menuWrapper">
        <Transition>
          <q-menu v-if="expanded" :items="items" :focused-index="focusedIndex" @action="menuItemClick"></q-menu>
        </Transition>
      </div>
      <q-dialog v-if="useDialogFlag" v-model="expanded" no-frame>
        <div class="q-menu-popup-body">
          <div v-if="props.useFilter" class="filter-area">
            <input type="text" class="filter-input text-field" placeholder="Filter" v-model="filterText" />
          </div>
          <div class="scroll-area" :class="scrollAreaCls" ref="scrollArea" :style="{ height: props.scrollHeight, maxHeight: props.scrollHeight }">
            <q-menu v-if="filteredItems" :items="filteredItems" :focused-index="focusedIndex" @action="menuItemClick" persistent no-frame no-shadow></q-menu>
            <div v-else class="empty-hint flow place-center" v-text="emptyHit"></div>
          </div>
        </div>
      </q-dialog>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/styles/mixin/touchable.scss";

.q-dropdown-menu {
  // height: 44px;
  &.sm {
    .q-dropdown-menu-action {
      padding: 0 0.5rem 0 0.8rem;
      height: 38px;
      font-size: 0.9375rem;
      .menu-icon {
        margin-left: 2px;
      }
    }
  }
  &.xs {
    .q-dropdown-menu-action {
      padding: 0 0.5rem 0 0.6rem;
      height: 32px;
      font-size: 0.75rem;
      .menu-icon {
        margin-left: 4px;
      }
    }
  }
  .q-dropdown-menu-inner {
    position: relative;
  }
  .q-dropdown-menu-action {
    overflow: hidden;
    height: 44px;
    padding: 0 0.5rem 0 0.8rem;
    display: flex;
    justify-items: center;
    align-items: center;
    cursor: default;
    transition: all 0.2s ease-in;

    &:hover {
      .chevron-icon {
        opacity: 1;
      }
    }
    .empty-block {
      flex: 1;
    }
    .menu-icon {
      margin-left: 4px;
    }
    .menu-title {
      margin-left: 12px;
    }
    .chevron-icon {
      transition: all 0.2s ease-in;
      margin-left: 0rem;
      opacity: 0.5;
      height: 14px;
    }
    &.expanded {
      .chevron-icon {
        transform: rotate(180deg);
      }
    }
    &.hide-selected {
      padding: 0 0.8rem;
      .chevron-icon {
        margin-left: 0;
        opacity: 1;
      }
    }
    &.no-prepend {
      .menu-title {
        margin-left: 0;
      }
    }
  }
  .q-dropdown-selected {
    white-space: nowrap;
    flex: 1;
    display: flex;
    align-items: center;
    user-select: none;
    max-width: calc(100% - 16px);
    overflow: hidden;
  }
  .menu-image {
    width: 24px;
    height: 24px;
    border-radius: 6px;
  }
  .icon {
    height: 16px;
    width: 16px;
  }
  .q-menu {
    right: 0;
  }
}
.q-menu-popup-body {
  background: var(--q-c-white);
  border-radius: 8px;

  .filter-area {
    padding: 1rem 1rem 0.5rem 1rem;
  }
  .scroll-area {
    overflow-y: scroll;
    overflow-x: hidden;
    .empty-hint  {
      margin-top: 1rem;
      color: var(--q-c-dark-3)
    }
  }
  .scroll-area.scrolled {
    &:before {
      content: "";
      display: block;
      height: 0.5rem;
      width: 100%;
      position: absolute;
      // backdrop-filter: blur(10px);
      background: linear-gradient(180deg,rgba(0,0,0,.05) 0%,rgba(0,0,0,.0) 100%);
    }
  }
}
.dark {
  .q-menu-popup-body {
    background: var(--q-c-black);
    border: 0.5px solid var(--q-c-light-4);
    .scroll-area {
      .empty-hint  {
        color: var(--q-c-light-3)
      }
    }
  }
}
</style>
