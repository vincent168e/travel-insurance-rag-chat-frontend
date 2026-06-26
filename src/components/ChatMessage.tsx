import React, { useState } from "react";
import type { Message } from "../api/chat";
import { User, Bot, X } from "lucide-react";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === "user";

  // Track which image URL is currently being expanded in the preview modal
  const [activePreview, setActivePreview] = useState<string | null>(null);

  return (
    <div
      className={`flex w-full my-3 ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`flex gap-3 max-w-[80%] ${isUser ? "flex-row-reverse" : "flex-row"}`}
      >
        {/* Profile Avatars */}
        <div
          className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
            isUser
              ? "bg-bluecross-light text-white"
              : "bg-slate-200 text-slate-700"
          }`}
        >
          {isUser ? <User size={16} /> : <Bot size={16} />}
        </div>

        {/* Message Content Bubble */}
        <div
          className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
            isUser
              ? "bg-bluecross-dark text-white rounded-tr-none shadow-sm"
              : "bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200"
          }`}
        >
          {message.text && (
            <p className="whitespace-pre-wrap">{message.text}</p>
          )}

          {/* Interactive Action History Thumbnails */}
          {message.imageUrls && message.imageUrls.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {message.imageUrls.map((url, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActivePreview(url)}
                  className="w-14 h-14 rounded-lg border border-slate-300 bg-white overflow-hidden shadow-sm shrink-0 hover:scale-105 hover:opacity-90 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-bluecross-light"
                  title="Click to preview image"
                >
                  <img
                    src={url}
                    alt={`Staged Document ${idx + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}

          <span
            className={`block text-[10px] mt-1 text-right ${
              isUser ? "text-bluecross-accent" : "text-slate-400"
            }`}
          >
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>

      {/* Lightbox Image Preview Modal */}
      {activePreview && (
        <div
          className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setActivePreview(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden p-2 shadow-2xl flex flex-col animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the panel
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActivePreview(null)}
              className="absolute top-4 right-4 bg-slate-900/60 hover:bg-slate-900 text-white p-2 rounded-full transition-colors z-10 shadow-md focus:outline-none"
            >
              <X size={18} />
            </button>

            {/* Expanded Image View */}
            <img
              src={activePreview}
              alt="Evidence Document Preview"
              className="max-w-full max-h-[85vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};
