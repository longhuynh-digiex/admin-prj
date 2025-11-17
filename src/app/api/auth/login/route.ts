import { NEXT_PUBLIC_API_URL } from "@/constant/env.constant";
import { LoginRequestDTO } from "@/dtos/auth/auth.request.dto";
import { LoginResponseDTO } from "@/dtos/auth/auth.response.dto";
import { TUser } from "@/dtos/user/user.dto";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = (await request.json()) as LoginRequestDTO;
  const cookieStore = await cookies();
  try {
    const { data } = await axios.post<LoginResponseDTO>(
      `${NEXT_PUBLIC_API_URL}/auth/login`,
      body
    );

    const { accessToken, refreshToken } = data;
    const decodedAccessToken = jwtDecode(accessToken) as { exp: number };
    const decodedRefreshToken = jwtDecode(refreshToken) as { exp: number };
    cookieStore.set("accessToken", accessToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      expires: decodedAccessToken.exp * 1000,
    });
    cookieStore.set("refreshToken", refreshToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      expires: decodedRefreshToken.exp * 1000,
    });

    const { data: user } = await axios.get<TUser>(
      `${NEXT_PUBLIC_API_URL}/users/me`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log({ user });

    if (user.role) {
      cookieStore.set("role", user.role, {
        path: "/",
        httpOnly: false,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        expires: decodedRefreshToken.exp * 1000,
      });
    }

    return Response.json(data);
  } catch (error) {
    if (error) {
      return Response.json(error);
    } else {
      return Response.json(
        {
          message: "Error",
        },
        {
          status: 500,
        }
      );
    }
  }
}
