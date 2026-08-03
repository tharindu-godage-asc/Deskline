import { useEffect, useState } from "react";

export function useMotion() {
  const [reduceMotion, setReduceMotion] =
    useState(() => {
      const saved =
        localStorage.getItem(
          "reduce-motion"
        );

      if (saved !== null) {
        return saved === "true";
      }

      return window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
    });

  useEffect(() => {
    localStorage.setItem(
      "reduce-motion",
      String(reduceMotion)
    );

    document.documentElement.setAttribute(
      "data-motion",
      reduceMotion
        ? "reduce"
        : "normal"
    );
  }, [reduceMotion]);

  const toggleMotion = () => {
    setReduceMotion((prev) => !prev);
  };

  return {
    reduceMotion,
    toggleMotion,
  };
}