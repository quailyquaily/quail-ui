<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import logoLight from "@/assets/images/app-logo-light.png";
import logoDark from "@/assets/images/app-logo-dark.png";
import DemoSidebar from "@/app/components/DemoSidebar.vue";

const router = useRouter();
const route = useRoute();

const sidebarOpen = ref(false);
const isLightMode = ref(true);
const isTUIMode = ref(false);

function setTUIMode(enabled: boolean) {
  if (enabled) {
    document.body.classList.add('tui');
  } else {
    document.body.classList.remove('tui');
  }
}

const topNavTabs = computed(() => [
  { id: 'home', title: 'Components' },
  { id: 'article', title: 'Article' },
]);

const selectedTopTab = ref(topNavTabs.value[0]);

const isHomePage = computed(() => route.path === '/' || route.name === 'home');

const currentLogo = computed(() => isLightMode.value ? logoLight: logoDark);

watch(() => route.path, (path) => {
  if (path === '/' || path === '/home') {
    selectedTopTab.value = topNavTabs.value[0];
  } else if (path === '/article') {
    selectedTopTab.value = topNavTabs.value[1];
  }
}, { immediate: true });

watch(isLightMode, (light) => {
  if (light) {
    document.body.classList.remove('dark');
    document.body.classList.add('light');
  } else {
    document.body.classList.remove('light');
    document.body.classList.add('dark');
  }
});

watch(isTUIMode, (tui) => {
  setTUIMode(tui);
});

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
            <QAvatar :src="currentLogo" :size="28" class="logo-avatar"/>
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
          <div class="global-switch">
            <span class="switch-label q-text-caption">TUI</span>
            <QSwitch v-model="isTUIMode" />
          </div>
          <div class="global-switch">
            <!-- <QIconSun class="switch-icon" /> -->
            <QSwitch v-model="isLightMode" theme="clear-sky" />
          </div>
          <QButton class="github-btn outlined icon xs" href="https://github.com/quail-ink/quail-ui" target="_blank">
            <QIconGithub class="icon" />
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
  display: none !important;
  @media (max-width: 767px) {
    display: inline-flex !important;
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

.global-switch {
  display: flex;
  align-items: center;
  gap: 0.375rem;

  .switch-label {
    color: var(--q-c-dark-2);
    font-weight: 500;
  }

  .switch-icon {
    width: 16px;
    height: 16px;
    color: var(--q-c-dark-3);
  }

  @media (max-width: 640px) {
    .switch-label {
      display: none;
    }
  }
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
    font-family: var(--q-font-mono);
  }
}
</style>

<style lang="scss">
.dark {
  .top-nav {
    background: rgba(22, 22, 29, 0.9);
    border-bottom-color: var(--q-c-light-4);
  }

  .logo-text {
    color: var(--q-c-light);
  }

  .global-switch {
    .switch-label {
      color: var(--q-c-light-2);
    }

    .switch-icon {
      color: var(--q-c-light-3);
    }
  }
}
</style>
