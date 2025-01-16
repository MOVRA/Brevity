import { Axios } from "@/lib/axios";

export const threads = async () => {
  const response = await Axios.get("/threads");
  return response.data;
};
