import { login } from "@/api/auth";
import { toaster } from "@/components/ui/toaster";
import { LoginResponse } from "@/types/auth";
import { LoginType } from "@/validator/auth";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export const MutateLogin = () => {
  return useMutation({
    mutationKey: ["LOGIN"],
    mutationFn: async (credentials: LoginType) => {
      return login(credentials);
    },
    onSuccess: (data: LoginResponse) => {
      return data.data;
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toaster.error({
          title: error.response?.data?.message,
        });
      }
      console.log(error);
    },
  });
};
