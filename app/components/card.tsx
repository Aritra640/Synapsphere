"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UpdateCardModal } from "@/app/components/updateCardModal";

interface CardProps {
  id: string;
  Type: "Youtube" | "Tweet" | "Text" | "PDF";
  Title: string;
  Content: string;
  CreatedAt: string;
}

export default function Card({
  id,
  Type,
  Title,
  Content,
  CreatedAt,
}: CardProps) {
  const router = useRouter();
  const [updateOpen, setUpdateOpen] = useState(false);
  const title = Title;

  const dateObj = new Date(CreatedAt);
  const date = dateObj.toISOString().split("T")[0];
  const time = dateObj.toISOString().split("T")[1].slice(0, 5);

  const handleDelete = async () => {
    try {
      const res = await fetch("/api/protected/cards", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (!res.ok) {
        const data = await res.json();
        console.log("Failed to delete card:", data);
        return;
      }

      router.refresh();
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  const renderPreview = () => {
    switch (Type) {
      case "Text":
        return <p className="text-gray-300 text-sm line-clamp-3">{Content}</p>;

      case "Youtube": {
        const videoId =
          Content.split("v=")[1]?.split("&")[0] || Content.split("/").pop();
        return (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            className="w-full h-56 rounded-lg border border-gray-700"
            loading="lazy"
            allowFullScreen
          />
        );
      }

      case "Tweet":
        return (
          <blockquote className="twitter-tweet">
            <a href={`https://twitter.com/user/status/${Content}`} />
          </blockquote>
        );

      case "PDF":
        return (
          <iframe
            src={Content}
            className="w-full h-56 rounded-lg border border-gray-700"
            loading="lazy"
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="relative bg-black  border border-gray-800 rounded-xl p-4 shadow-lg hover:shadow-gray-700 transition-shadow duration-300 w-full max-w-md">
        <div className="absolute top-3 right-3 flex space-x-3">
          <button aria-label="Preview" onClick={() => setUpdateOpen(true)}>
            <Eye className="w-4 h-4 cursor-pointer text-gray-400 hover:text-blue-400 transition" />
          </button>

          <button aria-label="Edit" onClick={() => setUpdateOpen(true)}>
            <Pencil className="w-4 h-4 cursor-pointer text-gray-400 hover:text-blue-400 transition" />
          </button>

          <button aria-label="Delete" onClick={handleDelete}>
            <Trash2 className="w-4 h-4 cursor-pointer text-gray-400 hover:text-red-400 transition" />
          </button>
        </div>

        <h3 className="text-white text-lg font-semibold mb-2 pr-12 line-clamp-1">
          {Title}
        </h3>

        <div className="mb-3">{renderPreview()}</div>

        <p className="text-gray-500 text-xs mt-2">
          {date} • {time}
        </p>
      </div>

      {updateOpen && (
        <UpdateCardModal
          id={id}
          initialTitle={Title}
          initialType={Type}
          initialContent={Content}
          onClose={() => setUpdateOpen(false)}
        />
      )}
    </>
  );
}
