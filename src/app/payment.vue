<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">PaymentApproachSelect & PaymentApproachItems</h2>
    <div class="grid gap-4 grid-cols-2">
      <div class="">
        <div class="q-text-caption q-c-dark-3 mb-2">QPaymentApproachSelect</div>
        <QPaymentApproachSelect :channels="paymentApproachArray" @select="selectPaymentApproachItem"/>
        <div class="frame p-3 q-text-desc">
          selected: {{ selectedPaymentApproachItem }}
        </div>
      </div>
      <div class="">
        <div class="q-text-caption q-c-dark-3 mb-2">QPaymentApproachItems</div>
        <QPaymentApproachItem name="stripe_1" :icons="['visa', 'mastercard', 'amex']" :selected="true" symbol="" desc="card" >
          <QSwitch v-model="switchValue3" />
        </QPaymentApproachItem>
        <QPaymentApproachItem name="stripe_2" :icons="['wechat_pay', 'alipay']" :selected="true" symbol="" desc="others" >
          <QSwitch v-model="switchValue4" />
        </QPaymentApproachItem>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const switchValue3 = ref(false);

const switchValue4 = ref(false);

const selectedPaymentApproachItem = ref(null);

const paymentApproachArray = computed(() => {
  return [{
    name: "stripe_1",
    icons: ['visa', 'mastercard', 'amex' ],
    selected: true,
    symbol: "JPY",
    desc: "card"
  }, {
    name: "stripe_2",
    icons: ['visa', 'mastercard', 'amex', 'wechat_pay', 'alipay' ],
    symbol: "JPY",
    desc: "all"
  }, {
    name: "stripe_3",
    icons: ['evm' ],
    symbol: "JPY",
    desc: "blockchain",
    disabled: true
  }]
})


function selectPaymentApproachItem(item: any) {
  console.log("selectPaymentApproachItem", item);
  selectedPaymentApproachItem.value = item;
}
</script>