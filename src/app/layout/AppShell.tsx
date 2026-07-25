/**
 * Step 4: AppShell provides the common layout shared across all application pages.
 *
 * It serves as the application's root layout, rendering shared UI elements
 * such as the header, navigation controls, and page content. Individual
 * screens are rendered within the `children` prop, allowing them to share
 * a consistent layout and styling.
 */

import { type ReactNode } from "react";
import { useTheme } from "../../shared/hooks/useTheme";
import { Button } from "../../shared/ui/button/Button";

type Props = {
  children: ReactNode;
};

export function AppShell({ children }: Props) {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="min-h-screen">
      <header
        className="border-b"
        style={{
          background: "var(--color-surface)",
          borderColor: "var(--color-border)",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold">
            Deskline
          </h1>

          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="md"
              onClick={toggleTheme}
            >
              {theme === "dark" ? "Light" : "Dark"}
            </Button>

            <Button
              variant="danger"
              size="md"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-6">
        {children}
      </main>
    </div>
  );
}