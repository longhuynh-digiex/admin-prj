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

export const refreshAccessToken = async () => {
  const refreshToken = getRefreshTokenFromLocalStorage();

  if (!refreshToken) return null;

  try {
    const res = await axios.post<{
      accessToken: string;
      resfreshToken: string;
    }>(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
      refreshToken,
    });

    if (res.data.accessToken)
      localStorage.setItem("accessToken", res.data.accessToken);

    if (res.data.resfreshToken)
      localStorage.setItem("refreshToken", res.data.resfreshToken);

    return res.data.accessToken;
  } catch (error) {
    console.error("Refresh token failed", error);

    return null;
  }
};
