<script setup lang="ts">
import { computed, ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  type: {
    default: "text",
  },
  layout: {
    default: "vertical",
  },
  actionLabel: {
    default: "Submit",
  },
  placeholder: {
    default: "Type here",
  },
  defaultText: {
    default: "",
  },
  loading: {
    default: false,
  },
  buttonCls: {
    default: "primary",
  },
  disabled: {
    default: false,
  },
});

const emit = defineEmits(["submit", "update:modelValue"]);

const text = ref(props.defaultText);

const cls = computed(() => {
  const cls: string[] = [];
  if (props.layout === "vertical") {
    cls.push("vertical");
  } else {
    cls.push("horizontal");
  }
  if (props.type === "code") {
    cls.push("code");
  }
  if (props.disabled) {
    cls.push("disabled");
  }
  return cls.join(" ");
});

const validated = computed(() => {
  if (props.loading) {
    return false;
  }

  const trimed = text.value?.trim();
  if (trimed.length === 0) {
    return false;
  }

  if (props.type === "email") {
    return validateEmail.value;
  } else if (props.type === "code") {
    return validatedCode.value;
  }

  return true;
});

const validateEmail = computed(() => {
  const trimed = text.value?.trim();
  return !props.disabled && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimed);
});

const validatedCode = computed(() => {
  const trimed = text.value?.trim();
  return /^\d{6}$/.test(trimed);
});

const label = computed(() => {
  return props.actionLabel;
});

watch(() => props.modelValue, (value) => {
	text.value = value;
});

function submit() {
  if (validated.value) {
    emit("submit", { text: text.value });
  }
}

function changed() {
  emit("update:modelValue", text.value);
}
</script>

<template>
  <div class="q-text-field-with-button" :class="cls">
    <div class="q-text-field-wrapper">
      <input
        class="q-text-field text-field"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        v-model="text"
        @change="changed"
      />
    </div>
    <div class="q-text-button-wrapper">
      <q-button :class="buttonCls" :disabled="!validated" @click="submit" :loading="loading">
        {{ label }}
      </q-button>
    </div>
  </div>
</template>

<style lang="scss">
.q-text-field-with-button {
  .q-text-field-wrapper {
    --q-text-field-with-button-border-color: var(--q-field-border-color);
    border: none;
    border-radius: var(--q-field-radius);
    box-shadow:
      inset 0 0 0 var(--q-field-border-width) var(--q-text-field-with-button-border-color),
      var(--q-field-shadow);
    transition: box-shadow 0.2s ease-in-out;
    background-color: var(--q-field-bg);

    &:has(input:focus) {
      --q-text-field-with-button-border-color: var(--q-field-border-color-focus);
      box-shadow:
        inset 0 0 0 var(--q-field-border-width) var(--q-text-field-with-button-border-color),
        var(--q-field-shadow-focus, var(--q-field-shadow));
    }
  }

  .q-text-field {
    border: none !important;
    box-shadow: none !important;
    outline: none !important;
    background-color: transparent;
    text-align: center;
    border-radius: 0;
    min-height: 42px;
    min-width: 296px;
    color: var(--q-field-text-color);
    font-size: 0.9375rem;

    &::placeholder {
      color: var(--q-field-placeholder-color);
    }

    &[disabled] {
      opacity: 0.5;
      cursor: default;
    }
  }

  .q-text-button-wrapper {
    .q-button {
      transform: translateY(-1px);
      width: 100%;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      &.squircle {
        --squircle-radius-top-left: 0px;
        --squircle-radius-top-right: 0px;
      }
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &.vertical {
    .q-text-field-wrapper {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  &.code {
    .q-text-field {
      font-family: var(--q-font-mono);
      letter-spacing: 0.2rem;
    }
  }

  &.disabled {
    .q-text-field-wrapper {
      background-color: transparent;
    }
  }

  &.horizontal {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 400px;

    .q-text-field-wrapper {
      flex: 6;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    .q-text-button-wrapper {
      flex: 4;
      position: relative;
      z-index: 1;
      .q-button {
        border-radius: 0 8px 8px 0;
        transform: translateY(0px);
        &.squircle {
          --squircle-radius-bottom-left: 0px;
          --squircle-radius-top-right: 0px;
        }
      }
    }

    .q-text-field {
      min-width: auto;
    }
  }
}

.dark {
  .q-text-field-with-button {
    .q-text-field-wrapper {
      --q-text-field-with-button-border-color: var(--q-c-light-5);
      box-shadow:
        inset 0 0 0 var(--q-field-border-width) var(--q-text-field-with-button-border-color),
        inset 0px 1px 8px 0px rgba(0,0,0,0.03),
        0px 1px 1px 0px #4343431A;
      background-color: rgba(255,255,255,0.03);

      &:has(input:focus) {
        --q-text-field-with-button-border-color: var(--q-c-light-4);
      }
    }

    .q-text-field {
      color: var(--q-c-light);
      background-color: transparent;

      &::placeholder {
        color: var(--q-c-light-3);
      }
    }
  }
}

</style>
