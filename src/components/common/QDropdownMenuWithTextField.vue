<template>
  <div class="q-dropdown-menu-with-text-field" :class="showBottom ? 'has-bottom' : 'no-bottom'">
    <div class="q-dropdown-menu-with-text-field-top">
      <div class="q-dropdown-menu-wrapper">
        <q-dropdown-menu
          :items="items"
          :initial-item="selectedItem"
          use-dialog="always"
          use-filter
          scroll-height="400px"
          variant="plain"
          @change="selectChanged"
        ></q-dropdown-menu>
      </div>
      <div class="q-text-field-wrapper">
        <input
          ref="textField"
          class="q-text-field text-field"
          :placeholder="props.placeholder"
          v-model="text"
          @change="textChanged"
        />
      </div>
    </div>
    <div v-if="showBottom" class="q-dropdown-menu-with-text-field-bottom">
      <div class="fill-action q-text-caption q-c-dark-3 plain flex" @click="fill">
        <span v-text="props.fillActionLabel"></span>
        <QIconArrowUpRight class="icon" />
      </div>
      <div class="q-text-caption q-c-dark-3 text-hint">
        <span v-text="props.hintText"></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { debounce } from "../../util";
import QIconArrowUpRight from "../icons/QIconArrowUpRight.vue";

const props = defineProps({
  items: {
    type: Array<any>,
    required: true,
  },
  placeholder: {
    default: "Type here",
  },
  defaultSelection: {
    type: Object,
  },
  defaultText: {
    default: "",
  },
  fillActionLabel: {
    default: "",
  },
  fillActionValue: {
    default: "",
  },
  hintText: {
    default: "",
  },
  textDisabled: {
    default: false,
  },
  selectDisabled: {
    default: false,
  },
});

const emit = defineEmits(["change"]);
const text = ref(props.defaultText);
const selectedItem = ref(props.defaultSelection);
const textField = ref<any>(null);

const showBottom = computed(() => {
  return props.fillActionLabel !== "" || props.hintText !== "";
});

function selectChanged(item:any) {
  selectedItem.value = item;
  changed();
}

function textChanged() {
  changed();
}

function changed() {
  const v = {
    selected: selectedItem.value,
    text: text.value
  }
  emit('change', v);
}

function fill() {
  text.value = props.fillActionValue;
  changed()
}

onMounted(() => {
  debounce(() => {
    selectedItem.value = props.defaultSelection;
    text.value = props.defaultText;
    if (selectedItem.value === null || selectedItem.value === undefined) {
      selectedItem.value = props.items[0];
    }
    textField.value.addEventListener("focus", () => {
      textField.value.select();
    });
  }, 300)();
});
</script>

<style scoped lang="scss">
.q-dropdown-menu-with-text-field {
  width: 100%;
  border-radius: 6px;
  border: 0.5px solid var(--q-c-dark-4);
  box-shadow: inset 0px 1px 8px 0px rgba(0,0,0,0.03), 0px 1px 1px 0px #4343431A;
  background-color: var(--q-bg-white);
  transition: border-color 0.2s ease-in-out;

  &:has(input:focus) {
    border-color: var(--q-c-dark-3);
  }

  &.no-bottom {
    .q-dropdown-menu-wrapper {
      &:deep(.touchable.plain) {
        border-bottom-right-radius: 0;
      }
    }
  }

  .q-dropdown-menu-with-text-field-top, .q-dropdown-menu-with-text-field-bottom {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }

  .q-dropdown-menu-wrapper {
    &:deep(.chevron-icon) {
      margin-left: 0.4rem;
    }
    &:deep(.touchable.plain) {
      border-bottom-left-radius: 0;
      border-top-right-radius: 0;
      border-top-left-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }

  .q-dropdown-menu-with-text-field-bottom {
    .text-hint {
      padding: 0.1rem 0.75rem 0.4rem .75rem;
    }
    .fill-action {
      padding: 0.1rem 0.75rem 0.4rem .75rem;
      cursor: default;
      transition: color 0.2s ease-in;
      display: flex;
      align-items: center;
      &:hover {
        color: var(--q-c-dark-2);
      }
    }
    .icon {
      width: 12px;
      height: 12px;
    }
  }
  .q-text-field-wrapper {
    flex: 1;
    &:deep(.q-text-field) {
      border: none;
      text-align: right;
      box-shadow: none;
      font-size: 0.9375rem;
    }

  }
}
.dark {
  .q-dropdown-menu-with-text-field {
    border: 0.5px solid var(--q-c-light-5);
    box-shadow: inset 0px 1px 8px 0px rgba(0,0,0,0.03), 0px 1px 1px 0px #4343431A;
    background-color: rgba(255,255,255,0.03);
    &:has(input:focus) {
      border-color: var(--q-c-light-4);
    }
    .q-dropdown-menu-with-text-field-bottom {
      .fill-action {
        &:hover {
          color: var(--q-c-light-2);
        }
      }
    }
    .q-text-field-wrapper {
      &:deep(.q-text-field) {
        background-color: transparent;
      }
    }
  }
}
</style>
