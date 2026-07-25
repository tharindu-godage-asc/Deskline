import { AppShell } from "./app/layout/AppShell";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router/index";

export default function App() {
  return (
    <>
      <AppShell>
        <RouterProvider router={router} />
      </AppShell>
    </>
  );
}

