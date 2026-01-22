<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    default: '',
  },
  icons: {
    type: Array,
    default: () => [],
  },
  symbol: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="q-payment-apparoch-item" :class="{ disabled: props.disabled }">
    <div class="approach-inner">
      <div class="approach-icons">
        <div v-for="icon in icons" :key="`icon-${icon}`" class="icon" :class="`icon-${icon}`"></div>
      </div>
      <div class="approach-desc q-text-caption q-c-dark mt-1" v-text="props.desc"></div>
    </div>
    <div class="spacer"></div>
    <slot></slot>
    <div class="quote-currency q-text-caption font-bold q-c-dark-2" v-text="symbol"></div>
  </div>
</template>

<style lang="scss" scoped>
.q-payment-apparoch-item {
  padding: 0.8rem 0;
  border-radius: 0.5rem;
  cursor: default;
  opacity: 0.8;
  display: flex;
  align-items: center;
  transition: opacity 0.2s ease;

  &.disabled {
    opacity: 0.45;

    .approach-icons {
      filter: grayscale(1);
    }

    .approach-desc {
      color: var(--q-c-dark-3);
    }
  }

  .approach-icons {
    display: flex;
    align-items: center;
    transition: filter 0.2s ease;

    .icon {
      height: 20px;
      display: inline-block;
      width: 30px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      margin-right: 0.2rem;
    }
    .icon-visa {
      background-image: url('@/assets/images/payment-icons/payment-card-visa.svg');
    }
    .icon-mastercard {
      background-image: url('@/assets/images/payment-icons/payment-card-mastercard.svg');
    }
    .icon-jcb {
      background-image: url('@/assets/images/payment-icons/payment-card-jcb.svg');
    }
    .icon-amex {
      background-image: url('@/assets/images/payment-icons/payment-card-amex.svg');
    }
    .icon-unionpay {
      background-image: url('@/assets/images/payment-icons/payment-card-unionpay.svg');
    }
    .icon-wechat_pay {
      background-image: url('@/assets/images/payment-icons/payment-wechat.svg');
    }
    .icon-alipay {
      background-image: url('@/assets/images/payment-icons/payment-alipay.svg');
    }
    .icon-paypal {
      background-image: url('@/assets/images/payment-icons/payment-paypal.svg');
    }
    .icon-evm {
      width: 200px;
      background-position: left;
      background-image: url('@/assets/images/payment-icons/payment-evm.svg');
    }
    .icon-wallet {
      width: 28px;
      height: 20px;
      border-radius: var(--q-radius-xs);
      border: 1px solid var(--q-c-dark-4);
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M16 7.99983V4.50048C16 3.66874 16 3.25287 15.8248 2.9973C15.6717 2.77401 15.4346 2.62232 15.1678 2.57691C14.8623 2.52493 14.4847 2.6992 13.7295 3.04775L4.85901 7.14182C4.18551 7.45267 3.84875 7.6081 3.60211 7.84915C3.38406 8.06225 3.21762 8.32238 3.1155 8.60966C3 8.93462 3 9.30551 3 10.0473V14.9998M16.5 14.4998H16.51M3 11.1998L3 17.7998C3 18.9199 3 19.48 3.21799 19.9078C3.40973 20.2841 3.71569 20.5901 4.09202 20.7818C4.51984 20.9998 5.07989 20.9998 6.2 20.9998H17.8C18.9201 20.9998 19.4802 20.9998 19.908 20.7818C20.2843 20.5901 20.5903 20.2841 20.782 19.9078C21 19.48 21 18.9199 21 17.7998V11.1998C21 10.0797 21 9.51967 20.782 9.09185C20.5903 8.71552 20.2843 8.40956 19.908 8.21782C19.4802 7.99983 18.9201 7.99983 17.8 7.99983L6.2 7.99983C5.0799 7.99983 4.51984 7.99983 4.09202 8.21781C3.7157 8.40956 3.40973 8.71552 3.21799 9.09185C3 9.51967 3 10.0797 3 11.1998ZM17 14.4998C17 14.776 16.7761 14.9998 16.5 14.9998C16.2239 14.9998 16 14.776 16 14.4998C16 14.2237 16.2239 13.9998 16.5 13.9998C16.7761 13.9998 17 14.2237 17 14.4998Z' stroke='%232d2524' stroke-opacity='0.6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      background-size: 14px;
    }
  }
}

.dark {
  .q-payment-apparoch-item {
    &.disabled {
      .approach-desc {
        color: var(--q-c-light-3);
      }
    }

    .approach-icons {
      .icon-wallet {
        background-color: var(--q-c-light-5);
        border-color: var(--q-c-light-4);
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M16 7.99983V4.50048C16 3.66874 16 3.25287 15.8248 2.9973C15.6717 2.77401 15.4346 2.62232 15.1678 2.57691C14.8623 2.52493 14.4847 2.6992 13.7295 3.04775L4.85901 7.14182C4.18551 7.45267 3.84875 7.6081 3.60211 7.84915C3.38406 8.06225 3.21762 8.32238 3.1155 8.60966C3 8.93462 3 9.30551 3 10.0473V14.9998M16.5 14.4998H16.51M3 11.1998L3 17.7998C3 18.9199 3 19.48 3.21799 19.9078C3.40973 20.2841 3.71569 20.5901 4.09202 20.7818C4.51984 20.9998 5.07989 20.9998 6.2 20.9998H17.8C18.9201 20.9998 19.4802 20.9998 19.908 20.7818C20.2843 20.5901 20.5903 20.2841 20.782 19.9078C21 19.48 21 18.9199 21 17.7998V11.1998C21 10.0797 21 9.51967 20.782 9.09185C20.5903 8.71552 20.2843 8.40956 19.908 8.21782C19.4802 7.99983 18.9201 7.99983 17.8 7.99983L6.2 7.99983C5.0799 7.99983 4.51984 7.99983 4.09202 8.21781C3.7157 8.40956 3.40973 8.71552 3.21799 9.09185C3 9.51967 3 10.0797 3 11.1998ZM17 14.4998C17 14.776 16.7761 14.9998 16.5 14.9998C16.2239 14.9998 16 14.776 16 14.4998C16 14.2237 16.2239 13.9998 16.5 13.9998C16.7761 13.9998 17 14.2237 17 14.4998Z' stroke='%23fafafa' stroke-opacity='0.7' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      }
    }
  }
}
</style>
