import {
  addThread,
  addThreadLike,
  deleteThread,
  threadById,
  threads,
  unlikeThread,
  updateThread,
} from "@/api/thread";
import { open } from "@/global/state/dialog/dialog-slice";
import { Post } from "@/types/thread";
import { ThreadTypes } from "@/validator/thread";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { toaster } from "@/components/ui/toaster";
import { openDelete } from "@/global/state/dialog/delete-dialog.slice";
import { setStatus } from "@/global/state/dialog/status-dialog.slice";

export const GetThreads = (setThreads: (a: Post[]) => void) => {
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

export const GetThreadId = (threadId: string) => {
  return useQuery({
    queryKey: ["THREADBYID"],
    queryFn: async () => {
      const response = await threadById(threadId);
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
};

export const CreateThreads = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["CREATETHREAD"],
    mutationFn: async (data: ThreadTypes) => {
      const response = await addThread(data);
      return response;
    },
    onSuccess: (data) => {
      toaster.success({ description: data.message });
      dispatch(open(false));
      queryClient.invalidateQueries({ queryKey: ["THREADS"] });
    },
    onError: (data) => {
      toaster.error({ description: data.message });
      dispatch(open(false));
      queryClient.invalidateQueries({ queryKey: ["THREADS"] });
    },
  });
};

export const UpdateThread = (threadId: string) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["CREATETHREAD"],
    mutationFn: async (data: ThreadTypes) => {
      const response = await updateThread(data, threadId);
      return response;
    },
    onSuccess: (data) => {
      toaster.success({ description: data.message });
      dispatch(open(false));
      dispatch(setStatus("add"));
      queryClient.invalidateQueries({ queryKey: ["THREADS"] });
    },
    onError: (data) => {
      toaster.error({ description: data.message });
      dispatch(open(false));
      queryClient.invalidateQueries({ queryKey: ["THREADS"] });
    },
  });
};

export const CreateLike = () => {
  return useMutation({
    mutationKey: ["CREATELIKE"],
    mutationFn: async (threadId: string) => {
      const response = await addThreadLike(threadId);
      return response;
    },
  });
};

export const DeleteLike = () => {
  return useMutation({
    mutationKey: ["DELETELIKE"],
    mutationFn: async (threadId: string) => {
      const response = await unlikeThread(threadId);
      return response;
    },
  });
};

export const DeleteThread = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation({
    mutationKey: ["DELETETHREAD"],
    mutationFn: async (threadId: string) => {
      const response = await deleteThread(threadId);
      return response;
    },
    onSuccess: (data) => {
      toaster.success({ description: data.message });
      dispatch(openDelete(false));
      queryClient.invalidateQueries({ queryKey: ["THREADS"] });
    },
    onError: (data) => {
      toaster.error({ description: data.message });
      queryClient.invalidateQueries({ queryKey: ["THREADS"] });
    },
  });
};
