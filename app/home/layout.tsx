import React from "react";
import Sidebar from "../components/sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({ children }: {children: React.ReactNode}) {

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if(!session) {
    redirect("/Unauthorized");
  }

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      <Sidebar />
      <main className="flex-1 md:ml-64 p-6">{children}</main>
    </div>
  );
}
