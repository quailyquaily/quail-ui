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
import SecSkeleton from "./home/skeleton.vue";
import SecTooltip from "./home/tooltip.vue";
import SecToast from "./home/toast.vue";
import SecBadge from "./home/badge.vue";
import SecCollapse from "./home/collapse.vue";
import SecDrawer from "./home/drawer.vue";

const sourceCodes = {
  typeface: `<!-- Headings -->
<h1 class="q-text-h1">Heading 1</h1>
<h2 class="q-text-h2">Heading 2</h2>
<h3 class="q-text-h3">Heading 3</h3>

<!-- Body Text -->
<p class="q-text-body-title">Body Title</p>
<p class="q-text-body-text">Body Text</p>
<p class="q-text-desc">Description</p>
<span class="q-text-caption">Caption</span>`,

  frame: `<!-- Frame -->
<div class="frame">
  Content inside a frame
</div>

<!-- Divider -->
<div class="divider"></div>`,

  premium: `<!-- Premium Badge -->
<span class="premium-badge">Premium</span>

<!-- Premium Frame -->
<div class="premium-frame">
  Premium content
</div>`,

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

  textarea: `<QTextarea v-model="value" placeholder="Enter text..." />

<!-- With Rows -->
<QTextarea v-model="value" :rows="5" />

<!-- With Max Length -->
<QTextarea v-model="value" :max-length="500" />

<!-- Disabled -->
<QTextarea v-model="value" disabled />`,

  form: `<QFormItem label="Username" required>
  <QInput v-model="username" />
</QFormItem>

<QFormItem label="Email" hint="We'll never share your email">
  <QInput v-model="email" type="email" />
</QFormItem>

<QFormItem label="Password" error="Password is required">
  <QInput v-model="password" type="password" />
</QFormItem>`,

  inputWithBtn: `<QInputWithButton
  v-model="value"
  placeholder="Enter email..."
  button-text="Subscribe"
  @submit="handleSubmit"
/>

<!-- Loading State -->
<QInputWithButton
  v-model="value"
  button-text="Submit"
  :loading="true"
/>`,

  switch: `<QSwitch v-model="checked" />

<!-- Themes -->
<QSwitch v-model="checked" theme="clear-sky" />
<QSwitch v-model="checked" theme="plastic" />`,

  selector: `<!-- Language Selector -->
<QLanguageSelector v-model="lang" :languages="languages" />

<!-- Currency Selector -->
<QCurrencySelector v-model="currency" :currencies="currencies" />`,

  menu: `<QDropdownMenu :items="menuItems">
  <QButton class="outlined">Open Menu</QButton>
</QDropdownMenu>

const menuItems = [
  { label: 'Edit', icon: QIconEdit },
  { label: 'Delete', icon: QIconTrash, class: 'danger' },
  { divider: true },
  { label: 'Settings', icon: QIconSettings }
]`,

  progress: `<QProgress :percentage="50" />

<!-- Colors -->
<QProgress :percentage="75" color="green" />
<QProgress :percentage="25" color="orange" />
<QProgress :percentage="100" color="red" />

<!-- Infinite -->
<QProgress infinite />`,

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

  fence: `<QFence title="Code Block">
  <pre><code>const greeting = "Hello World";</code></pre>
</QFence>

<!-- With Language Tag -->
<QFence title="JavaScript" language="js">
  <pre><code>function hello() {
  console.log("Hello!");
}</code></pre>
</QFence>`,

  pagination: `<QPagination
  v-model="currentPage"
  :total="100"
  :page-size="10"
/>

<!-- With Page Size Selector -->
<QPagination
  v-model="currentPage"
  :total="100"
  :page-size="pageSize"
  show-size-changer
/>`,

  tabs: `<QTabs v-model="selectedTab" :tabs="tabs" />

<!-- Plain Variant -->
<QTabs v-model="selectedTab" :tabs="tabs" variant="plain" />

<!-- With Icons -->
const tabs = [
  { id: 'home', title: 'Home', icon: QIconHome },
  { id: 'settings', title: 'Settings', icon: QIconSettings }
]`,

  datetime: `<QDatetimePicker v-model="date" />

<!-- Date Only -->
<QDatetimePicker v-model="date" type="date" />

<!-- Time Only -->
<QDatetimePicker v-model="time" type="time" />

<!-- With Range -->
<QDatetimePicker v-model="dateRange" range />`,

  cover: `<QCover
  :src="imageUrl"
  :width="300"
  :height="200"
/>

<!-- With Fallback -->
<QCover
  :src="imageUrl"
  :fallback="fallbackUrl"
/>

<!-- Rounded -->
<QCover :src="imageUrl" rounded />`,

  avatar: `<QAvatar src="https://..." :size="48" />

<!-- Variants -->
<QAvatar src="..." variant="circle" />
<QAvatar src="..." variant="rounded" />
<QAvatar src="..." variant="square" />`,

  share: `<QShare
  :platforms="['twitter', 'facebook', 'linkedin']"
  :url="shareUrl"
  :title="shareTitle"
/>`,

  payment: `<QPaymentMethods
  v-model="selectedMethod"
  :methods="['card', 'paypal', 'crypto']"
/>`,

  icon: `<!-- Basic Usage -->
<QIconHome class="icon" />
<QIconSettings class="icon" />
<QIconUser class="icon" />

<!-- With Size -->
<QIconHome style="width: 24px; height: 24px;" />

<!-- Colored Icons -->
<QIconColorTwitter />
<QIconColorGithub />`,

  skeleton: `<!-- Variants -->
<QSkeleton variant="text" />
<QSkeleton variant="avatar" />
<QSkeleton variant="button" />
<QSkeleton variant="image" />
<QSkeleton variant="card" />

<!-- Animation -->
<QSkeleton animation="wave" />
<QSkeleton animation="pulse" />

<!-- Multiple lines -->
<QSkeleton variant="text" :count="3" />

<!-- Custom size -->
<QSkeleton width="200px" height="20px" />`,

  tooltip: `<QTooltip content="Tooltip text">
  <QButton>Hover me</QButton>
</QTooltip>

<!-- Positions -->
<QTooltip content="Top" position="top" />
<QTooltip content="Bottom" position="bottom" />
<QTooltip content="Left" position="left" />
<QTooltip content="Right" position="right" />

<!-- Triggers -->
<QTooltip trigger="hover" />
<QTooltip trigger="click" />
<QTooltip trigger="focus" />

<!-- Custom content -->
<QTooltip>
  <template #content>
    <strong>Rich content</strong>
  </template>
  <QButton>Custom</QButton>
</QTooltip>`,

  toast: `// Programmatic usage
import { useToast } from 'quail-ui';

const toast = useToast();

toast.success('Success message');
toast.error('Error message');
toast.warning('Warning message');
toast.info('Info message');

// With options
toast.show({
  type: 'info',
  message: 'Custom toast',
  duration: 5000,
  closable: true,
});

// Declarative usage
<QToast
  v-model="visible"
  type="success"
  message="Toast message"
/>`,

  badge: `<!-- Types -->
<QBadge type="default">Default</QBadge>
<QBadge type="primary">Primary</QBadge>
<QBadge type="success">Success</QBadge>
<QBadge type="warning">Warning</QBadge>
<QBadge type="danger">Danger</QBadge>

<!-- Variants -->
<QBadge variant="filled">Filled</QBadge>
<QBadge variant="outlined">Outlined</QBadge>
<QBadge variant="light">Light</QBadge>

<!-- Closable -->
<QBadge closable @close="handleClose">Tag</QBadge>

<!-- Dot -->
<QBadge type="danger" dot />`,

  collapse: `<QCollapse v-model="activeKeys">
  <QCollapseItem name="1" title="Section 1">
    Content 1
  </QCollapseItem>
  <QCollapseItem name="2" title="Section 2">
    Content 2
  </QCollapseItem>
</QCollapse>

<!-- Accordion mode -->
<QCollapse accordion>
  ...
</QCollapse>`,

  drawer: `<QDrawer v-model="visible" title="Drawer">
  Content here
</QDrawer>

<!-- Placement -->
<QDrawer placement="left" />
<QDrawer placement="right" />
<QDrawer placement="top" />
<QDrawer placement="bottom" />

<!-- With footer -->
<QDrawer v-model="visible">
  <template #footer>
    <QButton>Save</QButton>
  </template>
</QDrawer>`,
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
        :source-code="sourceCodes.typeface"
      >
        <SecTypeface />
      </ComponentShowcase>

      <ComponentShowcase
        id="frame"
        title="Frame & Divider"
        description="Container frames and visual dividers"
        :source-code="sourceCodes.frame"
      >
        <SecFrameAndDivider />
      </ComponentShowcase>

      <ComponentShowcase
        id="premium"
        title="Premium Decoration"
        description="Premium styling and decorations"
        :source-code="sourceCodes.premium"
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
        :source-code="sourceCodes.textarea"
      >
        <SecTextarea />
      </ComponentShowcase>

      <ComponentShowcase
        id="form"
        title="Form"
        description="Form layout patterns and field organization"
        :source-code="sourceCodes.form"
      >
        <SecForm />
      </ComponentShowcase>

      <ComponentShowcase
        id="input-with-btn"
        title="Input with Button"
        description="Combined input field with action button"
        :source-code="sourceCodes.inputWithBtn"
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
        :source-code="sourceCodes.selector"
      >
        <SecSelector />
      </ComponentShowcase>

      <ComponentShowcase
        id="menu"
        title="Menu"
        description="Dropdown menus with icons, dividers, and keyboard navigation"
        :source-code="sourceCodes.menu"
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
        :source-code="sourceCodes.fence"
      >
        <SecFence />
      </ComponentShowcase>

      <ComponentShowcase
        id="toast"
        title="Toast"
        description="Toast notifications for user feedback"
        :source-code="sourceCodes.toast"
      >
        <SecToast />
      </ComponentShowcase>

      <ComponentShowcase
        id="tooltip"
        title="Tooltip"
        description="Contextual tooltips on hover, click, or focus"
        :source-code="sourceCodes.tooltip"
      >
        <SecTooltip />
      </ComponentShowcase>

      <ComponentShowcase
        id="skeleton"
        title="Skeleton"
        description="Loading placeholder with animation"
        :source-code="sourceCodes.skeleton"
      >
        <SecSkeleton />
      </ComponentShowcase>

      <ComponentShowcase
        id="badge"
        title="Badge"
        description="Status labels and tags"
        :source-code="sourceCodes.badge"
      >
        <SecBadge />
      </ComponentShowcase>

      <ComponentShowcase
        id="collapse"
        title="Collapse"
        description="Collapsible content panels"
        :source-code="sourceCodes.collapse"
      >
        <SecCollapse />
      </ComponentShowcase>

      <ComponentShowcase
        id="drawer"
        title="Drawer"
        description="Slide-in panel from screen edge"
        :source-code="sourceCodes.drawer"
      >
        <SecDrawer />
      </ComponentShowcase>
    </section>

    <!-- Navigation -->
    <section class="category-group">
      <h1 class="category-title q-text-h1">Navigation</h1>

      <ComponentShowcase
        id="pagination"
        title="Pagination"
        description="Page navigation controls"
        :source-code="sourceCodes.pagination"
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
        :source-code="sourceCodes.datetime"
      >
        <SecDatetimePicker />
      </ComponentShowcase>

      <ComponentShowcase
        id="cover"
        title="Cover"
        description="Cover image and card components"
        :source-code="sourceCodes.cover"
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
        :source-code="sourceCodes.share"
      >
        <SecShare />
      </ComponentShowcase>

      <ComponentShowcase
        id="payment"
        title="Payment"
        description="Payment method selection"
        :source-code="sourceCodes.payment"
      >
        <SecPayment />
      </ComponentShowcase>

      <ComponentShowcase
        id="icon"
        title="Icons"
        description="Icon gallery with copy-to-clipboard"
        :source-code="sourceCodes.icon"
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
  color: var(--q-c-light);
}
</style>
