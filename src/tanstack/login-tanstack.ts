import { login } from "@/api/auth";
import { LoginResponse } from "@/types/auth";
import { LoginType } from "@/validator/auth";
import { useMutation } from "@tanstack/react-query";

export const MutateLogin = () => {
  return useMutation({
    mutationKey: ["LOGIN"],
    mutationFn: async (credentials: LoginType) => {
      return login(credentials);
    },
    onSuccess: (data: LoginResponse) => {
      return data.data;
    },
  });
};