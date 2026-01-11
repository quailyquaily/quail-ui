<script setup lang="ts">
import { computed, onMounted, ref, watch, type Ref } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  placeholder: {
    default: "Type here",
  },
  defaultText: {
    default: "",
  },
  hintIcon: {
    type: [String, Object],
    default: null,
  },
  hintText: {
    default: "",
  },
  disabled: {
    default: false,
  },
  rows: {
    type: Number,
    default: 5,
  },
  error: {
    default: false,
  },
  max: {
    type: Number,
    default: -1,
  },
});

const emit = defineEmits(["change", "blur", "focus", "keyup", "update:modelValue"]);
const text = ref(props.defaultText);

watch(() => props.modelValue, (val) => {
  text.value = val;
});

const exceed = computed(() => {
  if (props.max === -1) {
    return false;
  }
  return text.value.length > props.max ;
});

const hasHint = computed(() => {
  return props.hintIcon || props.hintText || props.max !== -1;
});

const cls = computed(() => {
  const ret: any = [];
  if (props.disabled) {
    ret.push("disabled");
  };
  if (props.error) {
    ret.push("error");
  }
  if (exceed.value) {
    ret.push("exceed");
  }
  return ret.join(" ");
});

function keyup(e: KeyboardEvent) {
  updateValue();
  emit("keyup", e);
}

function textChanged() {
  updateValue();
  emit("change", text.value);
}

function updateValue() {
  emit("update:modelValue", text.value);
}

onMounted(() => {
  if (props.defaultText) {
    text.value = props.defaultText;
  } else if (props.modelValue) {
    text.value = props.modelValue;
  }
});

</script>

<template>
  <div class="q-textarea" :class="cls">
    <div class="q-textarea-prepend-out">
      <slot name="prepend-out"></slot>
    </div>
    <div class="q-textarea-wrapper">
      <div class="q-textarea-inner">
        <div class="q-textarea-prepend">
          <slot name="prepend"></slot>
        </div>

        <textarea class="textarea" v-model="text"
          @change="textChanged" @keyup="keyup"
          :rows="rows" :placeholder="props.placeholder" :disabled="disabled"></textarea>

        <div class="q-textarea-append">
          <slot name="append"></slot>
        </div>
      </div>
      <div v-if="hasHint" class="q-textarea-hint q-text-caption">
        <div class="q-textarea-hint-left">
          <template v-if="hintIcon">
            <component :is="hintIcon" class="q-textarea-hint-icon"></component>
          </template>
          <div v-if="hintText" class="q-textarea-hint-text q-text-caption">
            {{ hintText }}
          </div>
        </div>
        <div v-if="max !== -1" class="q-textarea-counter ">
          {{ text.length }} / {{ max }}
        </div>
      </div>
    </div>
    <div class="q-input-append-out">
      <slot name="append-out"></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.q-textarea {
  width: 100%;
  display: flex;
  align-items: flex-start;

  &.exceed, &.error {
    .q-textarea-wrapper {
      border: 0.5px solid var(--q-c-red-dimm-3);
      &:has(textarea:focus) {
        border-color: var(--q-c-red-dimm-3);
      }
    }
    .q-textarea-hint {
      background-color: var(--q-c-red-dimm-1);
    }
    .q-textarea-counter {
      color: var(--q-c-red);
    }
  }

  &.error {
    .q-textarea-hint {
      color: var(--q-c-red);
    }
  }

  &.disabled {
    .clear-btn {
      display: none;
    }
    .q-textarea-wrapper {
      background-color: transparent;
    }
  }

  .q-textarea-prepend, .q-textarea-append,
  .q-textarea-prepend-out, .q-textarea-append-out {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .q-textarea-wrapper {
    width: 100%;
    border: 0.5px solid var(--q-c-dark-4);
    border-radius: 6px;
    box-shadow: inset 0px 1px 8px 0px rgba(0,0,0,0.03), 0px 1px 1px 0px #4343431A;
    transition: border-color 0.2s ease-in-out;
    background-color: var(--q-bg-white);

    // if textarea gets focus, apply border color to .q-textarea by parent pesudo class
    &:has(textarea:focus) {
      border-color: var(--q-c-dark-3);
    }

    .q-textarea-inner {
      flex: 1;
      display: flex;
      align-items: flex-start;
    }

    &:deep(textarea) {
      border: none !important;
      box-shadow: none !important;
      outline: none !important;
      resize: none;
      background-color: transparent;
      font-size: 0.9375rem;
    }

    .q-textarea-hint {
      color: var(--q-c-dark-3);
      padding: 0.2rem 0.5rem;
      margin-left: 0px;
      margin-right: 0px;
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .q-textarea-hint-left {
        display: flex;
        align-items: center;
      }
      .q-textarea-hint-icon {
        max-height: 16px;
        max-width: 16px;
        opacity: 0.7;
        margin-right: 0.5rem;
      }
    }
  }
}

.dark {
  .q-textarea {
    &.exceed, &.error {
      .q-textarea-wrapper {
        border: 0.5px solid var(--q-c-red-dimm-3);
        &:has(textarea:focus) {
          border-color: var(--q-c-red-dimm-3) !important;
        }
      }
      .q-textarea-hint {
        background-color: var(--q-c-red-dimm-2);
      }
      .q-textarea-counter {
        color: var(--q-c-red-light);
      }
    }
    &.error {
      .q-textarea-hint-text {
        color: var(--q-c-red-light);
      }
    }
    .q-textarea-wrapper {
      border-color: var(--q-c-light-5);
      box-shadow: inset 0px 1px 8px 0px rgba(0,0,0,0.03), 0px 1px 1px 0px #4343431A;
      background-color: rgba(255,255,255,0.03);
      &:has(textarea:focus) {
        border-color: var(--q-c-light-4);
      }
      &:deep(textarea) {
        color: var(--q-c-light);
        background-color: transparent;
      }
      .q-textarea-hint {
        color: var(--q-c-light-3);
      }
    }

    &.disabled {
      .q-textarea-wrapper {
        &:deep(.q-text-field) {
          opacity: 0.5;
          background-color: var(--q-c-light-4);
        }
      }
    }
  }
}
</style>