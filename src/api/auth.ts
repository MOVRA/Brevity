import { AxiosAppJson } from "@/lib/axios";
import { LoginResponse } from "@/types/auth";
import { LoginType, registerType } from "@/validator/auth";
import Cookies from "js-cookie";

export const login = async (credentials: LoginType): Promise<LoginResponse> => {
  const response = await AxiosAppJson.post("/session", credentials);
  return response.data;
};

export const register = async (data: registerType) => {
  const response = await AxiosAppJson.post("/register", data);
  return response.data;
};

export const isLoggedIn = (): boolean => {
  return !!Cookies.get("cookies");
};
