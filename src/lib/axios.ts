import axios, { AxiosError, AxiosInstance } from "axios";
import { isClient, refreshAccessToken } from "./utils";
import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "@/store";

const UNAUTHORIZED_STATUS_CODE = 401;
const TOKEN_REFRESH_IN_MINUTES = 8;
const baseURL = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_URL;

const clearAuthAndRedirect = () => {
  if (isClient) {
    const { clearAuth } = useAuthStore.getState();
    clearAuth();
    window.location.href = "/login";
  }
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    if (!isClient) return config;
    const { accessToken, refreshToken, setTokens } = useAuthStore.getState();

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
              const newTokens = await refreshAccessToken(refreshToken);

              if (!newTokens) throw new Error();
              const {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
              } = newTokens;
              config.headers.Authorization = `Bearer ${newAccessToken}`;
              setTokens(newAccessToken, newRefreshToken);
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
    const { refreshToken, setTokens } = useAuthStore.getState();

    if (
      error.response?.status === UNAUTHORIZED_STATUS_CODE &&
      originalRequest
    ) {
      try {
        const newTokens = await refreshAccessToken(refreshToken);

        if (newTokens) {
          setTokens(newTokens.accessToken, newTokens.refreshToken);

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
          }

          return axiosInstance(originalRequest);
        } else {
          clearAuthAndRedirect();
          return Promise.reject(error);
        }
      } catch (refreshError) {
        clearAuthAndRedirect();
        console.log({ refreshError });

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
