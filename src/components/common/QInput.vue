<template>
  <div class="q-input" :class="cls">
    <div class="q-input-prepend-out">
      <slot name="prepend-out"></slot>
    </div>
    <div class="q-text-field-wrapper">
      <div class="q-text-field-inner">
        <div class="q-input-prepend">
          <slot name="prepend"></slot>
        </div>
        <input
          ref="textField"
          class="q-text-field text-field"
          :type="props.inputType"
          :placeholder="props.placeholder"
          :disabled="props.disabled"
          v-model="text"
          @change="textChanged"
          @keyup="keyup"
          @focus="() => emit('focus')"
          @blur="() => emit('blur')"
        />
        <QButton v-if="!props.disabled" class="clear-btn plain sm icon" @click="clear">
          <QIconEditorDelete class="icon" />
        </QButton>
        <div class="q-input-append">
          <slot name="append"></slot>
        </div>
      </div>

      <div v-if="hasHint" class="q-text-field-hint q-text-caption">
        <div class="q-text-field-hint-left">
          <template v-if="hintIcon">
            <component :is="hintIcon" class="q-text-field-hint-icon"></component>
          </template>
          <div v-if="hintText" class="q-text-field-hint-text">
            {{ hintText }}
          </div>
        </div>
        <div v-if="max !== -1" class="q-text-field-counter q-text-caption">
          {{ text.length }} / {{ max }}
        </div>
      </div>
    </div>
    <div class="q-input-append-out">
      <slot name="append-out"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";

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
  disabled: {
    default: false,
  },
  hintIcon: {
    type: [String, Object],
    default: null,
  },
  hintText: {
    default: "",
  },
  error: {
    default: false,
  },
  max: {
    type: Number,
    default: -1,
  },
  inputType: {
    type: String,
    default: "text",
  },
});

const emit = defineEmits(["change", "blur", "focus", "keyup", "update:modelValue"]);
const text = ref(props.defaultText);
const textField = ref<any>(null);

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
  return props.hintIcon || props.hintText || props.max !== -1 || props.error;
});

const cls = computed(() => {
  const ret = [];
  if (props.disabled) {
    ret.push("disabled");
  }
  if (props.error) {
    ret.push("error");
  }
  if (exceed.value) {
    ret.push("exceed");
  }
  if (text.value === "") {
    ret.push("empty");
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

function clear() {
  text.value = "";
  updateValue();
  textField.value.focus();
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

<style scoped lang="scss">
.q-input {
  width: 100%;
  display: flex;
  align-items: flex-start;

  &.exceed, &.error {
    .q-text-field-wrapper {
      --q-input-border-color: var(--q-field-error-border-color);
      &:has(input:focus) {
        --q-input-border-color: var(--q-field-error-border-color);
      }
    }
    .q-text-field-hint {
      background-color: var(--q-field-error-bg);
    }
    .q-text-field-counter {
      color: var(--q-field-error-counter);
    }
  }

  &.error {
    .q-text-field-hint-text {
      color: var(--q-field-error-text);
    }
  }
  &.disabled {
    .clear-btn {
      display: none;
    }
    .q-text-field-wrapper {
      background-color: transparent
    }
  }

  .q-input-prepend, .q-input-append,
  .q-input-prepend-out, .q-input-append-out {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .q-text-field-wrapper {
    --q-input-border-color: var(--q-field-border-color);
    width: 100%;
    min-height: 44px;
    border: none;
    border-radius: var(--q-field-radius);
    box-shadow:
      inset 0 0 0 var(--q-field-border-width) var(--q-input-border-color),
      var(--q-field-shadow);
    transition: box-shadow 0.2s ease-in-out;
    background-color: var(--q-field-bg);
    // if textarea gets focus, apply border color to .q-textarea by parent pesudo class
    &:has(input:focus) {
      --q-input-border-color: var(--q-field-border-color-focus);
      box-shadow:
        inset 0 0 0 var(--q-field-border-width) var(--q-input-border-color),
        var(--q-field-shadow-focus, var(--q-field-shadow));
    }

    .q-text-field-inner {
      flex: 1;
      display: flex;
      align-items: center;
    }

    &:deep(.q-text-field) {
      border: none !important;
      box-shadow: none !important;
      outline: none !important;
      min-height: 42px;
      background-color: transparent;
      font-size: 0.9375rem;
      color: var(--q-field-text-color);
      &::placeholder {
        color: var(--q-field-placeholder-color);
      }
    }
    .clear-btn {
      min-height: 32px;
      max-height: 32px;
      min-width: 32px;
      max-width: 32px;
      margin-right: 4px;
      color: var(--q-field-clear-color);
    }

    .q-text-field-hint {
      color: var(--q-field-hint-color);
      padding: 0.2rem 0.5rem;
      margin-left: 0px;
      margin-right: 0px;
      border-bottom-left-radius: var(--q-field-radius);
      border-bottom-right-radius: var(--q-field-radius);
      display: flex;
      align-items: center;
      justify-content: space-between;
      .q-text-field-hint-left {
        display: flex;
        align-items: center;
      }
      .q-text-field-hint-icon {
        max-height: 20px;
        max-width: 20px;
        opacity: 0.7;
        margin-right: 0.5rem;
      }
    }
  }
  &.empty {
    .clear-btn {
      display: none;
    }
  }
}

.dark {
  .q-input {
    &.exceed, &.error {
      .q-text-field-wrapper {
        --q-input-border-color: var(--q-c-red-dimm-3);
        &:has(input:focus) {
          --q-input-border-color: var(--q-c-red-dimm-3);
        }
        .q-text-field-hint {
          background-color: var(--q-c-red-dimm-2);
        }
        .q-text-field-counter {
          color: var(--q-c-red-light);
        }
      }
    }
    &.error {
      .q-text-field-hint-text {
        color: var(--q-c-red-light);
      }
    }
    .q-text-field-wrapper {
      --q-input-border-color: var(--q-c-light-5);
      box-shadow:
        inset 0 0 0 var(--q-field-border-width) var(--q-input-border-color),
        inset 0px 1px 8px 0px rgba(0,0,0,0.03),
        0px 1px 1px 0px #4343431A;
      background-color: rgba(255,255,255,0.03);
      &:has(input:focus) {
        --q-input-border-color: var(--q-c-light-4);
      }
      &:deep(.q-text-field) {
        color: var(--q-c-light);
        background-color: transparent;
      }
      .clear-btn {
        color: var(--q-c-light-3);
      }
      .q-text-field-hint {
        color: var(--q-c-light-3);
      }
    }
    &.disabled {
      .q-text-field-wrapper {
        &:deep(.q-text-field) {
          opacity: 0.5;
        }
      }
    }
  }
}
</style>
