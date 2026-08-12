import { createRoot } from 'react-dom/client'
import { AuthProvider } from './shared/context/AuthContext.tsx';
import { ToastProvider } from "./shared/context/ToastContext";
import "./styles/tokens.css";
import "./index.css";
import App from './App.tsx'

if (
  import.meta.env.DEV
) {
  const { worker } =
    await import(
      "./mocks/browser"
    );

  await worker.start();
}

// createRoot connects React to the HTML document.

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <ToastProvider>
      <App />
    </ToastProvider>
  </AuthProvider>,
)

// A React Context Provider makes some state or functionality 
// available to descendant components.
