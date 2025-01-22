<script setup lang="ts">
import { computed, ref, watch } from "vue";
import * as icons from "./components/icons";
import QButton from "./components/common/QButton.vue";
import QMessageDialog from "./components/common/QMessageDialog.vue";

import SecTypeface from "./app/typeface.vue"
import SecFrameAndDivider from "./app/frame.vue"
import SecPremiumDecoration from "./app/premium.vue"
import SecButton from "./app/button.vue"
import QSwitch from "./components/common/QSwitch.vue";

const switchTheme = ref(true);

const switchValue1 = ref(true);
const switchValue2 = ref(false);
const switchValue3 = ref(false);
const switchValue4 = ref(false);

const datetimeValue = ref("2023-10-23");
const dialogValue1 = ref(false);
const dialogValue2 = ref(false);
const dialogValue3 = ref(false);
const dialogValue4 = ref(false);
const dialogValue5 = ref(false);
const dialogValue6 = ref(false);
const dialogValue7 = ref(false);
const fieldValue = ref("");
const inputValue = ref("");

const menuItems = computed(() => [
  {
    title: "Item 1",
    subtitle: "Item 1: subtitle",
    icon: "QIconSun",
    action: () => {
      console.log("Item 1");
    },
  },
  {
    title: "Item 2 without icon",
    action: () => {
      console.log("Item 2");
    },
  },
  {
    divider: true,
  },
  {
    title: "Item 3 with image",
    image: "https://picsum.photos/200",
    action: () => {
      console.log("Item 3");
    },
  },
  {
    title: "Item 3.1 with image and subtitle",
    subtitle: "Item 3.1: subtitle",
    image: "https://picsum.photos/200",
    action: () => {
      console.log("Item 3");
    },
  },
  {
    title: "Item 4, disabled",
    disabled: true,
    icon: "QIconFileLock",
    action: () => {
      console.log("Item 4");
    },
  },
  {
    title: "Item 5, danger",
    danger: true,
    icon: "QIconLogout",
    action: () => {
      console.log("Item 5");
    },
  },
  {
    title: "Item 6, no icon",
    action: () => {
      console.log("Item 6");
    },
  },
]);

const currentPage = ref(1);

const selectedMenuItem = ref(menuItems.value[0]);

const selectedLang = ref('en');

const selectedCurrency = ref('USD');

const currencies = computed(() => [
  {
    title: "BTC",
    subtitle: "Bitcoin",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
  },
  {
    title: "LTC",
    subtitle: "Litecoin",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/2.png",
  },
]);

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

function onLangSelected(item: any) {
  console.log("Language selected", item);
  selectedLang.value = item.value;
}

function onCurrencySelected(item: any) {
  console.log("Currency selected", item);
  selectedCurrency.value = item.value;
}

function dropdownMenuSelectionChanged(item: any) {
  console.log("Dropdown menu selection changed", item);
}

const selectedCurrencyResult:any = ref(null);
function currencySelected(item: any) {
  console.log("Currency selected", item.selected.title, item.text);
  selectedCurrencyResult.value = { selected: item.selected, text: item.text };
}

function submit(val:any) {
  console.log("submit", val);
}

function openDialog3(ev:any) {
  dialogValue3.value = true;
}

function openDialog4(ev:any) {
  dialogValue4.value = true;
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


    <div class="section">
      <h2 class="section-title">Input</h2>
      <div class="flow">
        <QInput v-model="inputValue" type="text" placeholder="type here!" :disabled="true"/>
        <QInput v-model="inputValue" type="text" placeholder="type here!" />
        <QInput v-model="inputValue" type="text" placeholder="type here!" :error="true" :hint-text="'Some errors!'"/>
        <QInput v-model="inputValue" type="text" placeholder="type here!" :hint-text="'Less than 10 charactors'" :max="10"/>
        <br/>
        <QInput v-model="inputValue" type="text" placeholder="type here!">
          <template #prepend-out>
            <QSwitch class="mr-2" v-model="switchValue1"/>
          </template>
          <template #prepend>
            <QIconSearch class="icon ml-2" />
          </template>
          <template #append>
            <QButton class="outlined xs icon mr-1">
              <QIconSun class="icon" />
            </QButton>
          </template>
          <template #append-out>
            <QButton class="primary icon ml-2">
              <QIconMenu class="icon" />
            </QButton>
          </template>
        </QInput>
      </div>
      <div class="flow">
        <div>inputValue: {{ inputValue }}</div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">Textarea</h2>
      <div class="mb-4">
        <QTextarea v-model="inputValue" placeholder="type here!" />
      </div>
      <div class="mb-4">
        <QTextarea v-model="inputValue" placeholder="type here!" :error='true' :hint-text="'Some errors!'"/>
      </div>
      <div>
        <QTextarea v-model="inputValue" placeholder="type here!" :max="100" :hint-icon="'QIconMarkdown'" :hint-text="'Markdown Enabled.'"/>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">Form</h2>
      <div class="grid">
        <div class="form" style="width: 100%">
          <div class="form-row">
            <div class="form-row-left">
              <label class="form-label">General Setting</label>
              <div class="form-desc">The description about the setting.</div>
            </div>
            <div class="form-row-right">
              <QSwitch v-model="switchValue2" />
            </div>
          </div>
          <div class="form-row column">
            <div class="form-label">Put a text field</div>
            <QInput type="text" placeholder="type here!" />
            <div class="form-hint">
              What you're typing here will be an example
            </div>
          </div>
          <div class="form-row column">
            <div class="form-label">Error</div>
            <div class="form-error">It seems you're typing something wrong</div>
          </div>
          <div class="form-row">
            <QButton class="primary">Save</QButton>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">TextField with button</h2>
      <div class="flow">
        <QTextFieldWithButton v-model="fieldValue" type="text" placeholder="type here!"  action-label="Go!" @submit="submit"/>
        <QTextFieldWithButton v-model="fieldValue" type="text" placeholder="type here!"  default-text="some default text" action-label="Go!" @submit="submit"/>
        <QTextFieldWithButton v-model="fieldValue" type="email" placeholder="your email here!" action-label="Subscribe" @submit="submit"/>
        <QTextFieldWithButton v-model="fieldValue" type="email" layout="horizontal" placeholder="your email here!" action-label="Subscribe" @submit="submit"/>
      </div>
      <div class="flow">
        <div style="background-color: #111; padding: 1rem;">
          <QTextFieldWithButton v-model="fieldValue" type="email" layout="horizontal" glow="matrix" placeholder="your email here!" action-label="Subscribe" @submit="submit"/>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">Fence</h2>
      <div class="flow">
        <QFence text="Some text here to tell you something useful." />
        <QFence text="This will redirect you to an external page" link="https://quail.ink" />
        <QFence text="Some text here to tell you important information." type="warning" />
        <QFence text="Some text here to tell you some words of critical." type="error" />
        <QFence text="Some text here to make you happy." type="success" />
        <QFence text="Use your favorite icon to replace the default one." icon="QIconSun" />
        <QFence text="Super long text here, very blah blah bla, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."/>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">Loading</h2>
      <div class="flow">
        <div class="loading-wrapper" style="padding: 1rem 0">
          <QLoading />
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">Progress</h2>
      <div class="flow">
        <QProgress :value="50" :max="100" />
        <QProgress :value="50" :max="100" color="red" />
        <QProgress :value="50" :max="100" color="green" />
        <QProgress :value="50" :max="100" color="orange" />
        <QProgress :value="100" :max="100" />
        <QProgress :infinite="true" />
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">Switch</h2>
      <div class="flow">
        <QSwitch v-model="switchValue1" />
        <QSwitch v-model="switchValue2" />
        <QSwitch v-model="switchValue2" theme="clear-sky"/>
        <QSwitch v-model="switchValue2" theme="plastic"/>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">Menu</h2>
      <div class="flow">
        <div class="menu-wrapper" style="width: 300px; height: 420px;">
          <strong>Normal</strong>
          <QMenu :items="menuItems" persistent/>
        </div>
        <div class="menu-wrapper" style="width: 300px; height: 420px;">
          <strong>without frame</strong>
          <QMenu :items="menuItems" no-frame persistent/>
        </div>
        <div class="menu-wrapper" style="width: 300px; height: 420px;">
          <strong>without frame & shadow</strong>
          <QMenu :items="menuItems" no-frame no-shadow persistent/>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">Dropdown Menu</h2>
      <div class="flow">
        <QDropdownMenu
          :items="menuItems"
          :initial-item="selectedMenuItem"
          @change="dropdownMenuSelectionChanged"
        />
        <QDropdownMenu
          :items="menuItems"
          :initial-item="selectedMenuItem"
          hide-selected
          @change="dropdownMenuSelectionChanged"
        />
        <QDropdownMenu
          :items="menuItems"
          :initial-item="selectedMenuItem"
          @change="dropdownMenuSelectionChanged"
        >
          <div class="">Custom content</div>
        </QDropdownMenu>
        <QDropdownMenu
          :items="menuItems"
          :initial-item="selectedMenuItem"
          variant="plain"
          @change="dropdownMenuSelectionChanged"
        >
          <div class="">Custom content</div>
        </QDropdownMenu>
        <QDropdownMenu
          :items="menuItems"
          :initial-item="selectedMenuItem"
          variant="plain"
          hide-action-label
          @change="dropdownMenuSelectionChanged"
        ></QDropdownMenu>
        <QDropdownMenu
          class="sm"
          :loading="true"
          :disabled="true"
          :items="menuItems"
          :initial-item="selectedMenuItem"
          @change="dropdownMenuSelectionChanged"
        />
        <QButton class="outlined sm">OK</QButton>
        <QDropdownMenu
          class="xs"
          :items="menuItems"
          :initial-item="selectedMenuItem"
          @change="dropdownMenuSelectionChanged"
        />
        <QButton class="outlined xs">OK</QButton>
      </div>
      <h3 class="mb-2">use dialog</h3>
      <div class="flow">
        <QDropdownMenu
          :items="menuItems"
          :initial-item="selectedMenuItem"
          use-dialog="always"
          @change="dropdownMenuSelectionChanged"
        />
        <QDropdownMenu
          :items="menuItems"
          :initial-item="selectedMenuItem"
          use-dialog="always"
          use-filter
          @change="dropdownMenuSelectionChanged"
        />
        <QDropdownMenu
          :items="menuItems"
          :initial-item="selectedMenuItem"
          use-dialog="always"
          use-filter
          scroll-height="200px"
          @change="dropdownMenuSelectionChanged"
        />
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">Language Selector</h2>
      <div class="flow">
        <QLanguageSelector :lang="'en'" auto @change="onLangSelected"/>
        <div style="margin-top: 0.5rem">
          <QIconArrowRight></QIconArrowRight>
        </div>
        <QLanguageSelector :lang="selectedLang" no-flag :presist="true" @change="onLangSelected"/>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">Currency Selector</h2>
      <div class="flow">
        <QCurrencySelector :currency="'USD'" @change="onCurrencySelected"/>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">Dropdown Menu With Text field</h2>
      <div class="flow">
        <div>
          <QDropdownMenuWithTextField :default-selection="currencies[0]" default-text="1.234" :items="currencies" @change="currencySelected"/>
          <div v-if="selectedCurrencyResult" class="flow">
            You selected: {{ selectedCurrencyResult.selected?.title }} - {{ selectedCurrencyResult.text }}
          </div>
        </div>
        <div>
          <QDropdownMenuWithTextField :default-selection="currencies[0]" default-text="1.234"
            :items="currencies" @change="currencySelected"
            fill-action-label='Bal: 100' fill-action-value="100" hint-text="$100000"
          />
        </div>
      </div>
    </div>

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
      <h2 class="section-title">Dialog</h2>
      <div class="flow">
        <QButton class="outlined" @click="dialogValue1 = true">
          Open Dialog
        </QButton>

        <QButton class="outlined" @click="dialogValue2 = true">
          Open Persistent Dialog
        </QButton>

        <QDialog v-model="dialogValue3" desktop-mode="popup">
          <template #trigger>
            <QButton class="outlined" @click.stop="openDialog3">
              Open Dialog (popup)
            </QButton>
          </template>

          <div class="dialog-body">
            <div class="form-row center">
              <p style="text-align: center">Some text here</p>
            </div>
          </div>
        </QDialog>

        <QDialog v-model="dialogValue4" desktop-mode="popup" no-frame>
          <template #trigger>
              <QButton class="outlined" @click.stop="openDialog4">
              Open Dialog (popup & no-frame)
            </QButton>
          </template>

          <div
            class="dialog-body"
            style="padding: 1rem; position: relative"
          >
            <div class="dialog-body-frame" style="background-color: #fff; border-radius: 8px; padding: 20px; box-shadow: 0 0 20px rgba(0,0,0,0.1);">
              <div class="form-row center">
                <QButton class="primary block">
                  Action
                </QButton>
              </div>
              <div class="form-row center">
                <QButton class="danger block">
                  Action
                </QButton>
              </div>
              <div class="form-row center">
                <QButton class="block" @click="dialogValue4 = false">
                  Cancel
                </QButton>
              </div>
            </div>
          </div>
        </QDialog>

        <QDialog v-model="dialogValue1" title="Hello">
          <div class="dialog-body">
            <div class="form-row center">
              <p style="text-align: center">Some text here</p>
            </div>
          </div>
        </QDialog>

        <QDialog v-model="dialogValue2" title="Hello" :persistent="true">
          <div class="dialog-body">
            <div class="form-row center">
              <p style="text-align: center">You must click close button to close me</p>
            </div>
            <div class="form-row center">
              <QButton class="primary" @click="dialogValue2 = false">
                Close
              </QButton>
            </div>
          </div>
        </QDialog>

      </div>

      <div class="flow">

        <QButton class="outlined" @click="dialogValue5 = true">
          Open Message Dialog
        </QButton>

        <QButton class="outlined" @click="dialogValue6 = true">
          Open Message Dialog (emoji)
        </QButton>

        <QButton class="outlined" @click="dialogValue7 = true">
          Open Message Dialog (warn)
        </QButton>

        <QMessageDialog v-model="dialogValue5"
          icon="QIconSun"
          icon-color="orange"
          title="Hello!"
          text="This is a message dialog."
          :actions="[{label: 'OK', class: 'primary', action: () => { dialogValue5 = false }}]"/>

        <QMessageDialog v-model="dialogValue6"
          icon-emoji="💎"
          icon-color="green"
          title="Treasure!"
          text="You lucky guy, you found a treasure! 🎉  "
          :actions="[{label: 'OK', class: 'primary', action: () => { dialogValue6 = false }}]"/>

        <QMessageDialog v-model="dialogValue7"
          icon="QIconTrash"
          icon-color="red"
          title="Are you sure to delete?"
          text="This is an unrecoverable action, please be careful. Your data [xxx] will be deleted forever, are you really sure?"
          :actions="[
            {label: 'Cancel', class: 'outlined', action: () => { dialogValue7 = false }},
            {label: 'Delete', class: 'primary danger', action: () => { dialogValue7 = false }}
          ]"/>
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
