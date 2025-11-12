import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isClient = typeof window !== "undefined";

export const getAccessTokenFromLocalStorage = () => {
  return isClient ? localStorage.getItem("accessToken") : null;
};

export const getRefreshTokenFromLocalStorage = () => {
  return isClient ? localStorage.getItem("refreshToken") : null;
};

export const normalizePath = (path: string) => {
  return path.startsWith("/") ? path.slice(1) : path;
};

export const refreshAccessToken = async (refreshToken: string | null) => {
  if (!refreshToken) return null;

  try {
    const res = await axios.post<{
      accessToken: string;
      refreshToken: string;
    }>(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
      refreshToken,
      expiresInMins: process.env.NEXT_PUBLIC_TOKEN_EXPIRE_IN_MINS,
    });

    if (!res.data.accessToken) return null;
    if (!res.data.refreshToken) return null;

    return res.data;
  } catch (error) {
    console.error("Refresh token failed", error);
    return null;
  }
};
