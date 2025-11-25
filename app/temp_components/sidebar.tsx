"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Signout from "../components/signout";
import { MessageCircle } from "lucide-react";

const sidebarLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Notes", href: "/notes" },
  { label: "Connections", href: "/connections" },
  { label: "Knowledge Graph", href: "/preview" },
  { label: "Settings", href: "/settings" },
];

export default function Sidebar({ user }: { user: any }) {
  const pathname = usePathname();

  return (
    <aside className="w-72 h-screen bg-[#171721]/90 backdrop-blur-xl flex flex-col border-r border-white/10 shadow-xl">
      <br />
      <br />

      {/* User Profile */}
      <div className="px-6 mb-8">
        <div className="flex items-center gap-4 p-4 rounded-xl bg-[#1e1e2a]/70 border border-white/10 shadow-inner">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center font-semibold shadow-lg">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <div className="text-sm">
            <div className="font-medium text-gray-100">{user.name}</div>
            <div className="text-gray-400 text-xs">{user.email}</div>
          </div>
        </div>
      </div>

      <br />

      {/* Nav Links */}
      <nav className="flex-grow px-4 space-y-1">
        {sidebarLinks.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
                  : "text-gray-300 hover:bg-[#2a2a39]/80 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Link
        href="/chat"
        className="w-full flex items-center justify-center gap-2 px-3 py-2 
             rounded-lg text-sm font-medium bg-gradient-to-r 
             from-purple-600 to-indigo-600 text-white shadow-md 
             hover:shadow-lg hover:scale-[1.02] transition-all duration-200 mb-4"
      >
        💬 Chat with AI
      </Link>

      {/* Signout & Footer */}
      <div className="px-6 pb-8 flex flex-col items-center mt-2">
        <Signout />
        <p className="text-xs text-gray-500 mt-6 text-center">
          © SynapSphere 2025
        </p>
      </div>
    </aside>
  );
}
