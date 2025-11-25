"use client";

import { useState } from "react";
import { SendHorizontal } from "lucide-react";

export default function ChatPage() {
  const [messages, setMessages] = useState<{ sender: "user" | "ai"; text: string }[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    setInput("");

    // Placeholder AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "AI will soon respond with intelligent insights 🌟" },
      ]);
    }, 800);
  };

  return (
    <main className="flex flex-col h-screen bg-gradient-to-b from-[#0A0014] via-[#110226] to-black text-white">
      {/* Header */}
      <header className="px-6 py-4 border-b border-white/10 backdrop-blur-md bg-[#171721]/70 shadow-md">
        <h1 className="text-xl font-semibold">Chat with AI</h1>
        <p className="text-gray-400 text-sm">Ask questions, explore ideas, and think with SynapSphere 🤖</p>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm shadow-lg backdrop-blur-md border 
              ${
                msg.sender === "user"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 border-white/10"
                  : "bg-[#1e1e2a]/80 border-white/10"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {messages.length === 0 && (
          <div className="text-center text-gray-500 pt-20 text-sm">
            Start a conversation — your AI is waiting 👇
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/10 backdrop-blur-lg bg-[#171721]/80">
        <div className="flex items-center gap-3 max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 bg-[#1e1e2a]/80 border border-white/10 rounded-xl 
                       focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm text-gray-200"
          />
          <button
            onClick={handleSend}
            className="p-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600
                       hover:shadow-[0_0_15px_rgba(168,85,247,0.6)] transition-all"
          >
            <SendHorizontal size={18} />
          </button>
        </div>
      </div>
    </main>
  );
}


