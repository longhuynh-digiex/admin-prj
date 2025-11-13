"use client";
import { Button } from "@/components/ui/button";
import { useGetMeQuery } from "@/queries/useAuth";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {
  const { data } = useGetMeQuery();
  console.log({
    data: data?.data,
  });

  return (
    <div className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
      <Button
        className='cursor-pointer'
        onClick={() => redirect("/login")}
      >
        Go to Login
      </Button>
    </div>
  );
}
