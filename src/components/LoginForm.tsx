"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "./ui/button";
import { useLoginMutation } from "@/queries/useAuth";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { LoginRequestSchema } from "@/dtos/auth/auth.request.dto";
import { useAuthStore } from "@/store";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const loginMutation = useLoginMutation();
  const { setTokens } = useAuthStore.getState();
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginRequestSchema>>({
    resolver: zodResolver(LoginRequestSchema),
    defaultValues: {
      username: "emilys",
      password: "emilyspass",
    },
  });
  const onSubmit = async (data: z.infer<typeof LoginRequestSchema>) => {
    try {
      console.log({ data });
      const res = await loginMutation.mutateAsync(data);
      toast.success("Login successfully", {
        description: `Welcome ${res.data.username}`,
      });
      setTokens(res.data.accessToken, res.data.refreshToken);

      router.push("/dashboard");
    } catch (error: any) {
      console.log({ error });

      form.setError("root", {
        message: error.response?.data?.message || "hehe",
      });
    }
  };
  return (
    <div
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id='login-form'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FieldGroup>
              <Controller
                name='username'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='form-rhf-demo-title'>
                      Username
                    </FieldLabel>
                    <Input
                      {...field}
                      id='form-rhf-demo-title'
                      aria-invalid={fieldState.invalid}
                      placeholder='User name'
                      autoComplete='off'
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name='password'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='form-rhf-demo-description'>
                      Password
                    </FieldLabel>
                    <Input
                      id='password'
                      placeholder='password'
                      {...field}
                      type='password'
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <div>
                <p className='text-red-500 text-sm mt-2'>
                  {form.formState.errors.root &&
                    form.formState.errors.root.message}
                </p>
              </div>
            </FieldGroup>
            <Button
              type='submit'
              form='login-form'
              className='mt-8 cursor-pointer w-full'
              disabled={loginMutation.isPending}
              variant={loginMutation.isPending ? "secondary" : "default"}
            >
              {loginMutation.isPending && (
                <LoaderCircle className='animate-spin' />
              )}{" "}
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
