/* eslint-disable @typescript-eslint/no-explicit-any */

import { useAuthStore } from "@/store";
import { isClient, refreshAccessToken } from "@/utils/utils";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosResponseHeaders,
  HttpStatusCode,
  InternalAxiosRequestConfig,
  RawAxiosResponseHeaders,
} from "axios";
import { jwtDecode } from "jwt-decode";

export interface HttpResult<T> {
  isSuccess: boolean;
  status: HttpStatusCode;
  statusText: string;
  data: T;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
  config: AxiosRequestConfig;
  error?: unknown;
  errorCode?: string;
  errors?: {
    code?: string;
    description?: string;
    type?: number;
  }[];
}

export enum HttpServiceError {
  ApiError = "API_ERROR",
  NoResponse = "NO_RESPONSE",
  RequestError = "REQUEST_ERROR",
}

const clearAuthAndRedirect = () => {
  if (isClient) {
    const { clearAuth } = useAuthStore.getState();
    clearAuth();
    window.location.href = "/login";
  }
};

export class HttpService {
  private client: AxiosInstance;

  private requestHandler = (
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig => {
    return config;
  };

  private requestTokenHandler = async (config: InternalAxiosRequestConfig) => {
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
          timeLeftMinutes <=
            Number(process.env.NEXT_PUBLIC_TOKEN_REFRESH_IN_MINUTES)
        ) {
          if (refreshToken) {
            try {
              console.log("Refreshingg");
              const newTokens = await refreshAccessToken(refreshToken);

              if (!newTokens) throw new AxiosError();
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

      if (config.data instanceof FormData) {
        config.headers["Content-Type"] = "multipart/form-data";
      }
    }
    return config;
  };

  private responseHandler = (response: AxiosResponse) => {
    return {
      isSuccess: response.status < 300,
      ...response,
    };
  };
  private errorHandler = (error: AxiosError<any>) => {
    if (error.response) {
      if (error.response.status === HttpStatusCode.Unauthorized) {
        clearAuthAndRedirect();

        return {
          isSuccess: false,
          status: error.response.status,
          statusText: error.response?.data?.message ?? "Token expire",
          headers: error.response.headers,
          data: null,
          config: error.response.config,
          error: error.response.data,
          errorCode: HttpServiceError.ApiError,
        };
      }

      return {
        isSuccess: false,
        status: error.response.status,
        statusText: error.response.data?.message ?? error.response.statusText,
        headers: error.response.headers,
        data: null,
        config: error.response.config,
        error: error.response.data,
        errorCode: HttpServiceError.ApiError,
      };
    }
  };
  constructor(baseURL?: string, skipToken?: boolean) {
    const finalUrl = baseURL ? baseURL : process.env.NEXT_PUBLIC_API_URL;
    this.client = axios.create({
      baseURL: finalUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (skipToken) {
      this.client.interceptors.request.use(this.requestHandler);
    } else {
      this.client.interceptors.request.use(this.requestTokenHandler);
    }

    this.client.interceptors.response.use(
      this.responseHandler,
      this.errorHandler
    );
  }

  get<T>(url: string, configs?: AxiosRequestConfig) {
    const promise = this.client.get(url, configs) as Promise<HttpResult<T>>;
    return promise;
  }

  public post<TData, TResponse>(
    url: string,
    data: TData,
    configs?: AxiosRequestConfig
  ): Promise<HttpResult<TResponse>> {
    const promise = this.client.post(url, data, configs) as Promise<
      HttpResult<TResponse>
    >;

    return promise;
  }

  put<TData, TResponse>(
    url: string,
    data: TData,
    configs?: AxiosRequestConfig
  ): Promise<HttpResult<TResponse>> {
    const promise = this.client.put(url, data, configs) as Promise<
      HttpResult<TResponse>
    >;

    return promise;
  }

  patch<TData, TResponse>(
    url: string,
    data: TData,
    configs?: AxiosRequestConfig
  ): Promise<HttpResult<TResponse>> {
    const promise = this.client.patch(url, data, configs) as Promise<
      HttpResult<TResponse>
    >;

    return promise;
  }

  delete<T>(url: string, configs?: AxiosRequestConfig): Promise<HttpResult<T>> {
    const promise = this.client.delete(url, configs) as Promise<HttpResult<T>>;

    return promise;
  }
}

export const HttpServiceV2 = new HttpService();
