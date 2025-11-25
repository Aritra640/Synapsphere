"use client";

import { useState } from "react";
import { Trash2, Plus, X } from "lucide-react";

type Card = {
  id: number;
  title: string;
  type: "text" | "youtube" | "pdf";
  content: string;
};

export default function DashboardContent() {
  const [cards, setCards] = useState<Card[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newCard, setNewCard] = useState<Partial<Card>>({
    title: "",
    type: "text",
    content: "",
  });

  const addCard = () => {
    if (!newCard.title || !newCard.content) return;
    setCards([
      ...cards,
      {
        id: Date.now(),
        title: newCard.title!,
        type: newCard.type as Card["type"],
        content: newCard.content!,
      },
    ]);
    setShowModal(false);
    setNewCard({ title: "", type: "text", content: "" });
  };

  const deleteCard = (id: number) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  return (
    <div className="max-w-5xl">
      {/* Header Area */}
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-semibold text-white">Your Cards</h3>
        <button
          onClick={() => setShowModal(true)}
          className="flex cursor-pointer items-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg font-medium hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all"
        >
          <Plus size={18} /> Add Card
        </button>
      </div>

      <br />
      <br />

      {/* Cards Display */}
      {cards.length === 0 ? (
        <p className="text-gray-500">
          No cards yet. Click “Add Card” to get started.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 max-w-4xl">
          {cards.map((card) => (
            <div
              key={card.id}
              className="relative p-6 rounded-xl bg-[#1d1b27]/80 border border-white/10 
                         shadow-lg hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] 
                         transition-all hover:scale-[1.01]"
            >
              <button
                onClick={() => deleteCard(card.id)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-400 transition"
              >
                <Trash2 size={18} />
              </button>

              <h3 className="text-xl font-semibold text-purple-400 mb-2">
                {card.title}
              </h3>
              <p className="text-xs text-gray-400 mb-3">
                {card.type.toUpperCase()}
              </p>

              <div className="mt-2 text-gray-200 text-sm">
                {card.type === "youtube" ? (
                  <iframe
                    width="100%"
                    height="200"
                    src={card.content.replace("watch?v=", "embed/")}
                    className="rounded-lg"
                    allowFullScreen
                  ></iframe>
                ) : card.type === "pdf" ? (
                  <a
                    href={card.content}
                    target="_blank"
                    className="text-purple-400 underline"
                  >
                    Open PDF
                  </a>
                ) : (
                  <p>{card.content}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Fixed Modal */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/70 backdrop-blur-sm z-[9999]">
          <div
            className="relative bg-[#1e1b2b] p-8 rounded-2xl border border-white/10 
                          shadow-2xl w-[450px]"
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute cursor-pointer top-4 right-4 bg-[#2b2b38]/50 hover:bg-purple-500/30 
                         text-gray-400 hover:text-white rounded-full p-2 transition"
            >
              <X size={18} />
            </button>

            <h3 className="text-xl font-semibold mb-6 text-gray-100 text-center">
              Create New Card
            </h3>

            <div className="space-y-4">
              <input
                placeholder="Enter card title..."
                value={newCard.title}
                onChange={(e) =>
                  setNewCard({ ...newCard, title: e.target.value })
                }
                className="w-full px-4 py-2 bg-[#0f0f17] border border-white/10 
                           rounded-lg text-gray-300"
              />

              <select
                value={newCard.type}
                onChange={(e) =>
                  setNewCard({
                    ...newCard,
                    type: e.target.value as Card["type"],
                  })
                }
                className="w-full px-4 py-2 bg-[#0f0f17] border border-white/10 
                           rounded-lg text-gray-300"
              >
                <option value="text">Text</option>
                <option value="youtube">YouTube Link</option>
                <option value="pdf">PDF URL</option>
              </select>

              <textarea
                placeholder="Write content or paste YouTube/PDF link..."
                value={newCard.content}
                onChange={(e) =>
                  setNewCard({ ...newCard, content: e.target.value })
                }
                className="w-full h-28 px-4 py-2 bg-[#0f0f17] border border-white/10 
                           rounded-lg text-gray-300"
              />
            </div>

            <button
              onClick={addCard}
              className="w-full cursor-pointer mt-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 
                         rounded-lg font-semibold hover:shadow-[0_0_18px_rgba(168,85,247,0.6)] 
                         transition-all"
            >
              Add Card
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
