import {
  NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_TOKEN_EXPIRE_IN_MINS,
} from "@/constant/env.constant";
import { ROLES } from "@/constant/roles.constant";
import {
  DEFAULT_PATH_ADMIN,
  DEFAULT_PATH_MODERATOR,
  DEFAULT_PATH_USER,
} from "@/constant/route.constant";
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
    }>(`${NEXT_PUBLIC_API_URL}/auth/refresh`, {
      refreshToken,
      expiresInMins: NEXT_PUBLIC_TOKEN_EXPIRE_IN_MINS,
    });

    if (!res.data.accessToken) return null;

    if (!res.data.refreshToken) return null;

    return res.data;
  } catch (error) {
    console.error("Refresh token failed", error);
    return null;
  }
};

export const getRouteByRole = (role?: string | undefined) => {
  switch (role) {
    case ROLES.Admin:
      return "/dashboard/admin";

    default:
      return "/";
  }
};

export const getGrowthPercentage = (
  thisMonthUsers: number,
  lastMonthUsers: number
) => {
  return Math.abs(
    ((thisMonthUsers - lastMonthUsers) / lastMonthUsers) * 100
  ).toFixed(2);
};

export const getDefaultPathByRole = (role: string) => {
  switch (role) {
    case ROLES.Admin:
      return DEFAULT_PATH_ADMIN;
    case ROLES.Moderator:
      return DEFAULT_PATH_MODERATOR;
    case ROLES.User:
      return DEFAULT_PATH_USER;

    default:
      return "/";
  }
};
