<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import logo from "@/assets/images/logo.svg";
import DemoSidebar from "@/app/components/DemoSidebar.vue";

const router = useRouter();
const route = useRoute();

const sidebarOpen = ref(false);

const topNavTabs = computed(() => [
  { id: 'home', title: 'Components' },
  { id: 'article', title: 'Article' },
]);

const selectedTopTab = ref(topNavTabs.value[0]);

const isHomePage = computed(() => route.path === '/' || route.name === 'home');

watch(() => route.path, (path) => {
  if (path === '/' || path === '/home') {
    selectedTopTab.value = topNavTabs.value[0];
  } else if (path === '/article') {
    selectedTopTab.value = topNavTabs.value[1];
  }
}, { immediate: true });

function onTabChange(data: { index: number; tab: { id: string; title: string } }) {
  if (data.tab.id === 'home') {
    router.push('/');
  } else if (data.tab.id === 'article') {
    router.push('/article');
  }
}

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
}

function closeSidebar() {
  sidebarOpen.value = false;
}

onMounted(() => {
  // Add .light class to body for light mode styles (article.scss requires .light or .dark context)
  if (!document.body.classList.contains('dark')) {
    document.body.classList.add('light');
  }
});
</script>

<template>
  <div class="app-container">
    <header class="top-nav">
      <div class="top-nav-inner">
        <div class="top-nav-left">
          <QButton v-if="isHomePage" class="hamburger-btn icon plain" @click="toggleSidebar">
            <QIconMenu class="icon" />
          </QButton>
          <div class="logo-wrapper" @click="router.push('/')">
            <QAvatar :src="logo" :size="28" class="logo-avatar"/>
            <span class="logo-text q-text-h3">Quail UI</span>
          </div>
        </div>

        <nav class="top-nav-center">
          <QTabs
            v-model="selectedTopTab"
            :tabs="topNavTabs"
            variant="plain"
            size="sm"
            @change="onTabChange"
          />
        </nav>

        <div class="top-nav-right">
          <QButton class="github-btn outlined xs" href="https://github.com/quail-ink/quail-ui" target="_blank">
            <QIconColorGithub class="icon" />
            <span class="github-text">GitHub</span>
          </QButton>
        </div>
      </div>
    </header>

    <div class="main-container">
      <DemoSidebar
        v-if="isHomePage"
        :open="sidebarOpen"
        @close="closeSidebar"
      />

      <div
        v-if="sidebarOpen"
        class="sidebar-overlay"
        @click="closeSidebar"
      ></div>

      <main class="content-area" :class="{ 'with-sidebar': isHomePage }">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style lang="scss">
body {
  background-color: var(--q-bg-light);
  margin: 0;
  &.dark {
    background-color: var(--q-bg-dark);
  }
}
</style>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900&display=swap');

.app-container {
  min-height: 100vh;
  font-family: var(--q-font-sans);
}

// Top Navigation
.top-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  height: 60px;
  background: var(--q-bg-light);
  border-bottom: 0.5px solid var(--q-c-dark-4);
  backdrop-filter: blur(8px);
  background: rgba(250, 250, 248, 0.9);
}

:global(.dark) .top-nav {
  background: rgba(22, 22, 29, 0.9);
  border-bottom-color: var(--q-c-light-4);
}

.top-nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
  height: 100%;
}

.top-nav-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.hamburger-btn {
  display: none;
  @media (max-width: 767px) {
    display: flex;
  }
}

.logo-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
}

.logo-avatar {
  flex-shrink: 0;
}

.logo-text {
  font-weight: 600;
  @media (max-width: 480px) {
    display: none;
  }
}

.top-nav-center {
  @media (max-width: 767px) {
    display: none;
  }
}

.top-nav-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.github-btn {
  .github-text {
    margin-left: 0.375rem;
    @media (max-width: 640px) {
      display: none;
    }
  }
}

// Main Container
.main-container {
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
}

.content-area {
  flex: 1;
  min-width: 0;
  padding: 1.5rem;

  @media (max-width: 767px) {
    padding: 1rem;
  }
}

// Sidebar Overlay
.sidebar-overlay {
  display: none;
  @media (max-width: 767px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 199;
  }
}

// Utility classes
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
