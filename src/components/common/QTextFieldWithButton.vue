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
  if (props.loading) {
    return "Loading...";
  }

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
        v-model="text"
        @change="changed"
      />
    </div>
    <div class="q-text-button-wrapper">
      <q-button :class="buttonCls" :disabled="!validated" @click="submit">
        {{ label }}
      </q-button>
    </div>
  </div>
</template>

<style lang="scss">
.q-text-field-with-button {
  .q-text-field {
    text-align: center;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    min-width: 296px;
    background-color: transparent;
    color: var(--q-c-dark);
  }
  .q-text-button-wrapper {
    .q-button {
      transform: translateY(-1px);
      width: 100%;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &.code {
    .q-text-field {
      font-family: monospace;
      letter-spacing: 0.2rem;
    }
  }
  &.horizontal {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 400px;
    .q-text-field-wrapper {
      flex: 6;
    }
    .q-text-button-wrapper {
      flex: 4;
      position: relative;
      z-index: 1;
      .q-button {
        border-radius: 0 6px 6px 0;
        transform: translateY(0px);
      }
    }
    .q-text-field {
      border-radius: 6px 0 0 6px;
      border-width: 1px 0 1px 1px;
      min-width: auto;
    }
  }
}

</style>
