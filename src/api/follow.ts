import { Axios } from "@/lib/axios";

export const follow = async (userId: string | undefined) => {
  const response = await Axios.get(`/follows/${userId}`);
  return response.data;
};

export const followUser = async (userId: string | undefined) => {
  const response = await Axios.post(`/follows/${userId}`);
  return response.data;
};

export const unfollowUser = async (userId: string | undefined) => {
  const response = await Axios.delete(`/follows/${userId}`);
  return response.data;
};
