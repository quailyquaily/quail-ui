<script setup lang="ts">
import { useRouter } from "vue-router";
import ComponentShowcase from "./components/ComponentShowcase.vue";
import SecColorScheme from "./home/color-scheme.vue";
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
import SecCard from "./home/card.vue";
import SecShare from "./home/share.vue";
import SecPayment from "./home/payment.vue";
import SecHeightComparison from "./home/height-comparison.vue";
import SecIcon from "./home/icon.vue";
import SecMediaFrame from "./home/media-frame.vue";
import SecSkeleton from "./home/skeleton.vue";
import SecTooltip from "./home/tooltip.vue";
import SecToast from "./home/toast.vue";
import SecBadge from "./home/badge.vue";
import SecCollapse from "./home/collapse.vue";
import SecDrawer from "./home/drawer.vue";

const router = useRouter();

const sourceCodes = {
  colorScheme: `const palette = {
  surfaces: [
    "--q-bg-paper",
    "--q-bg-white",
    "--q-bg-light",
    "--q-bg-light-2",
    "--q-bg-dark",
    "--q-bg-dark-2",
  ],
  ink: [
    "--q-c-dark",
    "--q-c-dark-2",
    "--q-c-dark-3",
    "--q-c-dark-4",
    "--q-c-light",
    "--q-c-secondary",
  ],
  accents: [
    "--q-c-blue",
    "--q-c-orange",
    "--q-c-green",
    "--q-c-red",
    "--q-button-primary-bg",
    "--q-button-highlight-bg",
  ],
};`,

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

<!-- Labeled Divider -->
<QDivider label="Section label" />

<!-- Divider -->
<div class="divider"></div>`,

  premium: `<!-- Premium Badge -->
<span class="premium-badge">Premium</span>

<!-- Premium Frame -->
<div class="premium-frame">
  Premium content
</div>`,

  button: `<!-- Core hierarchy -->
<QButton class="primary">Publish</QButton>
<QButton class="outlined">Preview</QButton>
<QButton class="plain">Skip for now</QButton>
<QButton class="danger">Delete</QButton>

<!-- States -->
<QButton class="primary">Ready</QButton>
<QButton class="primary" loading>Publishing</QButton>
<QButton class="outlined" disabled>Disabled</QButton>

<!-- Sizes -->
<QButton class="outlined">Normal</QButton>
<QButton class="sm outlined">Small</QButton>
<QButton class="xs outlined">XS</QButton>
<QButton class="xxs outlined">XXS</QButton>

<!-- Utility actions -->
<QButton class="icon outlined">
  <QIconSearch class="icon" />
</QButton>
<QButton class="primary" shortcut="Cmd+S">Save draft</QButton>

<!-- Expressive styles -->
<QButton class="highlight">Highlight</QButton>
<QButton class="stripe">Stripe</QButton>
<QButton class="placeholder">Placeholder</QButton>`,

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

  heightComparison: `<div class="height-compare-row">
  <QButton class="outlined">Outlined Button</QButton>
  <QInput v-model="inputValue" placeholder="QInput" />
  <QDropdownMenu :items="dropdownItems" :initial-item="selectedDropdownItem" />
  <QTextFieldWithButton
    v-model="textFieldValue"
    layout="horizontal"
    placeholder="Horizontal TextFieldWithButton"
    action-label="Submit"
  />
</div>`,

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

  card: `<QCard
  eyebrow="Surface"
  title="Plain content card with stronger hierarchy."
  subtitle="Use this as the baseline information surface."
>
  <p>Use it for summaries, settings blocks, and feature notes.</p>
</QCard>

<QCard
  hoverable
  eyebrow="Surface"
  title="Plain content card with stronger hierarchy."
  subtitle="Use this as the baseline information surface."
>
  <p>Use it for summaries, settings blocks, and feature notes.</p>
</QCard>

<QCard dashed marker="A-02 / OUTLINE" marker-style="plate" title="Dashed card" />
<QCard hoverable dashed marker="A-02 / OUTLINE" marker-style="plate" title="Dashed card" />
<QCard leader marker="AN-14" marker-style="chip" title="Annotated card" />
<QCard hoverable leader marker="AN-14" marker-style="chip" title="Annotated card" />
<QCard variant="tile" marker="01" title="Tile" subtitle="Compact surface" />
<QCard variant="tile" marker="01" title="Tile" subtitle="Compact surface" hoverable />`,

  mediaFrame: `<QMediaFrame
  src="https://static.quaily.com/media/jo4uz87q.jpg"
  top-label="FRAME 01"
  bottom-label="12 / 05"
  caption="Hero media with stronger shell."
/>

<QMediaFrame crt top-label="SCAN" bottom-label="CRT">
  <div class="signal-panel">...</div>
</QMediaFrame>`,

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

const demoRegistry = {
  button: {
    id: "button",
    title: "Button",
    description: "Actions, emphasis, sizes, and keyboard-aware controls.",
    sourceCode: sourceCodes.button,
    component: SecButton,
  },
  input: {
    id: "input",
    title: "Input",
    description: "Text entry with hints, counters, and slot-driven composition.",
    sourceCode: sourceCodes.input,
    component: SecInput,
  },
  textarea: {
    id: "textarea",
    title: "Textarea",
    description: "Multi-line input states for longer writing and notes.",
    sourceCode: sourceCodes.textarea,
    component: SecTextarea,
  },
  form: {
    id: "form",
    title: "Form",
    description: "Field grouping patterns for composed forms and validation.",
    sourceCode: sourceCodes.form,
    component: SecForm,
  },
  "input-with-btn": {
    id: "input-with-btn",
    title: "Input with Button",
    description: "A compact pattern for subscribe, search, and commit flows.",
    sourceCode: sourceCodes.inputWithBtn,
    component: SecInputWithButton,
  },
  menu: {
    id: "menu",
    title: "Menu",
    description: "Dropdowns, menus, and text-field combinations for dense selection flows.",
    sourceCode: sourceCodes.menu,
    component: SecMenu,
  },
  dialog: {
    id: "dialog",
    title: "Dialog",
    description: "Prompt, confirm, and interrupt with clearer interaction weight.",
    sourceCode: sourceCodes.dialog,
    component: SecDialog,
  },
  switch: {
    id: "switch",
    title: "Switch",
    description: "Toggle states with theme-aware variants.",
    sourceCode: sourceCodes.switch,
    component: SecSwitch,
  },
  selector: {
    id: "selector",
    title: "Selector",
    description: "Language and currency pickers for structured choice.",
    sourceCode: sourceCodes.selector,
    component: SecSelector,
  },
  progress: {
    id: "progress",
    title: "Progress",
    description: "Loading, completion, and infinite feedback bars.",
    sourceCode: sourceCodes.progress,
    component: SecProgress,
  },
  fence: {
    id: "fence",
    title: "Fence",
    description: "Inline notices, code fences, and semantic content blocks.",
    sourceCode: sourceCodes.fence,
    component: SecFence,
  },
  toast: {
    id: "toast",
    title: "Toast",
    description: "Ephemeral status messaging for system feedback.",
    sourceCode: sourceCodes.toast,
    component: SecToast,
  },
  tooltip: {
    id: "tooltip",
    title: "Tooltip",
    description: "Hover, focus, and click explanations without visual noise.",
    sourceCode: sourceCodes.tooltip,
    component: SecTooltip,
  },
  skeleton: {
    id: "skeleton",
    title: "Skeleton",
    description: "Loading placeholders for perceived performance.",
    sourceCode: sourceCodes.skeleton,
    component: SecSkeleton,
  },
  badge: {
    id: "badge",
    title: "Badge",
    description: "Status tags, chips, and small semantic markers.",
    sourceCode: sourceCodes.badge,
    component: SecBadge,
  },
  collapse: {
    id: "collapse",
    title: "Collapse",
    description: "Progressive disclosure for long or optional content.",
    sourceCode: sourceCodes.collapse,
    component: SecCollapse,
  },
  drawer: {
    id: "drawer",
    title: "Drawer",
    description: "Slide-in surfaces for focused secondary tasks.",
    sourceCode: sourceCodes.drawer,
    component: SecDrawer,
  },
  pagination: {
    id: "pagination",
    title: "Pagination",
    description: "Pagination controls with size switching and state handling.",
    sourceCode: sourceCodes.pagination,
    component: SecPagination,
  },
  tab: {
    id: "tab",
    title: "Tabs",
    description: "Segment navigation with plain and framed variants.",
    sourceCode: sourceCodes.tabs,
    component: SecTab,
  },
  datetime: {
    id: "datetime",
    title: "Datetime Picker",
    description: "Date and time selection for scheduling and filtering.",
    sourceCode: sourceCodes.datetime,
    component: SecDatetimePicker,
  },
  cover: {
    id: "cover",
    title: "Cover",
    description: "Media blocks and covers for editorial and card surfaces.",
    sourceCode: sourceCodes.cover,
    component: SecCover,
  },
  avatar: {
    id: "avatar",
    title: "Avatar",
    description: "Identity markers with multiple shapes and scales.",
    sourceCode: sourceCodes.avatar,
    component: SecAvatar,
  },
  card: {
    id: "card",
    title: "Card",
    description: "Flexible content cards with optional morph-only annotation details and compact tile mode.",
    sourceCode: sourceCodes.card,
    component: SecCard,
  },
  "media-frame": {
    id: "media-frame",
    title: "Media Frame",
    description: "Framed media with coordinates, corner marks, and optional CRT treatment.",
    sourceCode: sourceCodes.mediaFrame,
    component: SecMediaFrame,
  },
  share: {
    id: "share",
    title: "Share",
    description: "Share surfaces tuned for social distribution patterns.",
    sourceCode: sourceCodes.share,
    component: SecShare,
  },
  payment: {
    id: "payment",
    title: "Payment",
    description: "Payment method presentation and selection states.",
    sourceCode: sourceCodes.payment,
    component: SecPayment,
  },
  "height-comparison": {
    id: "height-comparison",
    title: "Height Comparison",
    description: "Compare control rhythm across buttons, fields, and pickers.",
    sourceCode: sourceCodes.heightComparison,
    component: SecHeightComparison,
  },
  icon: {
    id: "icon",
    title: "Icons",
    description: "Icon gallery with copy-ready symbols and color variants.",
    sourceCode: sourceCodes.icon,
    component: SecIcon,
  },
  "color-scheme": {
    id: "color-scheme",
    title: "Color Scheme",
    description: "Live theme tokens for surfaces, ink, and accent colors.",
    sourceCode: sourceCodes.colorScheme,
    component: SecColorScheme,
  },
  typeface: {
    id: "typeface",
    title: "Typeface",
    description: "Serif and sans roles for editorial hierarchy and UI support.",
    sourceCode: sourceCodes.typeface,
    component: SecTypeface,
  },
  frame: {
    id: "frame",
    title: "Frame & Divider",
    description: "Frames and dividers that establish rhythm without bulk.",
    sourceCode: sourceCodes.frame,
    component: SecFrameAndDivider,
  },
  premium: {
    id: "premium",
    title: "Premium Decoration",
    description: "Accent treatments for premium or membership surfaces.",
    sourceCode: sourceCodes.premium,
    component: SecPremiumDecoration,
  },
} as const;

const catalogGroups = [
  {
    id: "buttons",
    index: "01",
    title: "Buttons",
    summary: "Actions, emphasis, and shortcut-friendly controls that establish the library's tone fast.",
    firstDemoId: "button",
    itemIds: ["button"],
  },
  {
    id: "form-inputs",
    index: "02",
    title: "Form Inputs",
    summary: "Text entry, composition, and submission patterns for writing-heavy products.",
    firstDemoId: "input",
    itemIds: ["input", "textarea", "form", "input-with-btn"],
  },
  {
    id: "selection",
    index: "03",
    title: "Selection",
    summary: "Pick, filter, and swap context with controls that stay compact under pressure.",
    firstDemoId: "switch",
    itemIds: ["switch", "selector", "menu"],
  },
  {
    id: "feedback",
    index: "04",
    title: "Feedback",
    summary: "Progress, alerts, notices, and transient states for system response.",
    firstDemoId: "progress",
    itemIds: ["progress", "dialog", "fence", "toast", "tooltip", "skeleton", "badge", "collapse", "drawer"],
  },
  {
    id: "navigation",
    index: "05",
    title: "Navigation",
    summary: "Movement patterns that keep the interface legible as content grows.",
    firstDemoId: "pagination",
    itemIds: ["pagination", "tab"],
  },
  {
    id: "data-display",
    index: "06",
    title: "Data Display",
    summary: "Media, identity, sharing, payments, and supporting display primitives.",
    firstDemoId: "datetime",
    itemIds: ["datetime", "card", "media-frame", "cover", "avatar", "share", "payment", "height-comparison", "icon"],
  },
  {
    id: "typography",
    index: "07",
    title: "Typography & Decoration",
    summary: "Voice, framing, and ornamental accents for editorial and premium surfaces.",
    firstDemoId: "color-scheme",
    itemIds: ["color-scheme", "typeface", "frame", "premium"],
  },
] as const;

const featuredDemoIds = ["button", "input", "menu", "dialog"] as const;

const featuredDemos = featuredDemoIds.map((id) => demoRegistry[id]);

const openingNotes = [
  "Serif-led hierarchy for editorial interfaces",
  "Tactile controls with strong state coverage",
  "Article styling that can support long-form content",
];

const totalShowcases = catalogGroups.reduce((count, group) => count + group.itemIds.length, 0);

function getDemo(id: keyof typeof demoRegistry) {
  return demoRegistry[id];
}

function scrollToDemo(sectionId: string) {
  const element = document.getElementById(`demo-section-${sectionId}`);
  if (!element) return;

  const headerOffset = 88;
  const elementPosition = element.getBoundingClientRect().top + window.scrollY - headerOffset;
  window.scrollTo({
    top: elementPosition,
    behavior: "smooth",
  });
}

function openArticle() {
  router.push("/article");
}
</script>

<template>
  <div class="home-page">
    <section class="home-intro">
      <div class="intro-copy">
        <p class="intro-kicker q-text-caption">Quail UI Field Guide</p>
        <h1 class="intro-title">Tactile interface primitives for publishing products that need tone.</h1>
        <p class="intro-desc q-text-body-text">
          Quail UI is strongest when the interface feels editorial, direct, and quietly distinctive.
          Start with the controls that define the library fastest, then drop into the full catalog when
          you need the long tail.
        </p>
        <div class="intro-actions">
          <QButton class="primary" @click="scrollToDemo('button')">Start with essentials</QButton>
          <QButton class="outlined" @click="openArticle">Read article styles</QButton>
        </div>
      </div>

      <div class="intro-notes">
        <div class="note-block">
          <p class="note-kicker q-text-caption">What stands out</p>
          <ul class="intro-points">
            <li v-for="point in openingNotes" :key="point" class="q-text-body-text">{{ point }}</li>
          </ul>
        </div>

        <div class="note-block">
          <p class="note-kicker q-text-caption">Theme stance</p>
          <p class="theme-note q-text-body-text">
            Light and dark are the reference themes. Morph stays available as an
            experimental texture pass for colder, more technical layouts.
          </p>
        </div>
      </div>
    </section>

    <section class="featured-section">
      <div class="section-intro">
        <p class="section-kicker q-text-caption">Start here</p>
        <h2 class="q-text-h1">Four demos that explain the library quickly.</h2>
        <p class="q-text-desc">
          These are the surfaces that do the most work in the least time: actions, text entry,
          selection, and prompting.
        </p>
      </div>

      <div class="featured-grid">
        <ComponentShowcase
          v-for="demo in featuredDemos"
          :id="`featured-${demo.id}`"
          :key="demo.id"
          :title="demo.title"
          :description="demo.description"
          :source-code="demo.sourceCode"
          :show-source-toggle="false"
          variant="feature"
        >
          <component :is="demo.component" />
        </ComponentShowcase>
      </div>
    </section>

    <section class="catalog-shell">
      <div class="section-intro">
        <p class="section-kicker q-text-caption">Full catalog</p>
        <h2 class="q-text-h1">All {{ totalShowcases }} demos, organized by job instead of alphabet.</h2>
        <p class="q-text-desc">
          The exhaustive library still lives here. The difference is that it no longer needs to carry
          the first impression alone.
        </p>
      </div>

      <section v-for="group in catalogGroups" :key="group.id" class="category-group">
        <div class="category-heading">
          <div class="category-meta">
            <span class="category-index q-text-caption">{{ group.index }}</span>
            <div class="category-copy">
              <h2 class="category-title q-text-h1">{{ group.title }}</h2>
              <p class="category-summary q-text-desc">{{ group.summary }}</p>
            </div>
          </div>
        </div>

        <div class="catalog-group-list">
          <ComponentShowcase
            v-for="itemId in group.itemIds"
            :id="itemId"
            :key="itemId"
            :title="getDemo(itemId).title"
            :description="getDemo(itemId).description"
            :source-code="getDemo(itemId).sourceCode"
          >
            <component :is="getDemo(itemId).component" />
          </ComponentShowcase>
        </div>
      </section>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  --catalog-content-inset: clamp(0.95rem, 2.2vw, 1.25rem);
  display: flex;
  flex-direction: column;
  gap: clamp(2.5rem, 5vw, 4.5rem);
  min-width: 0;
  padding-bottom: 4rem;
}

.home-intro {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(18rem, 0.9fr);
  gap: clamp(1.75rem, 4vw, 3.25rem);
  align-items: start;
  padding: clamp(0.25rem, 1.5vw, 0.75rem) 0 clamp(1.75rem, 3.5vw, 2.5rem);
  border-bottom: 0.5px solid var(--q-c-dark-5);
}

.intro-copy {
  min-width: 0;
}

.intro-kicker,
.section-kicker,
.category-index {
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--q-c-secondary) 58%, var(--q-c-dark-3));
}

.intro-title {
  margin: 0;
  max-width: 12ch;
  font-family: var(--q-font-serif);
  font-size: clamp(2.3rem, 5vw, 4.15rem);
  line-height: 0.95;
  letter-spacing: -0.025em;
}

.intro-desc {
  max-width: 58ch;
  margin-top: 1.25rem;
  color: var(--q-c-dark-2);
  font-size: clamp(0.95rem, 1.2vw, 1.05rem);
  line-height: 1.7;
}

.intro-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
  margin-top: 1.35rem;
}

.intro-notes {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding-left: clamp(1rem, 2vw, 1.5rem);
  border-left: 0.5px solid var(--q-c-dark-5);
}

.note-block {
  display: grid;
  gap: 0.55rem;
  padding: 0.9rem 1rem;
  border: 0.5px solid var(--q-c-dark-5);
  border-radius: 12px;
  background: color-mix(in srgb, var(--q-bg-light) 76%, white 24%);
}

.note-kicker {
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--q-c-secondary) 35%, var(--q-c-dark-3));
}

.intro-points {
  display: grid;
  gap: 0.55rem;
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    color: var(--q-c-dark-2);
    padding-bottom: 0;
    border-bottom: none;
  }
}

.theme-note {
  max-width: 34ch;
  margin: 0;
  color: var(--q-c-dark-2);
}

.section-intro {
  display: grid;
  gap: 0.4rem;
  min-width: 0;
  max-width: 38rem;
}

.featured-section,
.catalog-shell {
  display: grid;
  gap: 1.4rem;
}

.featured-grid,
.catalog-group-list {
  display: grid;
  gap: 1.25rem;
}

.category-group {
  display: grid;
  gap: 1.2rem;
}

.category-heading {
  display: grid;
  gap: 0.55rem;
  align-items: start;
  padding-top: 1rem;
  border-top: 0.5px solid var(--q-c-dark-5);
}

.category-meta {
  position: relative;
  min-width: 0;
}

.category-index {
  position: absolute;
  top: 0.35rem;
  left: 0;
}

.category-copy {
  min-width: 0;
  padding-left: var(--catalog-content-inset);
}

.category-title {
  margin: 0;
  font-weight: 650;
}

.category-summary {
  max-width: 40rem;
  margin-top: 0.3rem;
  color: var(--q-c-dark-2);
}

@media (max-width: 960px) {
  .home-intro,
  .category-heading {
    grid-template-columns: 1fr;
  }

  .intro-title {
    max-width: 14ch;
  }

  .intro-notes {
    padding-left: 0;
    padding-top: 1rem;
    border-left: none;
    border-top: 0.5px solid var(--q-c-dark-4);
  }
}

@media (max-width: 640px) {
  .home-page {
    gap: 2.5rem;
  }

  .section-intro :deep(.q-text-h1) {
    font-size: clamp(1.9rem, 9vw, 2.35rem);
    line-height: 0.98;
    max-width: 12ch;
  }

  .intro-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .intro-actions :deep(.q-button) {
    justify-content: center;
    width: 100%;
  }
}

:global(.dark) .intro-kicker,
:global(.dark) .section-kicker,
:global(.dark) .category-index {
  color: color-mix(in srgb, var(--q-c-light-2) 75%, var(--q-c-blue-lighter));
}

:global(.dark) .home-intro,
:global(.dark) .category-heading,
:global(.dark) .intro-notes {
  border-color: var(--q-c-light-5);
}

:global(.dark) .intro-desc,
:global(.dark) .category-summary,
:global(.dark) .intro-points li,
:global(.dark) .theme-note {
  color: var(--q-c-light-2);
}

:global(.dark) .note-kicker {
  color: var(--q-c-light-3);
}

:global(.dark) .note-block {
  border-color: var(--q-c-light-5);
  background: color-mix(in srgb, var(--q-bg-dark-2) 84%, black 16%);
}

:global(.dark) .category-title {
  color: var(--q-c-light);
}
</style>
