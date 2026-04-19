"use client";
 
import * as React from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  enableSystem?: boolean;
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined
);

function resolveTheme(theme: Theme, enableSystem: boolean): "light" | "dark" {
  if (theme === "system" && enableSystem) {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return theme === "dark" ? "dark" : "light";
}

function applyThemeClass(resolvedTheme: "light" | "dark") {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(resolvedTheme);
  root.style.colorScheme = resolvedTheme;
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  enableSystem = true,
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = React.useState<"light" | "dark">(
    "light"
  );

  React.useEffect(() => {
    const stored = window.localStorage.getItem(storageKey) as Theme | null;
    const initialTheme = stored ?? defaultTheme;
    const initialResolved = resolveTheme(initialTheme, enableSystem);

    setThemeState(initialTheme);
    setResolvedTheme(initialResolved);
    applyThemeClass(initialResolved);
  }, [defaultTheme, enableSystem, storageKey]);

  React.useEffect(() => {
    if (!enableSystem || theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const nextResolved = mediaQuery.matches ? "dark" : "light";
      setResolvedTheme(nextResolved);
      applyThemeClass(nextResolved);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [enableSystem, theme]);

  const setTheme = React.useCallback(
    (nextTheme: Theme) => {
      const nextResolved = resolveTheme(nextTheme, enableSystem);
      setThemeState(nextTheme);
      setResolvedTheme(nextResolved);
      applyThemeClass(nextResolved);
      window.localStorage.setItem(storageKey, nextTheme);
    },
    [enableSystem, storageKey]
  );

  const contextValue = React.useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
    }),
    [theme, resolvedTheme, setTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}