import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { neon } from "../../services/neon";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  async function logout() {
    setIsLoading(true);
    try {
      await neon.auth.signOut();
      queryClient.clear();
      navigate("/auth/sign-in", { replace: true });
    } finally {
      setIsLoading(false);
    }
  }

  return { logout, isLoading };
}
