"use client";

import { useState } from "react";

interface UpdateCardModalProps {
  id: string;
  initialTitle: string;
  initialType: string;
  initialContent: string;
  onClose: () => void;
}

export function UpdateCardModal({
  id,
  initialTitle,
  initialType,
  initialContent,
  onClose,
}: UpdateCardModalProps) {
  const [title, setTitle] = useState(initialTitle);
  const [type, setType] = useState(initialType);
  const [content, setContent] = useState(initialContent);
  const [fileName, setFileName] = useState(
    initialType === "pdf" ? initialContent : ""
  );

  const placeholderMap: Record<string, string> = {
    Text: "Enter text...",
    Youtube: "Enter YouTube video URL...",
    Tweet: "Enter Tweet URL...",
    pdf: "Upload PDF file...",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const actualContent = type === "pdf" ? fileName : content;

    if (!title || !actualContent) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const res = await fetch("/api/protected/cards", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          title,
          content: actualContent,
          type,
        }),
      });

      if (!res.ok) {
        alert("Failed to update card");
        return;
      }

      onClose(); // close modal
      location.reload(); // reload dashboard
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 rounded-lg shadow-xl p-6 w-96 text-white relative animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4">Update Card</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none"
              placeholder="Enter title"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Type</label>
            <div className="relative">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full cursor-pointer px-3 py-2 rounded-md bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none"
              >
                <option value="Text">Text</option>
                <option value="Youtube">YouTube</option>
                <option value="Tweet">Tweet</option>
                <option value="pdf">PDF</option>
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
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
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none"
                placeholder={placeholderMap[type]}
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md transition"
          >
            Update Card
          </button>
        </form>
      </div>
    </div>
  );
}

