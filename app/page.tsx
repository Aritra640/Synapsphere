"use client";

import { motion } from "framer-motion";
import { ArrowRight, Brain, Youtube, Twitter, FileText } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0A021A] via-[#14052D] to-black text-white">
      <section className="flex flex-col items-center justify-center text-center pt-36 pb-28 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-6xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent"
        >
          SynapSphere
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-6 max-w-2xl text-lg md:text-xl text-gray-300 leading-relaxed"
        >
          Your AI-powered second brain. Save your ideas, tweets, notes, and
          videos — then ask deep questions across everything you’ve captured.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-10"
        >
          <Link
            href="/dashboard"
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 px-7 py-3 rounded-full text-lg font-semibold hover:shadow-[0_0_20px_2px_rgba(168,85,247,0.6)] transition-all"
          >
            Enter SynapSphere <ArrowRight size={20} />
          </Link>
        </motion.div>
      </section>

      <section className="px-6 md:px-20 py-16 grid md:grid-cols-3 gap-10">
        {[
          {
            icon: <Brain className="w-12 h-12 mb-6 text-purple-400" />,
            title: "Store Anything",
            text: "Capture text, ideas, tweets, YouTube videos, references, and research — all in one unified knowledge sphere.",
          },
          {
            icon: <FileText className="w-12 h-12 mb-6 text-blue-400" />,
            title: "Structured Notes",
            text: "Organize your knowledge with clean, lightning-fast note-taking tailored for thinking, not typing.",
          },
          {
            icon: <Brain className="w-12 h-12 mb-6 text-green-400" />,
            title: "Ask AI Anything",
            text: "Query your entire knowledge base with intelligent, context-aware AI powered by embeddings + retrieval.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.04 }}
            className="bg-[#1b1b25]/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl hover:shadow-purple-500/20 transition-all"
          >
            {item.icon}
            <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
            <p className="text-gray-400">{item.text}</p>
          </motion.div>
        ))}
      </section>

      <section className="py-20 bg-[#0D0A1A] px-6 md:px-20">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
          What SynapSphere Understands
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: (
                <Twitter className="w-12 h-12 mx-auto mb-4 text-sky-400" />
              ),
              title: "Tweets",
              text: "Save threads or tweets and ask AI to summarize or analyze them.",
            },
            {
              icon: (
                <Youtube className="w-12 h-12 mx-auto mb-4 text-red-500" />
              ),
              title: "YouTube Videos",
              text: "Automatically extract transcripts and insights from videos.",
            },
            {
              icon: (
                <FileText className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
              ),
              title: "Notes & Text",
              text: "Write notes, save articles, or store ideas effortlessly.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.04 }}
              className="p-8 bg-[#1b1b25]/80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-purple-500/20 border border-white/10 text-center transition-all"
            >
              {item.icon}
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-400 mt-2">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="text-center py-10 text-gray-500 border-t border-white/10 mt-10">
        © {new Date().getFullYear()} SynapSphere — Your Second Brain.
      </footer>
    </main>
  );
}

