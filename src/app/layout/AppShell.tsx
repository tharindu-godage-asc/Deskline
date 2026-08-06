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
import { router } from "../router";
import { useMotion } from "../../shared/hooks/useMotion";
import { useAuth } from "../../shared/context/AuthContext";
import { useToast } from "../../shared/context/ToastContext";

type Props = {
  children: ReactNode;
};

export function AppShell({ children }: Props) {
  const { theme, toggleTheme } = useTheme();
  const {
  reduceMotion,
  toggleMotion,
} = useMotion();


const { currentUser, logout } = useAuth();
const { showToast } = useToast();
const handleLogout = () => {
  logout();
  router.navigate("/login");
  showToast("Logged out successfully.", "success");
};

  return (
    <div className="min-h-screen">
      <header
        className="border-b"
        style={{
          background: "var(--color-surface)",
          borderColor: "var(--color-border)",
        }}
      >
        <div className="mx-auto max-w-7xl items-center justify-between px-6 py-4">
          <div className="col-span-1">
          <h1 className="text-3xl font-extrabold tracking-tight">
            <span
              style={{
                color: "var(--color-logo-primary)",
              }}
            >
              Desk
            </span>

            <span
              style={{
                color: "var(--color-logo-secondary)",
              }}
            >
              line
            </span>
          </h1>
          </div>

          <div className="flex items-center justify-between pt-3">
            {/* User Info */}
              {currentUser && (
                <div className="flex items-center gap-3">
                  <span className="font-medium">
                    {currentUser.name}
                  </span>

                  <span
                    className="rounded-full border px-3 py-1 text-xs font-medium capitalize"
                    style={{
                      borderColor: "var(--color-border)",
                      backgroundColor: "var(--color-surface)",
                    }}
                  >
                    {currentUser.role}
                  </span>
                </div>
              )}

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button  variant="secondary"
                size="md"
                onClick={toggleMotion}
              >
                {reduceMotion
                  ? "Motion Off"
                  : "Motion On"}
              </Button>

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
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-6">
        {children}
      </main>
    </div>
  );
}