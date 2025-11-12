import axios, { AxiosError, AxiosInstance } from "axios";
import {
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  isClient,
  refreshAccessToken,
} from "./utils";
import { jwtDecode } from "jwt-decode";

const UNAUTHORIZED_STATUS_CODE = 401;
const TOKEN_REFRESH_IN_MINUTES = 8;
const baseURL = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_URL;

let isRefreshing = false;

const clearAuthAndRedirect = () => {
  if (isClient) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  }
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = getAccessTokenFromLocalStorage();
    const refreshToken = getRefreshTokenFromLocalStorage();

    if (accessToken) {
      try {
        const currentDate = Math.floor(Date.now() / 1000);
        const decodedAccessToken = jwtDecode(accessToken);

        if (!decodedAccessToken.exp) {
          config.headers.Authorization = `Bearer ${accessToken}`;
          return config;
        }

        const timeLeftMinutes = Math.floor(
          (decodedAccessToken.exp - currentDate) / 60
        );

        if (
          timeLeftMinutes >= 0 &&
          timeLeftMinutes <= TOKEN_REFRESH_IN_MINUTES
        ) {
          if (refreshToken) {
            try {
              console.log("Refreshingg");
              const newAccessToken = await refreshAccessToken();
              config.headers.Authorization = `Bearer ${newAccessToken}`;
            } catch (error) {
              console.error("Token refresh failed:", error);
              clearAuthAndRedirect();
              return Promise.reject(error);
            }
          } else {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
        } else {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      } catch (error) {
        console.error("Token validation error:", error);
        clearAuthAndRedirect();
        return Promise.reject(error);
      }
    }

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (
      error.response?.status === UNAUTHORIZED_STATUS_CODE &&
      originalRequest
    ) {
      isRefreshing = true;
      try {
        const newAccessToken = await refreshAccessToken();
        isRefreshing = false;

        if (newAccessToken) {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }
          return axiosInstance(originalRequest);
        } else {
          clearAuthAndRedirect();
          return Promise.reject(error);
        }
      } catch (refreshError) {
        clearAuthAndRedirect();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
