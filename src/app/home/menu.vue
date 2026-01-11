<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">Menu, DropdownMenu & DropdownMenuWithTextField</h2>

    <div class="demo-groups">
      <!-- QMenu -->
      <div class="demo-group">
        <div class="group-label q-text-caption q-c-dark-3">QMenu</div>
        <div class="menu-grid">
          <div class="menu-wrapper">
            <div class="q-text-caption q-c-dark-3 mb-2">Normal</div>
            <QMenu :items="menuItems" persistent/>
          </div>
          <div class="menu-wrapper">
            <div class="q-text-caption q-c-dark-3 mb-2">No Frame</div>
            <QMenu :items="menuItems" no-frame persistent/>
          </div>
          <div class="menu-wrapper">
            <div class="q-text-caption q-c-dark-3 mb-2">No Frame & Shadow</div>
            <QMenu :items="menuItems" no-frame no-shadow persistent/>
          </div>
        </div>
      </div>

      <!-- Dropdown Menu Basic -->
      <div class="demo-group">
        <div class="group-label q-text-caption q-c-dark-3">Dropdown Menu</div>
        <div class="flow">
          <div>
            <div class="q-text-caption q-c-dark-3 mb-2">Normal</div>
            <QDropdownMenu
              :items="menuItems"
              :initial-item="selectedMenuItem"
              @change="dropdownMenuSelectionChanged"
            />
          </div>
          <div>
            <div class="q-text-caption q-c-dark-3 mb-2">Disabled</div>
            <QDropdownMenu
              :items="menuItems"
              disabled
              :initial-item="selectedMenuItem"
              @change="dropdownMenuSelectionChanged"
            />
          </div>
          <div>
            <div class="q-text-caption q-c-dark-3 mb-2">Hide Selected</div>
            <QDropdownMenu
              :items="menuItems"
              :initial-item="selectedMenuItem"
              hide-selected
              @change="dropdownMenuSelectionChanged"
            />
          </div>
          <div>
            <div class="q-text-caption q-c-dark-3 mb-2">Custom Content</div>
            <QDropdownMenu
              :items="menuItems"
              :initial-item="selectedMenuItem"
              @change="dropdownMenuSelectionChanged"
            >
              <div class="">Custom content</div>
            </QDropdownMenu>
          </div>
        </div>
      </div>

      <!-- Dropdown Menu Variants -->
      <div class="demo-group">
        <div class="group-label q-text-caption q-c-dark-3">Dropdown Menu Variants</div>
        <div class="flow">
          <div>
            <div class="q-text-caption q-c-dark-3 mb-2">Plain</div>
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
            <div class="q-text-caption q-c-dark-3 mb-2">Hide Action Label</div>
            <QDropdownMenu
              :items="menuItems"
              :initial-item="selectedMenuItem"
              variant="plain"
              hide-action-label
              @change="dropdownMenuSelectionChanged"
            ></QDropdownMenu>
          </div>
          <div>
            <div class="q-text-caption q-c-dark-3 mb-2">Loading (SM)</div>
            <QDropdownMenu
              class="sm"
              :loading="true"
              :items="menuItems"
              :initial-item="selectedMenuItem"
              @change="dropdownMenuSelectionChanged"
            />
          </div>
          <div>
            <div class="q-text-caption q-c-dark-3 mb-2">Small</div>
            <QDropdownMenu
              class="sm"
              :items="menuItems"
              :initial-item="selectedMenuItem"
              @change="dropdownMenuSelectionChanged"
            />
          </div>
          <div>
            <div class="q-text-caption q-c-dark-3 mb-2">XS</div>
            <QDropdownMenu
              class="xs"
              :items="menuItems"
              :initial-item="selectedMenuItem"
              @change="dropdownMenuSelectionChanged"
            />
          </div>
        </div>
      </div>

      <!-- Dropdown Menu with Dialog -->
      <div class="demo-group">
        <div class="group-label q-text-caption q-c-dark-3">Dropdown Menu with Dialog</div>
        <div class="flow">
          <div>
            <div class="q-text-caption q-c-dark-3 mb-2">Use Dialog</div>
            <QDropdownMenu
              :items="menuItems"
              :initial-item="selectedMenuItem"
              use-dialog="always"
              @change="dropdownMenuSelectionChanged"
            />
          </div>
          <div>
            <div class="q-text-caption q-c-dark-3 mb-2">With Filter</div>
            <QDropdownMenu
              :items="menuItems"
              :initial-item="selectedMenuItem"
              use-dialog="always"
              use-filter
              @change="dropdownMenuSelectionChanged"
            />
          </div>
          <div>
            <div class="q-text-caption q-c-dark-3 mb-2">With Scroll Area</div>
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

      <!-- Dropdown Menu with TextField -->
      <div class="demo-group">
        <div class="group-label q-text-caption q-c-dark-3">Dropdown Menu with TextField</div>
        <div class="flow">
          <div>
            <div class="q-text-caption q-c-dark-3 mb-2">Normal</div>
            <QDropdownMenuWithTextField :default-selection="currencies[0]" default-text="1.234" :items="currencies" @change="currencySelected"/>
          </div>
          <div>
            <div class="q-text-caption q-c-dark-3 mb-2">With Fill Action</div>
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

<style scoped lang="scss">
.demo-groups {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.demo-group {
  .group-label {
    margin-bottom: 0.5rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

.menu-wrapper {
  width: 100%;
  max-width: 300px;
  height: 400px;
}
</style>
