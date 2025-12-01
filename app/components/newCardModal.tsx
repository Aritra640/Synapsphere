"use client";

import { Plus } from 'lucide-react';
import { useState } from "react";
import { useRouter } from "next/navigation";

export function NewCardModal() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("Text");
  const [fileName, setFileName] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [contentValue, setContentValue] = useState("");

  const router = useRouter(); // For refreshing dashboard after add

  const placeholderMap: Record<string, string> = {
    Text: "Enter text...",
    Youtube: "Enter YouTube video URL...",
    Tweet: "Enter Tweet URL...",
    pdf: "Upload PDF file...",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const actualContent = type === "pdf" ? fileName : contentValue;

    if (!titleValue || !actualContent) return;

    try {
      const res = await fetch("/api/protected/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: titleValue,
          content: actualContent,
          type,
        }),
      });

      if (!res.ok) return;

      // Smooth close and refresh without popup
      setOpen(false);
      setTitleValue("");
      setContentValue("");
      setFileName("");
      setType("Text");

      router.refresh(); // refresh dashboard instantly

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 flex justify-start gap-2 cursor-pointer bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm font-medium transition"
      >
        <Plus />
        <>Add</>
      </button>

      {open && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-gray-900 rounded-lg shadow-xl p-6 w-96 text-white relative animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4">Create New Card</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 cursor-pointer rounded-md bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none"
                  placeholder="Enter title"
                  value={titleValue}
                  onChange={(e) => setTitleValue(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">Type</label>
                <div className="relative">
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full cursor-pointer px-3 py-2 appearance-none rounded-md bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none transition"
                  >
                    <option value="Text">Text</option>
                    <option value="Youtube">YouTube</option>
                    <option value="Tweet">Tweet</option>
                    <option value="pdf">PDF</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    ▼
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">Content</label>

                {type === "pdf" ? (
                  <label className="block w-full">
                    <div className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-400 cursor-pointer text-sm flex items-center justify-between">
                      <span>{fileName ? fileName : "Upload PDF file..."}</span>
                      <span className="text-purple-400 font-medium">
                        {fileName ? "Change" : "Browse"}
                      </span>
                    </div>
                    <input
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setFileName(file.name);
                      }}
                    />
                  </label>
                ) : (
                  <textarea
                    rows={4}
                    className="w-full cursor-pointer px-3 py-2 rounded-md bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none"
                    placeholder={placeholderMap[type]}
                    value={contentValue}
                    onChange={(e) => setContentValue(e.target.value)}
                  />
                )}
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md transition"
              >
                Create Card
              </button>
            </form>

          </div>
        </div>
      )}
    </>
  );
}

