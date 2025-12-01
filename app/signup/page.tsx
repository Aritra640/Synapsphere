"use client";

import { useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function Signup() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function handlerSubmit(e: any) {
    e.preventDefault();
    const { data, error } = await authClient.signUp.email(
      {
        name: name,
        email: email,
        password: password,
        callbackURL: "/home/dashboard",
      },
      {
        onRequest: (ctx) => {
          
          console.log("signing up....");
        },
        onSuccess: (ctx) => {

          redirect('/home/dashboard');
        },
        onError: (ctx) => {
          console.log(ctx.error);
          alert(ctx.error.message);
        },
      },
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#070014] via-[#120227] to-black text-white px-6">
      <div className="w-full max-w-md bg-[#1b1b25]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent drop-shadow-lg">
          Create Your Account
        </h1>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full cursor-pointer px-4 py-3 rounded-lg bg-[#0f0f17] border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full cursor-pointer px-4 py-3 rounded-lg bg-[#0f0f17] border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full cursor-pointer px-4 py-3 rounded-lg bg-[#0f0f17] border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            onClick={handlerSubmit}
            className="w-full cursor-pointer bg-gradient-to-r from-purple-500 to-indigo-600 py-3 rounded-lg font-semibold hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-all"
          >
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="mx-3 text-gray-500 text-sm">or continue with</span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        {/* Google Button */}
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
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-purple-400 cursor-pointer hover:underline"
          >
            Log in
          </Link>
        </p>

        <div className="text-center mt-8">
          <Link
            href="/"
            className="text-gray-500 hover:text-gray-300 transition-all text-sm"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
