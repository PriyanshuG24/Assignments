// src/components/auth/register-form.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/hooks/useAuth"
import { Mail, Lock, Eye, EyeOff,User,Home } from "lucide-react"

const registerSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function SignUpForm() {
  const router = useRouter();
  const {signup,loading:isLoading}=useAuth()
  const [showPass,setShowPass]=useState(false)

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    await signup(values)
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-sky-300 via-sky-200" />
      <div className="w-full max-w-md">
        <div className="rounded-[28px] bg-white/70 backdrop-blur-xl shadow-[0_20px_60px_rgba(15,23,42,0.15)] ring-1 ring-black/5 px-6 sm:px-8 py-10 bg-gradient-to-b from-sky-200 via-sky-100 to-white">
          <div className="flex justify-center">
            <div className="h-12 w-12 rounded-2xl bg-white shadow-md ring-1 ring-black/5 grid place-items-center">
              <Link href="/" className="font-medium text-slate-800">
              <Home className="h-5 w-5 text-blue-400 hover:text-blue-700" />
              </Link>
            </div>
          </div>
          <div className="mt-6 text-center">
            <h2 className="text-2xl sm:text-[28px] font-semibold tracking-tight text-slate-900">
              Sign Up Here 
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Make a new doc to bring your words, data,
              <br className="hidden sm:block" /> and teams together. For free
            </p>
          </div>
          <div className="mt-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input
                            type="text"
                            placeholder="Username"
                            disabled={isLoading}
                            className="h-12 rounded-2xl bg-slate-100/80 border-0 pl-11 pr-4 text-slate-900 placeholder:text-slate-400 ring-1 ring-black/5 focus-visible:ring-2 focus-visible:ring-slate-300"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input
                            type="email"
                            placeholder="Email"
                            disabled={isLoading}
                            className="h-12 rounded-2xl bg-slate-100/80 border-0 pl-11 pr-4 text-slate-900 placeholder:text-slate-400 ring-1 ring-black/5 focus-visible:ring-2 focus-visible:ring-slate-300"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />

                          <Input
                            type={showPass ? "text" : "password"}
                            placeholder="Password"
                            disabled={isLoading}
                            className="h-12 rounded-2xl bg-slate-100/80 border-0 pl-11 pr-12 text-slate-900 placeholder:text-slate-400 ring-1 ring-black/5 focus-visible:ring-2 focus-visible:ring-slate-300"
                            {...field}
                          />

                          <button
                            type="button"
                            onClick={() => setShowPass((p) => !p)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            aria-label={showPass ? "Hide password" : "Show password"}
                          >
                            {showPass ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-12 w-full rounded-2xl bg-gradient-to-b from-slate-700 to-slate-950 text-white  hover:text-sky-400"
                >
                  Signup 
                </Button>
                <p className="pt-4 text-center text-sm text-slate-500">
                  Do have an account?{" "}
                  <Link href="/signin" className="font-medium text-slate-800 hover:underline">
                    Signin
                  </Link>
                </p>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
