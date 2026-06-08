import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ui/ErrorFallback.jsx";
// Prebuilt Neon Auth UI styles (no Tailwind needed). Uses its own @layer so it
// won't override the app's styled-components. Brand theme is imported AFTER so
// our token overrides win.
import "@neondatabase/auth-ui/css";
import "./styles/auth-ui-theme.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace("/")}
    >
      <App />
    </ErrorBoundary>
  </StrictMode>
);
