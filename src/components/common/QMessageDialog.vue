<script lang="ts" setup>
import { computed, ref, watch, type Ref } from "vue";

const props = defineProps({
  modelValue: Boolean,
  title: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    default: "",
  },
  actions: {
    type: Array<any>,
    default: () => [],
  },
  icon: {
    type: String,
    default: "",
  },
  iconEmoji: {
    type: String,
    default: "",
  },
  iconColor: {
    type: String,
    default: "",
  },
});

const show = ref(props.modelValue);

const emit = defineEmits(['update:modelValue']);

const acts = computed(() => {
  if (props.actions.length > 2) {
    return props.actions.slice(0, 2)
  }
  return props.actions;
});

watch(() => props.modelValue, (value) => {
	show.value = value;
});

function closeDialog() {
  show.value = false;
  emit('update:modelValue', false);
}

</script>

<template>
  <QDialog v-model="show" class="message-dialog-wrapper" width="500px" @close="closeDialog">
    <div class="message-dialog-content">
      <div class="mt-6 mb-4 text-center">
        <div class="icon-wrapper" :class="iconColor">
          <span v-if="iconEmoji" class="icon-emoji">{{ iconEmoji }}</span>
          <component v-else :is="props.icon" class="icon"/>
        </div>
      </div>
      <div class="q-text-body mb-2 text-center font-bold">
        {{ props.title }}
      </div>
      <div class="q-text-body-title mb-6 text-center message-dialog-text q-c-dark-2">
        {{ props.text }}
      </div>
      <div class="buttons grid gap-4" :class="`grid-cols-${acts.length}`">
        <QButton v-for="act in acts" :class="act.class" @click="act.action" :key="act.name">
          {{ act.label }}
        </QButton>
      </div>
    </div>
  </QDialog>
</template>

<style lang="scss" scoped>
.message-dialog-content {
  .icon-wrapper {
    width: 46px;
    height: 46px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: var(--q-c-blue-dimm-2);
    box-shadow: 0 0 0 8px var(--q-c-blue-dimm-1);
    &.orange {
      background-color: var(--q-c-orange-dimm-2);
      box-shadow: 0 0 0 8px var(--q-c-orange-dimm-1);
      .icon {
        color: var(--q-c-orange-light);
      }
    }
    &.red {
      background-color: var(--q-c-red-dimm-2);
      box-shadow: 0 0 0 8px var(--q-c-red-dimm-1);
      .icon {
        color: var(--q-c-red-light);
      }
    }
    &.green {
      background-color: var(--q-c-green-dimm-2);
      box-shadow: 0 0 0 8px var(--q-c-green-dimm-1);
      .icon {
        color: var(--q-c-green-light);
      }
    }
    .icon {
      width: 24px;
      height: 24px;
      color: var(--q-c-blue-light);
    }
    .icon-emoji {
      height: 24px;
      width: 24px;
      font-size: 20px;
      line-height: 1;
    }
  }
}

.dark {
  .icon-wrapper {
    &.orange {
      background-color: var(--q-c-orange-dimm-3);
      box-shadow: 0 0 0 8px var(--q-c-orange-dimm-2);
      .icon {
        color: var(--q-c-orange-lighter);
      }
    }
    &.red {
      background-color: var(--q-c-red-dimm-3);
      box-shadow: 0 0 0 8px var(--q-c-red-dimm-2);
      .icon {
        color: var(--q-c-red-lighter);
      }
    }
    &.green {
      background-color: var(--q-c-green-dimm-3);
      box-shadow: 0 0 0 8px var(--q-c-green-dimm-2);
      .icon {
        color: var(--q-c-green-lighter);
      }
    }
  }
}

</style>
