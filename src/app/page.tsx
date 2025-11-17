"use client";
import { Button } from "@/components/ui/button";
import { LOGIN_ROUTE } from "@/constant/route.constant";
import { useLogoutMutation } from "@/queries/useAuth";
import { useAuthStore } from "@/store";

import { redirect, useRouter } from "next/navigation";

export default function Home() {
  const logoutMutation = useLogoutMutation();
  const { accessToken, refreshToken, clearAuth } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutMutation.mutateAsync({
      accessToken: accessToken || undefined,
      refreshToken: refreshToken || undefined,
    });

    clearAuth();
    router.push("/login");
  };
  return (
    <div className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
      {!accessToken ? (
        <Button
          className='cursor-pointer'
          onClick={() => redirect(LOGIN_ROUTE)}
        >
          Go to Login
        </Button>
      ) : (
        <Button
          className='cursor-pointer'
          onClick={() => handleLogout()}
        >
          Logout
        </Button>
      )}
    </div>
  );
}
