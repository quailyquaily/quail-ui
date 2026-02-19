export const THEME_STORAGE_KEY = "quail-ui-theme";

export const THEME_IDS = ["light", "dark", "morph"] as const;

export type QuailTheme = (typeof THEME_IDS)[number];

export interface ThemeOption {
  title: string;
  value: QuailTheme;
}

export function isTheme(value: string | null | undefined): value is QuailTheme {
  return !!value && THEME_IDS.includes(value as QuailTheme);
}

export function readStoredTheme(): QuailTheme | null {
  if (typeof window === "undefined") {
    return null;
  }
  const value = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (isTheme(value)) {
    return value;
  }

  // Legacy compatibility: migrate previous warm theme to morph
  if (value === "warm") {
    window.localStorage.setItem(THEME_STORAGE_KEY, "morph");
    return "morph";
  }

  return null;
}

export function resolveInitialTheme(): QuailTheme {
  const stored = readStoredTheme();
  if (stored) {
    return stored;
  }

  if (typeof window !== "undefined") {
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    if (prefersDark) {
      return "dark";
    }
  }

  return "light";
}

export function applyTheme(theme: QuailTheme, persist = true): QuailTheme {
  if (typeof document === "undefined") {
    return theme;
  }

  const body = document.body;
  if (!body) {
    return theme;
  }

  const isDark = theme === "dark";

  body.dataset.theme = theme;
  body.classList.toggle("dark", isDark);
  body.classList.toggle("light", !isDark);

  if (persist && typeof window !== "undefined") {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }

  return theme;
}

export function getThemeOptions(): ThemeOption[] {
  return [
    { title: "Light", value: "light" },
    { title: "Dark", value: "dark" },
    { title: "Morph", value: "morph" },
  ];
}
