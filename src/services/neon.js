import { createClient } from "@neondatabase/neon-js";
import { BetterAuthReactAdapter } from "@neondatabase/neon-js/auth/react/adapters";

// Unified Neon client: authentication (Neon Auth) + database (Neon Data API).
// The auth JWT is automatically attached to every Data API request, so RLS
// policies on the tables decide what each request is allowed to do.
//
// URLs come from the Neon Console:
//   - Auth URL     -> Console > Auth
//   - Data API URL -> Console > Data API   (…/rest/v1)
const neon = createClient({
  auth: {
    adapter: BetterAuthReactAdapter(),
    url: import.meta.env.VITE_NEON_AUTH_URL,
  },
  dataApi: {
    url: import.meta.env.VITE_NEON_DATA_API_URL,
  },
});

export { neon };
export default neon;
