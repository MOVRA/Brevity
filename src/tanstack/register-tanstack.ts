import { register, sendNotif, updatePassword } from "@/api/auth";
import { toaster } from "@/components/ui/toaster";
import { NotifType, PasswordType, registerType } from "@/validator/auth";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
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
    onError: (error) => {
      if (isAxiosError(error)) {
        toaster.error({
          title: error.response?.data.message,
        });
      }
    },
  });
}

export function MutatePassword(userId: string | undefined) {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["RESETPASSWORD"],
    mutationFn: async (data: PasswordType) => {
      const response = await updatePassword(data, userId);
      return response;
    },
    onSuccess: (data) => {
      toaster.success({
        title: data.message,
      });
      navigate("/sign-in");
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toaster.error({
          title: error.response?.data.message,
        });
      }
    },
  });
}

export function MutateNotif() {
  return useMutation({
    mutationKey: ["SENDNOTIF"],
    mutationFn: async (data: NotifType) => {
      const response = await sendNotif(data);
      return response;
    },
    onSuccess: (data) => {
      toaster.success({
        title: data.message,
      });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toaster.error({
          title: error.response?.data.message,
        });
      }
    },
  });
}
