import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Sidebar from "../temp_components/sidebar";
import DashboardContent from "../temp_components/dashboard_component";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-400 bg-black">
        Not authenticated!
      </div>
    );
  }

  const user = session.user;

  return (
    <main className="min-h-screen flex bg-gradient-to-br from-[#0A0014] via-[#110226] to-black text-white">
      {/* Sidebar (Client Component) */}
      <Sidebar user={user} />

      {/* Main Content */}
      <section className="flex-grow px-14 py-16">
        <div className="max-w-3xl mb-10">
          <h2 className="text-4xl font-bold mb-4 leading-tight">
            Welcome back,{" "}
            <span className="text-purple-400">{user.name}</span> 👋
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
            This is your intelligent personal workspace — soon you’ll connect
            ideas, upload knowledge, and chat with your second brain.
          </p>
        </div>

        {/* 🚀 Working Dashboard Component */}
        <DashboardContent />
      </section>
    </main>
  );
}

