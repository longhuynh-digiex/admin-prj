import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import {
  ADMIN_ROUTES,
  AUTH_PATHS,
  MODERATOR_ROUTES,
  PRIVATE_PATHS,
} from "./constant/route.constant";
import { getDefaultPathByRole } from "./utils/utils";
import { ROLES } from "./constant/roles.constant";

export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken");
  const role = cookieStore.get("role");
  const pathName = request.nextUrl.pathname;

  if (
    PRIVATE_PATHS.some((path) => pathName.startsWith(path)) &&
    !refreshToken
  ) {
    console.log("not login");

    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    AUTH_PATHS.some((path) => pathName.startsWith(path)) &&
    refreshToken &&
    role
  ) {
    return NextResponse.redirect(
      new URL(getDefaultPathByRole(role.value), request.url)
    );
  }

  if (
    ADMIN_ROUTES.some((path) => pathName.startsWith(path)) &&
    role &&
    role.value !== ROLES.Admin
  ) {
    return NextResponse.redirect(
      new URL(getDefaultPathByRole(role.value), request.url)
    );
  }

  if (
    MODERATOR_ROUTES.some((path) => pathName.startsWith(path)) &&
    role &&
    role.value !== ROLES.Moderator
  ) {
    return NextResponse.redirect(
      new URL(getDefaultPathByRole(role.value), request.url)
    );
  }
  return NextResponse.next();
}
