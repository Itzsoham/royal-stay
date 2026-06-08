import { neon } from "../../services/neon";

export function useUser() {
  // Neon Auth (Better Auth) reactive session hook.
  const session = neon.auth.useSession();

  return {
    isLoading: session.isPending,
    user: session.data?.user,
    isAuthenticated: Boolean(session.data?.user),
  };
}
