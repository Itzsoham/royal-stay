import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
  Link as RouterLink,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { NeonAuthUIProvider } from "@neondatabase/auth-ui";

import { neon } from "./services/neon";
import GlobaleStyles from "./styles/GlobleStyles";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import AuthPage from "./pages/AuthPage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import Booking from "./pages/Booking";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider, useDarkMode } from "./contexts/DarkModeContext";
import Checkin from "./pages/Checkin";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

// Bridges react-router into the Neon Auth UI provider, which requires
// navigate/replace/Link from the host router. Must live INSIDE <BrowserRouter>.
function NeonAuthProvider({ children }) {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();

  return (
    <NeonAuthUIProvider
      authClient={neon.auth}
      defaultTheme={isDarkMode ? "dark" : "light"}
      navigate={(href) => navigate(href)}
      replace={(href) => navigate(href, { replace: true })}
      Link={({ href, to, ...props }) => <RouterLink to={href ?? to} {...props} />}
    >
      {children}
    </NeonAuthUIProvider>
  );
}

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobaleStyles />
        <BrowserRouter>
          <NeonAuthProvider>
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="bookings" element={<Bookings />} />
                <Route path="bookings/:bookingId" element={<Booking />} />
                <Route path="checkin/:bookingId" element={<Checkin />} />
                <Route path="cabins" element={<Cabins />} />
                <Route path="users" element={<Users />} />
                <Route path="settings" element={<Settings />} />
                <Route path="account" element={<Account />} />
              </Route>

              {/* Prebuilt Neon Auth UI: /auth/sign-in, /auth/sign-up, etc. */}
              <Route path="auth/:authView" element={<AuthPage />} />
              {/* Back-compat: old /login route now points at the Auth UI */}
              <Route path="login" element={<Navigate replace to="/auth/sign-in" />} />

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </NeonAuthProvider>
        </BrowserRouter>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
