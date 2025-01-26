<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';

const props = defineProps({
  channels: {
    type: Array<any>,
    required: true,
    default: () => [],
  },
  defaultChannel: {
    type: String,
    default: '',
  },
});

const _channels = ref(props.channels);

const emit = defineEmits(['select']);

function selectedCls(ch:any) {
  const cls = [ch.selected ? 'selected': ''];
  if (ch.disabled) {
    cls.push('disabled');
  }
  return cls.join(' ')
}

function selectPaymentApproach(item:any) {
  if (item.disabled) {
    return;
  }
  const idx = _channels.value.findIndex((ch) => ch.name === item.name);
  if (idx === -1) {
    return;
  }
  _channels.value.forEach((ch) => {
    ch.selected = false;
  });
  _channels.value[idx].selected = true;
  emit('select', { name: item.name } );
}

onMounted(() => {
  const idx = _channels.value.findIndex((ch) => ch.name === props.defaultChannel);
  if (idx === -1) {
    return;
  }
  _channels.value.forEach((ch) => {
    ch.selected = false;
  });
  _channels.value[idx].selected = true;
});
</script>

<template>
  <div class="q-payment-approach-select grid gap-satoshi grid-cols-1">
    <div v-for="ch in _channels" :key="`app-${ch.name}`" class="q-payment-approach-item-wrapper" :class="selectedCls(ch)"
      @click="selectPaymentApproach(ch)">
      <QPaymentApproachItem
        :name="ch.name" :icons="ch.icons" :symbol="ch.symbol" :desc="ch.desc" :disabled="ch.disabled"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.q-payment-approach-item-wrapper {
  border-radius: 2px;
  border: 0.5px solid transparent;
  padding: 0 0.8rem;
  &.selected {
    filter: none;
    opacity: 1;
    border-color: var(--q-c-red);
    background-color: var(--q-c-red-dimm-1);
  }
  &.disabled {
    filter: grayscale(1);
    cursor: not-allowed;
    .approach-icons {
      opacity: 0.5;
    }
  }
  &:hover {
    background-color: var(--q-c-red-dimm-1);
    &.selected {
      background-color: var(--q-c-red-dimm-1);
    }
  }
}
.dark {
  .q-payment-approach-item-wrapper {
    &.selected {
      border-color: var(--q-c-red-light);
      background-color: var(--q-c-red-dimm-2);
    }
    &:hover {
      background-color: var(--q-c-red-dimm-2);
      &.selected {
        background-color: var(--q-c-red-dimm-2);
      }
    }
  }
}
</style>