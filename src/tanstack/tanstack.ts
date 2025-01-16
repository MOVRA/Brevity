/* eslint-disable @typescript-eslint/no-explicit-any */
import { login } from "@/services/auth";
import { threads } from "@/services/thread";
import { LoginResponse } from "@/types/auth";
import { LoginType } from "@/validator/auth";
import { useMutation, useQuery } from "@tanstack/react-query";

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

export const GetThreads = (setThreads: (a: any) => void) => {
  return useQuery({
    queryKey: ["THREADS"],
    queryFn: async () => {
      const response = await threads();
      setThreads(response.data);
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
};
