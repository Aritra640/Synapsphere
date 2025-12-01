"use client";

import { useState } from "react";
import { Home, Share2, MessageSquare, Brain, Menu, X } from "lucide-react";
import Signout from "./signout";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import ScrollerLoader from "./scroller";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Dashboard");
  const router = useRouter();

  const { data: session, isPending, error, refetch } = authClient.useSession();

  if (isPending) {
    <ScrollerLoader />;
  }

  if (error || !session) {
    console.log(error);
    return (
      <div className="w-full h-full flex items-center justify-center text-red-400">
        Something went wrong!
      </div>
    );
  }

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="md:hidden fixed top-4 cursor-pointer left-4 z-50 bg-gray-800 p-2 rounded-md"
        >
          <Menu className="text-white" size={22} />
        </button>
      )}

      <div
        className={`
          bg-gradient-to-b from-[#1c1125] to-gray-900
          border-r border-gray-800 w-64 p-6
          flex flex-col
          transition-transform duration-300 z-40

          md:fixed md:inset-y-0 md:left-0 md:h-screen
          fixed inset-y-0 left-0
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {open && (
          <button
            onClick={() => setOpen(false)}
            className="md:hidden absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-white"
          >
            <X size={22} />
          </button>
        )}

        <div className="w-20 h-20 rounded-full bg-gray-700 mx-auto mb-3 mt-10 md:mt-0"></div>

        <p className="text-white text-lg font-semibold text-center mb-6">
          {session.user.name}
        </p>

        <br />

        <nav className="w-full space-y-2 flex-1">
          <NavItem
            path="/home/dashboard"
            icon={<Home size={18} />}
            label="Dashboard"
            active={active}
            setActive={setActive}
            router={router}
          />
          <NavItem
            path="/home/mindgraph"
            icon={<Brain size={18} />}
            label="Mind Graph"
            active={active}
            setActive={setActive}
            router={router}
          />
          <NavItem
            icon={<MessageSquare size={18} />}
            label="Chat"
            active={active}
            setActive={setActive}
            path="/home/chat"
            router={router}
          />
          <NavItem
            icon={<Share2 size={18} />}
            label="Share"
            active={active}
            setActive={setActive}
            path="/home/share"
            router={router}
          />
        </nav>

        <div className="mt-auto pt-4 border-t border-gray-800 flex justify-center items-center">
          <Signout />
        </div>
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/70 z-30 md:hidden"
        ></div>
      )}
    </>
  );
}

function NavItem({ icon, label, active, setActive, path, router }: any) {
  const isActive = active === label;

  const handleClick = () => {
    setActive(label);
    router.push(path);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        w-full flex items-center cursor-pointer pt-2 space-x-3 px-4 py-2 rounded-md text-sm font-medium transition
        ${
          isActive
            ? "bg-purple-600 text-white"
            : "text-gray-300 hover:bg-purple-900 hover:text-white"
        }
      `}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
