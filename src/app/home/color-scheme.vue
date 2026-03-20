<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

interface ColorToken {
  label: string;
  token: string;
}

interface ColorGroup {
  title: string;
  description: string;
  items: ColorToken[];
}

const colorGroups: ColorGroup[] = [
  {
    title: "Surfaces",
    description: "Base backgrounds and paper tones used for shells, cards, and panels.",
    items: [
      { label: "Paper", token: "--q-bg-paper" },
      { label: "White", token: "--q-bg-white" },
      { label: "Light", token: "--q-bg-light" },
      { label: "Light 2", token: "--q-bg-light-2" },
      { label: "Dark", token: "--q-bg-dark" },
      { label: "Dark 2", token: "--q-bg-dark-2" },
    ],
  },
  {
    title: "Ink",
    description: "Neutral text and structure colors that define reading contrast and hierarchy.",
    items: [
      { label: "Ink", token: "--q-c-dark" },
      { label: "Ink 2", token: "--q-c-dark-2" },
      { label: "Ink 3", token: "--q-c-dark-3" },
      { label: "Line", token: "--q-c-dark-4" },
      { label: "Light Ink", token: "--q-c-light" },
      { label: "Secondary", token: "--q-c-secondary" },
    ],
  },
  {
    title: "Accents",
    description: "Primary and semantic accents, including the live button emphasis colors.",
    items: [
      { label: "Blue", token: "--q-c-blue" },
      { label: "Orange", token: "--q-c-orange" },
      { label: "Green", token: "--q-c-green" },
      { label: "Red", token: "--q-c-red" },
      { label: "Button Primary", token: "--q-button-primary-bg" },
      { label: "Button Highlight", token: "--q-button-highlight-bg" },
    ],
  },
];

const activeTheme = ref("light");
const tokenValues = ref<Record<string, string>>({});

let probeEl: HTMLSpanElement | null = null;
let observer: MutationObserver | null = null;

function ensureProbe(): HTMLSpanElement | null {
  if (typeof document === "undefined") {
    return null;
  }

  if (!probeEl) {
    probeEl = document.createElement("span");
    probeEl.setAttribute("aria-hidden", "true");
    probeEl.style.position = "fixed";
    probeEl.style.opacity = "0";
    probeEl.style.pointerEvents = "none";
    probeEl.style.inset = "0";
    document.body.appendChild(probeEl);
  }

  return probeEl;
}

function resolveTokenValue(token: string): string {
  const probe = ensureProbe();
  if (!probe || typeof window === "undefined") {
    return "";
  }

  probe.style.color = `var(${token})`;
  return window.getComputedStyle(probe).color.trim();
}

function refreshTokens() {
  if (typeof document === "undefined") {
    return;
  }

  activeTheme.value = document.body.dataset.theme || (document.body.classList.contains("dark") ? "dark" : "light");

  const nextValues: Record<string, string> = {};
  for (const group of colorGroups) {
    for (const item of group.items) {
      nextValues[item.token] = resolveTokenValue(item.token);
    }
  }

  tokenValues.value = nextValues;
}

function getTokenValue(token: string) {
  return tokenValues.value[token] || "";
}

onMounted(() => {
  refreshTokens();

  if (typeof document !== "undefined") {
    observer = new MutationObserver(() => {
      refreshTokens();
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-theme", "class", "style"],
    });
  }
});

onUnmounted(() => {
  observer?.disconnect();
  probeEl?.remove();
  observer = null;
  probeEl = null;
});
</script>

<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <div class="scheme-header">
      <div>
        <h2 class="q-text-h2">Color Scheme</h2>
        <p class="scheme-copy q-text-body-text q-c-dark-2">
          Live tokens for the current theme. Switch the theme in the top bar to inspect the actual resolved palette.
        </p>
      </div>
      <div class="theme-chip q-text-caption">Theme: {{ activeTheme }}</div>
    </div>

    <div class="scheme-groups">
      <section v-for="group in colorGroups" :key="group.title" class="scheme-group">
        <div class="group-heading">
          <h3 class="q-text-h3">{{ group.title }}</h3>
          <p class="group-copy q-text-body-text q-c-dark-2">{{ group.description }}</p>
        </div>

        <div class="swatch-grid">
          <article v-for="item in group.items" :key="item.token" class="swatch-card">
            <div class="swatch-sample" :style="{ backgroundColor: `var(${item.token})` }"></div>
            <div class="swatch-meta">
              <div class="swatch-label q-text-body-title">{{ item.label }}</div>
              <code class="swatch-token">{{ item.token }}</code>
              <div class="swatch-value q-text-caption">{{ getTokenValue(item.token) }}</div>
            </div>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
.scheme-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;

  @media (max-width: 640px) {
    flex-direction: column;
  }
}

.scheme-copy {
  max-width: 62ch;
  margin-top: 0.5rem;
}

.theme-chip {
  padding: 0.35rem 0.6rem;
  border: 0.5px solid var(--q-c-dark-4);
  border-radius: 999px;
  background: color-mix(in srgb, var(--q-bg-light) 82%, transparent);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  white-space: nowrap;
}

.scheme-groups {
  display: grid;
  gap: 1.5rem;
}

.scheme-group {
  display: grid;
  gap: 0.75rem;
}

.group-heading {
  display: grid;
  gap: 0.35rem;
}

.group-copy {
  max-width: 64ch;
}

.swatch-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.9rem;
}

.swatch-card {
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr);
  gap: 0.85rem;
  align-items: center;
  padding: 0.8rem;
  border: 0.5px solid var(--q-c-dark-4);
  border-radius: var(--q-radius-md);
  background: color-mix(in srgb, var(--q-bg-white) 88%, transparent);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}

.swatch-sample {
  width: 64px;
  height: 64px;
  border-radius: var(--q-radius-sm);
  border: 0.5px solid color-mix(in srgb, var(--q-c-dark) 14%, transparent);
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.28);
}

.swatch-meta {
  min-width: 0;
  display: grid;
  gap: 0.25rem;
}

.swatch-label {
  line-height: 1.25;
}

.swatch-token {
  display: inline-block;
  width: fit-content;
  max-width: 100%;
  padding: 0.15rem 0.35rem;
  border-radius: 4px;
  background: color-mix(in srgb, var(--q-bg-light-2) 82%, transparent);
  color: var(--q-c-secondary);
  font-family: var(--q-font-mono);
  font-size: 0.74rem;
  overflow-wrap: anywhere;
}

.swatch-value {
  color: var(--q-c-dark-3);
  font-family: var(--q-font-mono);
  line-height: 1.4;
  overflow-wrap: anywhere;
}
</style>
