<script setup lang="ts">
import { computed, ref, watch } from "vue";
import * as icons from "./components/icons";
import QButton from "./components/common/QButton.vue";
import QMessageDialog from "./components/common/QMessageDialog.vue";

import SecTypeface from "./app/typeface.vue"
import SecFrameAndDivider from "./app/frame.vue"
import SecPremiumDecoration from "./app/premium.vue"
import SecButton from "./app/button.vue"
import SecInput from "./app/input.vue"
import SecTextarea from "./app/textarea.vue"
import SecForm from "./app/form.vue"
import SecInputWithButton from "./app/input-with-btn.vue"
import SecFence from "./app/fence.vue"
import SecProgress from "./app/progress.vue"
import SecSwitch from "./app/switch.vue"
import SecMenu from "./app/menu.vue"
import SecSelector from "./app/selector.vue"
import SecDialog from "./app/dialog.vue"

const switchTheme = ref(true);

const switchValue3 = ref(false);
const switchValue4 = ref(false);

const datetimeValue = ref("2023-10-23");

const inputValue = ref("");

const currentPage = ref(1);

const tabs = computed(() => [
  { id: "tab1", title: "Tab 1", icon: "QIconSun" },
  { id: "tab2", icon: "QIconMagicWand" },
  { id: "tab3", title: "Tab 3" },
]);

const searchItems = computed(() => {
  const source = [
    "Apple", "Banana", "Cherry", "Donut", "Apple Pie", "Banana Split",
  ];
  const ret = source.map((item) => {
    return {
      title: item,
      subtitle: `This is a ${item}`,
      action: () => {
        console.log("search item selected", item);
      },
    };
  });
  return ret.filter((item) => item.title.toLowerCase().includes(inputValue.value.toLowerCase()));
})

const selectedTab = ref(tabs.value[0]);

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

watch(() => switchTheme.value, (val) => {
  if (val) {
    document.body.classList.remove("dark");
  } else {
    document.body.classList.add("dark");
  }
})

function selectPaymentApproachItem(item: any) {
  console.log("selectPaymentApproachItem", item);
  selectedPaymentApproachItem.value = item;
}

function searchInputKeyup(val:any) {
  console.log("searchInputChanged", val);
}
function selectSearchResult(val:any) {
  console.log("select result ", val);
}
</script>

<template>
  <div class="container" :class="switchTheme ? '' : 'dark'">
    <div class="grid gap-4 grid-cols-2">
      <div class="">
        <h1 class="q-text-display mb-2">Quail UI</h1>
        <div class="q-text-desc">
          👉 <a href="https://github.com/quail-ink/quail-ui" target="_blank" class="q-c-dark-2">Fork at Github</a>
        </div>
      </div>
      <div class="text-right">
        <QSwitch theme="clear-sky" v-model="switchTheme" />
      </div>
    </div>
    <div class="divider focus mt-4"></div>

    <SecTypeface />

    <SecFrameAndDivider />

    <SecPremiumDecoration />

    <SecButton />

    <SecInput />

    <SecTextarea />

    <SecForm />

    <SecInputWithButton />

    <SecFence />

    <SecProgress />

    <SecSwitch />

    <SecMenu />

    <SecSelector />

    <SecDialog />

    <div class="section">
      <h2 class="section-title">Datetime Picker</h2>
      <div class="flow">
        <QDatetimePicker v-model="datetimeValue" />
        <br/>
        <QDatetimePicker v-model="datetimeValue" disabled />
      </div>
      <div class="flow">
        <QDatetimePicker v-model="datetimeValue" accept="date"/>
        <br/>
        <QDatetimePicker v-model="datetimeValue" accept="time" />
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">Pagination</h2>
      <div>
        <QPagination
          v-model="currentPage"
          :total-page="10"
          :has-prev="currentPage > 1"
          :has-next="currentPage < 10"
          @change:prev="() => { currentPage-- }"
          @change:next="() => { currentPage++; console.log(currentPage) }"
          @change:goto="(val: any) => { currentPage = val; console.log(val)}"
        />
        <br />
        <QPagination
          v-model="currentPage"
          :has-prev="currentPage > 1"
          :has-next="currentPage < 10"
          @change:prev="() => { currentPage-- }"
          @change:next="() => { currentPage++; console.log(currentPage) }"
          @change:goto="(val: any) => { currentPage = val; console.log(val)}"
        />
        <br />
        <QButton class="outlined" @click="currentPage = 1">Go to 1</QButton>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">Tabs</h2>
      <div class="flex">
        <div class="">
          <QTabs v-model="selectedTab" :tabs="tabs" />
          <div class="mt-4 frame p-4">
            Selected tab: {{ selectedTab.title }}
          </div>
        </div>
        <QButton class="outlined ml-4" @click="selectedTab = tabs[1]">Select Tab 2</QButton>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">Search</h2>
      <div class="flex">
        <QSearchInput v-model="inputValue" :items="searchItems"
          @keyup="searchInputKeyup" @select="selectSearchResult"/>
      </div>
      <div class="flex">
        inputValue: {{ inputValue }}
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">Cover</h2>
      <div class="grid">
        <div class="frame" style="display: flex;">
          <QPackCover src="https://static.quail.ink/media/jo4uz87q.jpg" />
          <div class="content" style="margin-left: 16px">
            <h3 class="one-line-ellipsis">A Pack Title</h3>
            <div class="two-line-ellipsis">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">Avatar</h2>
      <div class="flow">
        <QAvatar :src="'https://picsum.photos/200'" :size="24" />
        <QAvatar :src="'https://picsum.photos/200'" :size="32" variant="rounded" />
        <QAvatar :src="'https://picsum.photos/200'" :size="48" variant="square"/>
        <QAvatar :src="'https://picsum.photos/200'" :size="64" />
        <QAvatar :src="'https://quail.ink'" :size="96" />
      </div>
      <div class="flow">
        <QAvatar :src="'https://picsum.photos/200'" :size="42" border-type="solid" />
        <QAvatar :src="'https://picsum.photos/200'" :size="42" variant="rounded" border-type="solid" />
        <QAvatar :src="'https://picsum.photos/200'" :size="42" variant="square" border-type="solid" />
        <QAvatar :size="42" border-type="hollow" border-color="#d24662">
          <QIconColorInstagram class="icon" />
        </QAvatar>
        <QAvatar :size="42" border-type="hollow" border-color="#54b5e6">
          <QIconColorTwitter class="icon" />
        </QAvatar>
        <QAvatar :size="42" border-type="solid" >
          <QIconColorTwitter class="icon" />
        </QAvatar>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">Share</h2>
      <div class="p-4">
        <QShare url="https://quail.ink" layout="row" :services="['twitter', 'facebook', 'linkedin','mastodon', 'bluesky', 'hackernews', 'general']"/>
        <br/>
        <QShare url="https://quail.ink" layout="column" />
      </div>
      <div class="p-4" style="background-color: black">
        <QShare url="https://quail.ink" layout="row" :services="['twitter', 'facebook', 'linkedin','mastodon', 'bluesky', 'hackernews', 'general']"/>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">PaymentApproachSelect / PaymentApproachItems</h2>
      <div class="">
        <QPaymentApproachSelect :channels="paymentApproachArray" @select="selectPaymentApproachItem"/>
      </div>
      <div class="mb-4">
        selected: {{ selectedPaymentApproachItem }}
      </div>
      <div class="">
        <QPaymentApproachItem name="stripe_1" :icons="['visa', 'mastercard', 'amex']" :selected="true" symbol="" desc="card" >
          <QSwitch v-model="switchValue3" />
        </QPaymentApproachItem>
        <QPaymentApproachItem name="stripe_2" :icons="['wechat_pay', 'alipay']" :selected="true" symbol="" desc="others" >
          <QSwitch v-model="switchValue4" />
        </QPaymentApproachItem>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">Icons</h2>
      <div class="grid gap-2 grid-cols-2 md-grid-cols-3 lg-grid-cols-5">
        <div v-for="icon in icons" class="icon-wrapper frame">
          <component :is="icon" :data-name="icon.name" class="icon"/>
          <span class="label text-xs ml-2">{{ icon.name }}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<style lang="scss">
body {
  background-color: var(--q-bg-light);
  &.dark {
    background-color: var(--q-bg-dark);
  }
}
</style>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900&display=swap');

.container {
  max-width: 1280px;
  padding: 1rem;
  margin: 0 auto;
  font-family: var(--q-font-sans);
}
.section {
  margin: 2rem 0;
}

.icon-wrapper {
  padding: 1rem 0.5rem !important;
  display: flex;
  align-items: center;
  height: 24px;
  .icon {
    height: 20px;
    width: 20px;
    min-width: 20px;
  }
  .label {
    font-family: monospace;
  }
}
</style>
