<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  close: [];
  navigate: [sectionId: string];
}>();

const categories = computed(() => [
  {
    id: 'typography',
    title: 'Typography & Decoration',
    sections: [
      { id: 'typeface', title: 'Typeface' },
      { id: 'frame', title: 'Frame & Divider' },
      { id: 'premium', title: 'Premium Decoration' },
    ]
  },
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
  }
]);

const expandedCategories = ref<string[]>(['typography', 'buttons', 'form-inputs', 'selection', 'feedback', 'navigation', 'data-display']);
const activeSection = ref('');

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
    const headerOffset = 80;
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
  padding-top: 0.5rem;
}

.category-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.625rem 0.5rem;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--q-c-dark-5);
  }
}

.category-title {
  flex: 1;
  font-weight: 500;
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
  padding-left: 0.5rem;
  overflow: hidden;
}

.section-link {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.5rem 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  color: var(--q-c-dark-2);
  transition: all 0.15s;
  font-size: 13px;

  &:hover {
    background-color: var(--q-c-dark-5);
    color: var(--q-c-dark);
  }

  &.active {
    color: var(--q-c-red);
    background-color: var(--q-c-red-dimm-1);
  }
}

// Collapse animation
.collapse-enter-active,
.collapse-leave-active {
  transition: all 0.2s ease;
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
    color: var(--q-c-light);
  }

  .section-link {
    color: var(--q-c-light-2);

    &:hover {
      background-color: var(--q-c-light-5);
      color: var(--q-c-light);
    }

    &.active {
      color: var(--q-c-red-light);
      background-color: rgba(174, 19, 0, 0.15);
    }
  }
}
</style>
