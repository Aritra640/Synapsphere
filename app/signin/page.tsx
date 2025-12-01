"use client";

import { useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";

export default function Signin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

 
  async function handleSignin(e: any) {
    e.preventDefault();

    const { data, error } = await authClient.signIn.email(
      {
        email: email,
        password: password,
        rememberMe: true,
        callbackURL: "/home/dashboard",
      },
      {
        onSuccess: () => {
          // redirect("/dashboard");
          console.log("signin successfull!");
        },

        onError: (ctx) => {
          alert(ctx.error.message);
        },
      },
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#070014] via-[#120227] to-black text-white px-6">
      <div className="w-full max-w-md bg-[#1b1b25]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent drop-shadow-lg">
          Welcome Back
        </h1>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 cursor-pointer py-3 rounded-lg bg-[#0f0f17] border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium text-gray-300">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-purple-400 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 cursor-pointer rounded-lg bg-[#0f0f17] border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            onClick={handleSignin}
            className="w-full cursor-pointer bg-gradient-to-r from-purple-500 to-indigo-600 py-3 rounded-lg font-semibold hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-all"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="mx-3 text-gray-500 text-sm">or continue with</span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        <button
          type="button"
          className="w-full cursor-pointer flex items-center justify-center gap-3 py-3 bg-[#0f0f17] border border-white/10 rounded-lg hover:bg-[#181824] hover:shadow-[0_0_15px_rgba(255,255,255,0.08)] transition-all"
        >
          <FcGoogle size={22} />
          <span className="text-gray-300 font-medium">
            Continue with Google
          </span>
        </button>

        <p className="text-center text-gray-400 text-sm mt-6">
          Do not have an account?{" "}
          <Link
            href="/signup"
            className="text-purple-400 cursor-pointer hover:underline"
          >
            Sign up
          </Link>
        </p>

        <div className="text-center mt-8">
          <Link
            href="/"
            className="text-gray-500 cursor-pointer hover:text-gray-300 transition-all text-sm"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
