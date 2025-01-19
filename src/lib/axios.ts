import axios from "axios";
import Cookies from "js-cookie";

export const AxiosAuth = axios.create({
  baseURL: "https://brevity-api-production.up.railway.app/brevity/api",
  headers: {
    "Content-Type": "application/JSON",
  },
});

export const AxiosFormData = axios.create({
  baseURL: "https://brevity-api-production.up.railway.app/brevity/api",
});

AxiosFormData.interceptors.request.use((config) => {
  const token = Cookies.get("cookies");
  if (token) {
    config.headers["Content-Type"] = "multipart/form-data";
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const AxiosAppJson = axios.create({
  baseURL: "https://brevity-api-production.up.railway.app/brevity/api",
});

AxiosAppJson.interceptors.request.use((config) => {
  const token = Cookies.get("cookies");
  if (token) {
    config.headers["Content-Type"] = "application/JSON";
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const Axios = axios.create({
  baseURL: "https://brevity-api-production.up.railway.app/brevity/api",
});

Axios.interceptors.request.use((config) => {
  const token = Cookies.get("cookies");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
