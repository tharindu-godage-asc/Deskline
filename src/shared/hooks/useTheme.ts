import {
  useEffect,
  useState,
} from "react";

type Theme =
  | "light"
  | "dark";

export function useTheme() {
  const [theme, setTheme] =
    useState<Theme>("light");

  useEffect(() => {
    const saved =
      localStorage.getItem("theme");

    if (saved === "dark") {
      setTheme("dark");
      return;
    }

    if (saved === "light") {
      setTheme("light");
      return;
    }

    const prefersDark =
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

    setTheme(
      prefersDark
        ? "dark"
        : "light"
    );
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme
    );

    localStorage.setItem(
      "theme",
      theme
    );
  }, [theme]);

  return {
    theme,
    toggleTheme: () =>
      setTheme((prev) =>
        prev === "light"
          ? "dark"
          : "light"
      ),
  };
}