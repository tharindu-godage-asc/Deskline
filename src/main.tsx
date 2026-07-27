import { createRoot } from 'react-dom/client'
import { AuthProvider } from './shared/context/AuthContext.tsx';
import "./styles/tokens.css";
import "./index.css";
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <App />
  </AuthProvider>,
)
