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
  <div class="q-payment-approach-select">
    <div v-for="ch in _channels" :key="`app-${ch.name}`" class="q-payment-approach-item-wrapper" :class="selectedCls(ch)"
      @click="selectPaymentApproach(ch)">
      <div class="check-indicator">
        <QIconCheckCircle />
      </div>
      <QPaymentApproachItem
        :name="ch.name" :icons="ch.icons" :symbol="ch.symbol" :desc="ch.desc" :disabled="ch.disabled"
      >
        <span v-if="ch.balance !== undefined" class="channel-balance" :class="{ insufficient: ch.balanceInsufficient }">
          Bal: <strong>{{ ch.balance }}</strong>
        </span>
      </QPaymentApproachItem>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.q-payment-approach-select {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.channel-balance {
  font-size: 0.75rem;
  color: var(--q-c-dark-3);

  strong {
    color: var(--q-c-dark);
    font-weight: 600;
  }

  &.insufficient {
    color: var(--q-c-red);

    strong {
      color: var(--q-c-red);
    }
  }
}

.q-payment-approach-item-wrapper {
  position: relative;
  border-radius: var(--q-radius-md);
  border: 1.5px solid var(--q-c-dark-5);
  padding: 0 0.75rem 0 2.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: transparent;

  .check-indicator {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--q-c-dark-4);
    transition: color 0.2s ease;

    svg {
      width: 18px;
      height: 18px;
    }
  }

  &.selected {
    filter: none;
    opacity: 1;
    border-color: var(--q-c-red);
    background-color: var(--q-c-red-dimm-1);

    .check-indicator {
      color: var(--q-c-red);
    }
  }

  &.disabled {
    cursor: not-allowed;

    .check-indicator {
      opacity: 0.5;
    }
  }

  &:not(.disabled):hover {
    border-color: var(--q-c-dark-4);
    background-color: var(--q-c-dark-5);

    &.selected {
      border-color: var(--q-c-red);
      background-color: var(--q-c-red-dimm-1);
    }
  }

  &:not(.disabled):active {
    transform: scale(0.996);
  }
}

.dark {
  .channel-balance {
    color: var(--q-c-light-3);

    strong {
      color: var(--q-c-light);
    }

    &.insufficient {
      color: var(--q-c-red-light);

      strong {
        color: var(--q-c-red-light);
      }
    }
  }

  .q-payment-approach-item-wrapper {
    border-color: var(--q-c-light-4);

    .check-indicator {
      color: var(--q-c-light-3);
    }

    &.selected {
      border-color: var(--q-c-red-light);
      background-color: var(--q-c-red-dimm-2);

      .check-indicator {
        color: var(--q-c-red-light);
      }
    }

    &:not(.disabled):hover {
      border-color: var(--q-c-light-3);
      background-color: var(--q-c-light-5);

      &.selected {
        border-color: var(--q-c-red-light);
        background-color: var(--q-c-red-dimm-2);
      }
    }
  }
}
</style>
