import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

export function useSignup() {
  const { isPending: isLoading, mutate: signup } = useMutation({
    mutationFn: ({ email, password, fullName }) =>
      signupApi({ email, password, fullName }),
    onSuccess: (user) => {
      toast.success("User successfully created");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isLoading, signup };
}
