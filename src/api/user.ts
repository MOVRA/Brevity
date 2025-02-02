import { Axios, AxiosAppJson, AxiosFormData } from "@/lib/axios";
import { UserType } from "@/validator/user";

export const userMe = async () => {
  const response = await Axios.get("/users/me");
  return response.data;
};

export const users = async () => {
  const response = await Axios.get("/users");
  return response.data;
};

export const userById = async (userId: string | undefined) => {
  const response = await Axios.get(`/users/${userId}`);
  return response.data;
};

export const updateUserById = async (
  userId: string | undefined,
  data: UserType
) => {
  const response = await AxiosAppJson.patch(`/users/${userId}`, {
    name: data.name,
    username: data.username,
  });
  return response.data;
};

export const updateUserProfileById = async (
  userId: string | undefined,
  data: UserType
) => {
  const response = await AxiosFormData.patch(`/users/profile/${userId}`, {
    file: data.file,
    bio: data.bio,
  });
  return response.data;
};
