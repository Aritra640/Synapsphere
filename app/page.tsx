"use client";

import { motion } from "framer-motion";
import { ArrowRight, Brain, Youtube, Twitter, FileText } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center pt-32 pb-20 px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-6xl font-bold tracking-tight"
        >
          SynapSphere
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 max-w-2xl text-xl text-gray-300 leading-relaxed"
        >
          Your AI-powered second brain. Save your ideas, tweets, notes, and
          videos — then ask deep questions across everything you’ve captured.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10"
        >
          <Link
            href="/dashboard"
            className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-200 transition"
          >
            Enter SynapSphere <ArrowRight size={20} />
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="px-6 md:px-20 py-20 grid md:grid-cols-3 gap-10">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-zinc-900 rounded-2xl p-8 shadow-xl"
        >
          <Brain className="w-12 h-12 mb-6 text-purple-400" />
          <h3 className="text-2xl font-semibold mb-3">Store Anything</h3>
          <p className="text-gray-400">
            Capture text, ideas, tweets, YouTube videos, references, and
            research — all in one unified knowledge sphere.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-zinc-900 rounded-2xl p-8 shadow-xl"
        >
          <FileText className="w-12 h-12 mb-6 text-blue-400" />
          <h3 className="text-2xl font-semibold mb-3">Structured Notes</h3>
          <p className="text-gray-400">
            Organize your knowledge with clean, lightning-fast note-taking
            tailored for thinking, not typing.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-zinc-900 rounded-2xl p-8 shadow-xl"
        >
          <Brain className="w-12 h-12 mb-6 text-green-400" />
          <h3 className="text-2xl font-semibold mb-3">Ask AI Anything</h3>
          <p className="text-gray-400">
            Query your entire knowledge base with intelligent, context-aware
            AI powered by embeddings + retrieval.
          </p>
        </motion.div>
      </section>

      {/* Supported Content Types */}
      <section className="py-20 bg-zinc-950 px-6 md:px-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          What SynapSphere Understands
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-8 bg-zinc-900 rounded-2xl shadow-lg text-center"
          >
            <Twitter className="w-12 h-12 mx-auto mb-4 text-sky-400" />
            <h3 className="text-xl font-semibold">Tweets</h3>
            <p className="text-gray-400 mt-2">
              Save threads or tweets and ask AI to summarize or analyze them.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-8 bg-zinc-900 rounded-2xl shadow-lg text-center"
          >
            <Youtube className="w-12 h-12 mx-auto mb-4 text-red-500" />
            <h3 className="text-xl font-semibold">YouTube Videos</h3>
            <p className="text-gray-400 mt-2">
              Automatically extract transcript + insights from videos.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-8 bg-zinc-900 rounded-2xl shadow-lg text-center"
          >
            <FileText className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
            <h3 className="text-xl font-semibold">Notes & Text</h3>
            <p className="text-gray-400 mt-2">
              Write notes, save articles, or store ideas effortlessly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-10 text-gray-500">
        © {new Date().getFullYear()} SynapSphere — Your Second Brain.
      </footer>
    </main>
  );
}

