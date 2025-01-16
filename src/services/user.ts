import { Axios } from "@/lib/axios";

export const userMe = async () => {
  const response = await Axios.get("/users/me");
  return response.data;
};
