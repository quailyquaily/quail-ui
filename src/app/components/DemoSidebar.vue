<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';

const props = defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  close: [];
  navigate: [sectionId: string];
}>();

const categories = computed(() => [
  {
    id: 'buttons',
    title: 'Buttons',
    sections: [
      { id: 'button', title: 'Button' },
    ]
  },
  {
    id: 'form-inputs',
    title: 'Form Inputs',
    sections: [
      { id: 'input', title: 'Input' },
      { id: 'textarea', title: 'Textarea' },
      { id: 'form', title: 'Form' },
      { id: 'input-with-btn', title: 'Input with Button' },
    ]
  },
  {
    id: 'selection',
    title: 'Selection',
    sections: [
      { id: 'switch', title: 'Switch' },
      { id: 'selector', title: 'Selector' },
      { id: 'menu', title: 'Menu' },
    ]
  },
  {
    id: 'feedback',
    title: 'Feedback',
    sections: [
      { id: 'progress', title: 'Progress' },
      { id: 'dialog', title: 'Dialog' },
      { id: 'fence', title: 'Fence' },
      { id: 'toast', title: 'Toast' },
      { id: 'tooltip', title: 'Tooltip' },
      { id: 'skeleton', title: 'Skeleton' },
      { id: 'badge', title: 'Badge' },
      { id: 'collapse', title: 'Collapse' },
      { id: 'drawer', title: 'Drawer' },
    ]
  },
  {
    id: 'navigation',
    title: 'Navigation',
    sections: [
      { id: 'pagination', title: 'Pagination' },
      { id: 'tab', title: 'Tab' },
    ]
  },
  {
    id: 'data-display',
    title: 'Data Display',
    sections: [
      { id: 'datetime', title: 'Datetime Picker' },
      { id: 'cover', title: 'Cover' },
      { id: 'avatar', title: 'Avatar' },
      { id: 'share', title: 'Share' },
      { id: 'payment', title: 'Payment' },
      { id: 'height-comparison', title: 'Height Comparison' },
      { id: 'icon', title: 'Icons' },
    ]
  },
  {
    id: 'typography',
    title: 'Typography & Decoration',
    sections: [
      { id: 'typeface', title: 'Typeface' },
      { id: 'frame', title: 'Frame & Divider' },
      { id: 'premium', title: 'Premium Decoration' },
    ]
  }
]);

const expandedCategories = ref<string[]>(['buttons', 'form-inputs', 'selection', 'feedback', 'navigation', 'data-display', 'typography']);
const activeSection = ref('');
const sectionOrder = computed(() => categories.value.flatMap((category) => category.sections.map((section) => section.id)));

let refreshFrame = 0;
const SCROLL_OFFSET = 104;

function syncActiveSection() {
  if (typeof window === 'undefined' || !sectionOrder.value.length) {
    return;
  }

  let nextSection = sectionOrder.value[0];

  for (const sectionId of sectionOrder.value) {
    const element = document.getElementById(`demo-section-${sectionId}`);
    if (!element) {
      continue;
    }

    const { top } = element.getBoundingClientRect();
    if (top <= SCROLL_OFFSET) {
      nextSection = sectionId;
    } else {
      break;
    }
  }

  if (activeSection.value !== nextSection) {
    activeSection.value = nextSection;
  }
}

function refreshObserver() {
  if (typeof window === 'undefined') {
    return;
  }

  window.cancelAnimationFrame(refreshFrame);
  refreshFrame = window.requestAnimationFrame(() => {
    syncActiveSection();
  });
}

function toggleCategory(categoryId: string) {
  const index = expandedCategories.value.indexOf(categoryId);
  if (index === -1) {
    expandedCategories.value.push(categoryId);
  } else {
    expandedCategories.value.splice(index, 1);
  }
}

function scrollToSection(sectionId: string) {
  activeSection.value = sectionId;
  const element = document.getElementById(`demo-section-${sectionId}`);
  if (element) {
    const headerOffset = 88;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
  emit('navigate', sectionId);
  emit('close');
}

onMounted(() => {
  nextTick(() => {
    refreshObserver();
  });
  window.addEventListener('resize', refreshObserver);
  window.addEventListener('scroll', refreshObserver, { passive: true });
});

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.cancelAnimationFrame(refreshFrame);
    window.removeEventListener('resize', refreshObserver);
    window.removeEventListener('scroll', refreshObserver);
  }
});

watch(() => props.open, (isOpen) => {
  if (isOpen) {
    nextTick(() => {
      refreshObserver();
    });
  }
});
</script>

<template>
  <aside class="demo-sidebar" :class="{ open }">
    <div class="sidebar-header">
      <span class="q-text-h3">Components</span>
      <QButton class="icon plain close-btn" @click="$emit('close')">
        <QIconCloseCircle class="icon" />
      </QButton>
    </div>

    <nav class="sidebar-nav">
      <div
        v-for="category in categories"
        :key="category.id"
        class="sidebar-category"
        :class="{ 'has-active-section': category.sections.some((section) => section.id === activeSection) }"
      >
        <div
          class="category-header"
          @click="toggleCategory(category.id)"
        >
          <span class="category-title q-text-body-title">{{ category.title }}</span>
          <QIconChevronDown
            class="chevron-icon"
            :class="{ expanded: expandedCategories.includes(category.id) }"
          />
        </div>

        <Transition name="collapse">
          <div
            v-if="expandedCategories.includes(category.id)"
            class="category-sections"
          >
            <button
              v-for="section in category.sections"
              :key="section.id"
              class="section-link q-text-body-text"
              :class="{ active: activeSection === section.id }"
              @click="scrollToSection(section.id)"
            >
              {{ section.title }}
            </button>
          </div>
        </Transition>
      </div>
    </nav>
  </aside>
</template>

<style lang="scss" scoped>
.demo-sidebar {
  width: 240px;
  min-width: 240px;
  height: calc(100vh - 60px);
  position: sticky;
  top: 60px;
  overflow-y: auto;
  background: var(--q-bg-light);
  border-right: 0.5px solid var(--q-c-dark-4);
  padding: 1rem;

  @media (max-width: 767px) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 200;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    box-shadow: none;

    &.open {
      transform: translateX(0);
      box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);
    }
  }
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 0.5px solid var(--q-c-dark-4);
  margin-bottom: 0.5rem;

  .close-btn {
    display: none;
    @media (max-width: 767px) {
      display: flex;
    }
  }
}

.sidebar-nav {
  display: grid;
  gap: 0.25rem;
  padding-top: 0.5rem;
}

.category-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 2.5rem;
  padding: 0.625rem 0.75rem;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.18s ease-out, color 0.18s ease-out;

  &:hover {
    background-color: var(--q-c-dark-5);
  }
}

.category-title {
  flex: 1;
  font-weight: 500;
  color: var(--q-c-dark-2);
  transition: color 0.14s ease-out;
}

.sidebar-category.has-active-section .category-header {
  background: transparent;
}

.sidebar-category.has-active-section .category-title {
  color: var(--q-c-dark);
}

.chevron-icon {
  width: 14px;
  height: 14px;
  opacity: 0.5;
  transition: transform 0.2s;

  &.expanded {
    transform: rotate(180deg);
  }
}

.category-sections {
  position: relative;
  margin-left: 0.75rem;
  padding-left: 0.875rem;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0.45rem;
    bottom: 0.45rem;
    left: 0;
    width: 1px;
    background: var(--q-c-dark-4);
    transition: background-color 0.14s ease-out;
  }
}

.section-link {
  position: relative;
  display: block;
  width: 100%;
  text-align: left;
  min-height: 2.5rem;
  padding: 0.625rem 0.5rem 0.625rem 0.875rem;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 0;
  color: var(--q-c-dark-2);
  font-weight: 500;
  transition: color 0.14s ease-out;
  font-size: 0.9375rem;
  line-height: 1.45;

  &::before {
    content: "";
    position: absolute;
    top: 0.55rem;
    bottom: 0.55rem;
    left: -0.875rem;
    width: 1px;
    background: var(--q-c-dark-4);
    opacity: 0;
    transition: opacity 0.14s ease-out, background-color 0.14s ease-out;
  }

  &:hover {
    color: var(--q-c-dark);
    background-color: transparent;

    &::before {
      background: var(--q-c-dark-3);
      opacity: 0.55;
    }
  }

  &.active {
    color: var(--q-c-dark);
    background: transparent;

    &::before {
      background: var(--q-c-red);
      opacity: 1;
    }
  }
}

// Collapse animation
.collapse-enter-active,
.collapse-leave-active {
  transition: opacity 0.18s ease-out, transform 0.18s ease-out;
}

.collapse-enter-from,
.collapse-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>

<style lang="scss">
.dark {
  .demo-sidebar {
    background: var(--q-bg-dark);
    border-right-color: var(--q-c-light-4);
  }

  .sidebar-header {
    border-bottom-color: var(--q-c-light-4);
    color: var(--q-c-light);
  }

  .category-header:hover {
    background-color: var(--q-c-light-5);
  }

  .category-title {
    color: var(--q-c-light-2);
  }

  .sidebar-category.has-active-section .category-header {
    background: transparent;
  }

  .sidebar-category.has-active-section .category-title {
    color: var(--q-c-light);
  }

  .category-sections::before {
    background: var(--q-c-light-4);
  }

  .section-link {
    color: var(--q-c-light-2);

    &:hover {
      color: var(--q-c-light);
      background-color: transparent;

      &::before {
        background: var(--q-c-light-3);
        opacity: 0.6;
      }
    }

    &.active {
      color: var(--q-c-light);
      background-color: transparent;

      &::before {
        background: var(--q-c-red-light);
        opacity: 1;
      }
    }
  }
}
</style>
