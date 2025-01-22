import { Axios } from "@/lib/axios";

export const userMe = async () => {
  const response = await Axios.get("/users/me");
  return response.data;
};

export const users = async () => {
  const response = await Axios.get("/users");
  return response.data;
};
