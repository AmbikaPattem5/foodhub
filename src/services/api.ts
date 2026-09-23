import axios, { type InternalAxiosRequestConfig } from "axios";
import { loadingService } from "./loadingService";

// Augment AxiosRequestConfig to support skipLoading flag
declare module "axios" {
  export interface AxiosRequestConfig {
    skipLoading?: boolean;
  }
}

const api = axios.create({
  baseURL: "https://foodhub-backend-e2v1.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Request interceptor: start loading before request is sent
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (!config.skipLoading) {
      loadingService.start();
    }
    return config;
  },
  (error) => {
    loadingService.stop();
    return Promise.reject(error);
  }
);

// Response interceptor: stop loading after response or error
api.interceptors.response.use(
  (response) => {
    if (!response.config?.skipLoading) {
      loadingService.stop();
    }
    return response;
  },
  (error) => {
    if (!error.config?.skipLoading) {
      loadingService.stop();
    }
    return Promise.reject(error);
  }
);

export default api;