import { Axios, AxiosAppJson, AxiosFormData } from "@/lib/axios";
import { ThreadTypes } from "@/validator/thread";

export const threads = async () => {
  const response = await Axios.get("/threads");
  return response.data;
};

export const addThread = async (data: ThreadTypes) => {
  const response = await AxiosFormData.post("/threads", data);
  return response.data;
};

export const addThreadLike = async (threadId: string) => {
  const response = await AxiosAppJson.post(`/likes/${threadId}`);
  return response.data;
};

export const unlikeThread = async (threadId: string) => {
  const response = await AxiosAppJson.delete(`/likes/${threadId}`);
  return response.data;
};

export const deleteThread = async (threadId: string) => {
  const response = await AxiosAppJson.delete(`/threads/${threadId}`);
  return response.data;
};
