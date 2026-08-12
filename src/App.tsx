import { AppShell } from "./app/layout/AppShell";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router/index";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient =
  new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppShell>
        <RouterProvider router={router} />
      </AppShell>
    </QueryClientProvider>
  );
}

