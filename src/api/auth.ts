import { AxiosAppJson } from "@/lib/axios";
import { LoginResponse } from "@/types/auth";
import {
  LoginType,
  NotifType,
  PasswordType,
  registerType,
} from "@/validator/auth";
import Cookies from "js-cookie";

export const login = async (credentials: LoginType): Promise<LoginResponse> => {
  const response = await AxiosAppJson.post("/session", credentials);
  return response.data;
};

export const register = async (data: registerType) => {
  const response = await AxiosAppJson.post("/register", data);
  return response.data;
};

export const updatePassword = async (
  data: PasswordType,
  userId: string | undefined
) => {
  const response = await AxiosAppJson.post(`/users/password/${userId}`, data);
  return response.data;
};

export const sendNotif = async (data: NotifType) => {
  const response = await AxiosAppJson.post(`/notification/password`, data);
  return response.data;
};

export const isLoggedIn = (): boolean => {
  return !!Cookies.get("cookies");
};
