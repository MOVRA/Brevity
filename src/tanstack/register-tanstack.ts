import { register } from "@/api/auth";
import { toaster } from "@/components/ui/toaster";
import { registerType } from "@/validator/auth";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router";

export function MutateRegister() {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["REGISTERUSER"],
    mutationFn: async (data: registerType) => {
      const response = await register(data);
      return response;
    },
    onSuccess: (data) => {
      toaster.success({
        title: data.message,
      });
      navigate("/sign-in");
    },
    onError: (data) => {
      toaster.error({
        title: (data as AxiosError).response?.data.message,
      });
    },
  });
}
