<script setup lang="ts">
import ComponentShowcase from "./components/ComponentShowcase.vue";
import SecTypeface from "./home/typeface.vue";
import SecFrameAndDivider from "./home/frame.vue";
import SecPremiumDecoration from "./home/premium.vue";
import SecButton from "./home/button.vue";
import SecInput from "./home/input.vue";
import SecTextarea from "./home/textarea.vue";
import SecForm from "./home/form.vue";
import SecInputWithButton from "./home/input-with-btn.vue";
import SecFence from "./home/fence.vue";
import SecProgress from "./home/progress.vue";
import SecSwitch from "./home/switch.vue";
import SecMenu from "./home/menu.vue";
import SecSelector from "./home/selector.vue";
import SecDialog from "./home/dialog.vue";
import SecDatetimePicker from "./home/datetime.vue";
import SecPagination from "./home/pagination.vue";
import SecTab from "./home/tab.vue";
import SecCover from "./home/cover.vue";
import SecAvatar from "./home/avatar.vue";
import SecShare from "./home/share.vue";
import SecPayment from "./home/payment.vue";
import SecIcon from "./home/icon.vue";

const sourceCodes = {
  button: `<QButton class="outlined">Outlined</QButton>
<QButton class="primary">Primary</QButton>
<QButton class="highlight">Highlight</QButton>
<QButton class="plain">Plain</QButton>
<QButton class="danger">Danger</QButton>
<QButton class="stripe">Stripe</QButton>

<!-- Sizes -->
<QButton class="outlined">Normal</QButton>
<QButton class="sm outlined">Small</QButton>
<QButton class="xs outlined">XS</QButton>
<QButton class="xxs outlined">XXS</QButton>

<!-- Icon Button -->
<QButton class="icon primary">
  <QIconPlus class="icon" />
</QButton>

<!-- With Keyboard Shortcut -->
<QButton class="primary" shortcut="Cmd+S">Save</QButton>`,

  input: `<QInput v-model="value" placeholder="Enter text..." />

<!-- With Hint -->
<QInput v-model="value" hint-text="This is a hint" />

<!-- With Error -->
<QInput v-model="value" error="This field is required" />

<!-- With Max Length -->
<QInput v-model="value" :max-length="100" />

<!-- Disabled -->
<QInput v-model="value" disabled />`,

  switch: `<QSwitch v-model="checked" />

<!-- Themes -->
<QSwitch v-model="checked" theme="clear-sky" />
<QSwitch v-model="checked" theme="plastic" />`,

  dialog: `<QDialog v-model="visible" title="Dialog Title">
  <p>Dialog content goes here.</p>
</QDialog>

<QMessageDialog
  v-model="visible"
  title="Confirm"
  message="Are you sure?"
  :actions="[
    { label: 'Cancel', class: 'outlined' },
    { label: 'OK', class: 'primary' }
  ]"
/>`,

  tabs: `<QTabs v-model="selectedTab" :tabs="tabs" />

<!-- Plain Variant -->
<QTabs v-model="selectedTab" :tabs="tabs" variant="plain" />

<!-- With Icons -->
const tabs = [
  { id: 'home', title: 'Home', icon: QIconHome },
  { id: 'settings', title: 'Settings', icon: QIconSettings }
]`,

  progress: `<QProgress :percentage="50" />

<!-- Colors -->
<QProgress :percentage="75" color="green" />
<QProgress :percentage="25" color="orange" />
<QProgress :percentage="100" color="red" />

<!-- Infinite -->
<QProgress infinite />`,

  avatar: `<QAvatar src="https://..." :size="48" />

<!-- Variants -->
<QAvatar src="..." variant="circle" />
<QAvatar src="..." variant="rounded" />
<QAvatar src="..." variant="square" />`,
};
</script>

<template>
  <div class="home-page">
    <!-- Typography & Decoration -->
    <section class="category-group">
      <h1 class="category-title q-text-h1">Typography & Decoration</h1>

      <ComponentShowcase
        id="typeface"
        title="Typeface"
        description="Typography styles and font variations"
      >
        <SecTypeface />
      </ComponentShowcase>

      <ComponentShowcase
        id="frame"
        title="Frame & Divider"
        description="Container frames and visual dividers"
      >
        <SecFrameAndDivider />
      </ComponentShowcase>

      <ComponentShowcase
        id="premium"
        title="Premium Decoration"
        description="Premium styling and decorations"
      >
        <SecPremiumDecoration />
      </ComponentShowcase>
    </section>

    <!-- Buttons -->
    <section class="category-group">
      <h1 class="category-title q-text-h1">Buttons</h1>

      <ComponentShowcase
        id="button"
        title="Button"
        description="Various button styles, sizes, states, and keyboard shortcuts"
        :source-code="sourceCodes.button"
      >
        <SecButton />
      </ComponentShowcase>
    </section>

    <!-- Form Inputs -->
    <section class="category-group">
      <h1 class="category-title q-text-h1">Form Inputs</h1>

      <ComponentShowcase
        id="input"
        title="Input"
        description="Text input with validation, hints, and character counter"
        :source-code="sourceCodes.input"
      >
        <SecInput />
      </ComponentShowcase>

      <ComponentShowcase
        id="textarea"
        title="Textarea"
        description="Multi-line text input"
      >
        <SecTextarea />
      </ComponentShowcase>

      <ComponentShowcase
        id="form"
        title="Form"
        description="Form layout patterns and field organization"
      >
        <SecForm />
      </ComponentShowcase>

      <ComponentShowcase
        id="input-with-btn"
        title="Input with Button"
        description="Combined input field with action button"
      >
        <SecInputWithButton />
      </ComponentShowcase>
    </section>

    <!-- Selection -->
    <section class="category-group">
      <h1 class="category-title q-text-h1">Selection</h1>

      <ComponentShowcase
        id="switch"
        title="Switch"
        description="Toggle switches with multiple themes"
        :source-code="sourceCodes.switch"
      >
        <SecSwitch />
      </ComponentShowcase>

      <ComponentShowcase
        id="selector"
        title="Selector"
        description="Language and currency selectors"
      >
        <SecSelector />
      </ComponentShowcase>

      <ComponentShowcase
        id="menu"
        title="Menu"
        description="Dropdown menus with icons, dividers, and keyboard navigation"
      >
        <SecMenu />
      </ComponentShowcase>
    </section>

    <!-- Feedback -->
    <section class="category-group">
      <h1 class="category-title q-text-h1">Feedback</h1>

      <ComponentShowcase
        id="progress"
        title="Progress"
        description="Progress bars with colors and infinite mode"
        :source-code="sourceCodes.progress"
      >
        <SecProgress />
      </ComponentShowcase>

      <ComponentShowcase
        id="dialog"
        title="Dialog"
        description="Modal dialogs and message dialogs"
        :source-code="sourceCodes.dialog"
      >
        <SecDialog />
      </ComponentShowcase>

      <ComponentShowcase
        id="fence"
        title="Fence"
        description="Code fence and content blocks"
      >
        <SecFence />
      </ComponentShowcase>
    </section>

    <!-- Navigation -->
    <section class="category-group">
      <h1 class="category-title q-text-h1">Navigation</h1>

      <ComponentShowcase
        id="pagination"
        title="Pagination"
        description="Page navigation controls"
      >
        <SecPagination />
      </ComponentShowcase>

      <ComponentShowcase
        id="tab"
        title="Tabs"
        description="Tab navigation with variants and icons"
        :source-code="sourceCodes.tabs"
      >
        <SecTab />
      </ComponentShowcase>
    </section>

    <!-- Data Display -->
    <section class="category-group">
      <h1 class="category-title q-text-h1">Data Display</h1>

      <ComponentShowcase
        id="datetime"
        title="Datetime Picker"
        description="Date and time selection component"
      >
        <SecDatetimePicker />
      </ComponentShowcase>

      <ComponentShowcase
        id="cover"
        title="Cover"
        description="Cover image and card components"
      >
        <SecCover />
      </ComponentShowcase>

      <ComponentShowcase
        id="avatar"
        title="Avatar"
        description="User avatars with various sizes and variants"
        :source-code="sourceCodes.avatar"
      >
        <SecAvatar />
      </ComponentShowcase>

      <ComponentShowcase
        id="share"
        title="Share"
        description="Social sharing functionality"
      >
        <SecShare />
      </ComponentShowcase>

      <ComponentShowcase
        id="payment"
        title="Payment"
        description="Payment method selection"
      >
        <SecPayment />
      </ComponentShowcase>

      <ComponentShowcase
        id="icon"
        title="Icons"
        description="Icon gallery with copy-to-clipboard"
      >
        <SecIcon />
      </ComponentShowcase>
    </section>
  </div>
</template>

<style lang="scss" scoped>

.category-group {
  margin-bottom: 2.5rem;
}

.category-title {
  padding-bottom: 0.625rem;
  border-bottom: 2px solid var(--q-c-red);
  margin-bottom: 1.25rem;
  font-weight: 600;
}

:global(.dark) .category-title {
  border-bottom-color: var(--q-c-red-light);
}
</style>
