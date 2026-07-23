/**
 * Step 4: AppShell provides the common layout shared across all application pages.
 *
 * It serves as the application's root layout, rendering shared UI elements
 * such as the header, navigation controls, and page content. Individual
 * screens are rendered within the `children` prop, allowing them to share
 * a consistent layout and styling.
 */

type Props = {
  children: React.ReactNode;
};

export function AppShell({ children }: Props) {
  return (
    <div className="app-shell">
      <header className="header">
        <h1>Deskline</h1>

        <div>
          <button>🌙 Theme</button>
          <button>Logout</button>
        </div>
      </header>

      <main>
        {children}
      </main>
    </div>
  );
}