<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">Menu, DropdownMenu & DropdownMenuWithTextField</h2>
    <div class="grid gap-4 grid-cols-3">
      <div class="menu-wrapper" style="width: 300px; height: 400px;">
        <div class="q-text-caption q-c-dark-3 mb-2">Normal</div>
        <QMenu :items="menuItems" persistent/>
      </div>
      <div class="menu-wrapper" style="width: 300px; height: 400px;">
        <div class="q-text-caption q-c-dark-3 mb-2">without frame</div>
        <QMenu :items="menuItems" no-frame persistent/>
      </div>
      <div class="menu-wrapper" style="width: 300px; height: 400px;">
        <div class="q-text-caption q-c-dark-3 mb-2">without frame & shadow</div>
        <QMenu :items="menuItems" no-frame no-shadow persistent/>
      </div>
    </div>
    <div class="grid gap-4 grid-cols-5 mb-8">
      <div>
        <div class="q-text-caption q-c-dark-3 mb-2">normal</div>
        <QDropdownMenu
          :items="menuItems"
          :initial-item="selectedMenuItem"
          @change="dropdownMenuSelectionChanged"
        />
      </div>
      <div>
        <div class="q-text-caption q-c-dark-3 mb-2">disabled</div>
        <QDropdownMenu
          :items="menuItems"
          disabled
          :initial-item="selectedMenuItem"
          @change="dropdownMenuSelectionChanged"
        />
      </div>
      <div>
        <div class="q-text-caption q-c-dark-3 mb-2">hide selected item</div>
        <QDropdownMenu
          :items="menuItems"
          :initial-item="selectedMenuItem"
          hide-selected
          @change="dropdownMenuSelectionChanged"
        />
      </div>
      <div>
        <div class="q-text-caption q-c-dark-3 mb-2">custom content</div>
        <QDropdownMenu
          :items="menuItems"
          :initial-item="selectedMenuItem"
          @change="dropdownMenuSelectionChanged"
        >
          <div class="">Custom content</div>
        </QDropdownMenu>
      </div>
    </div>
    <div class="grid gap-4 grid-cols-5 mb-8">
      <div>
        <div class="q-text-caption q-c-dark-3 mb-2">custom content (plain)</div>
        <QDropdownMenu
          :items="menuItems"
          :initial-item="selectedMenuItem"
          variant="plain"
          @change="dropdownMenuSelectionChanged"
        >
          <div class="">Custom content</div>
        </QDropdownMenu>
      </div>
      <div>
        <div class="q-text-caption q-c-dark-3 mb-2">hide action label (plain)</div>
        <QDropdownMenu
          :items="menuItems"
          :initial-item="selectedMenuItem"
          variant="plain"
          hide-action-label
          @change="dropdownMenuSelectionChanged"
        ></QDropdownMenu>
      </div>
      <div>
        <div class="q-text-caption q-c-dark-3 mb-2">loading and small size</div>
        <QDropdownMenu
          class="sm"
          :loading="true"
          :items="menuItems"
          :initial-item="selectedMenuItem"
          @change="dropdownMenuSelectionChanged"
        />
      </div>
      <div>
      <div class="q-text-caption q-c-dark-3 mb-2">smaller size</div>
        <QDropdownMenu
          class="xs"
          :items="menuItems"
          :initial-item="selectedMenuItem"
          @change="dropdownMenuSelectionChanged"
        />
      </div>
    </div>
    <div class="mb-8">
      <div class="grid gap-4 grid-cols-5">
        <div>
          <div class="q-text-caption q-c-dark-3 mb-2">use dialog</div>
          <QDropdownMenu
            :items="menuItems"
            :initial-item="selectedMenuItem"
            use-dialog="always"
            @change="dropdownMenuSelectionChanged"
          />
        </div>
        <div>
          <div class="q-text-caption q-c-dark-3 mb-2">use dialog with a filter</div>
          <QDropdownMenu
            :items="menuItems"
            :initial-item="selectedMenuItem"
            use-dialog="always"
            use-filter
            @change="dropdownMenuSelectionChanged"
          />
        </div>
        <div>
          <div class="q-text-caption q-c-dark-3 mb-2">use dialog with a filter and a scroll area</div>
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
    </div>
    <div class="grid gap-4 grid-cols-4">
      <div>
        <div class="q-text-caption q-c-dark-3 mb-2">normal</div>
        <QDropdownMenuWithTextField :default-selection="currencies[0]" default-text="1.234" :items="currencies" @change="currencySelected"/>
      </div>
      <div>
        <div class="q-text-caption q-c-dark-3 mb-2">with fill-action and hint-text</div>
        <QDropdownMenuWithTextField :default-selection="currencies[0]" default-text="1.234"
          :items="currencies" @change="currencySelected"
          fill-action-label='Bal: 100' fill-action-value="100" hint-text="$100000"
        />
      </div>
      <div v-if="selectedCurrencyResult" class="frame p-4 q-text-desc">
        You selected: {{ selectedCurrencyResult.selected?.title }} - {{ selectedCurrencyResult.text }}
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

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

const selectedCurrencyResult:any = ref(null);

const selectedMenuItem = ref(menuItems.value[0]);

function dropdownMenuSelectionChanged(item: any) {
  console.log("Dropdown menu selection changed", item);
}

function currencySelected(item: any) {
  console.log("Currency selected", item.selected.title, item.text);
  selectedCurrencyResult.value = { selected: item.selected, text: item.text };
}
</script>