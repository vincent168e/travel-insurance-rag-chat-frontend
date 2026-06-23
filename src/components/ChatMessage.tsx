import React from "react";
import type { Message } from "../api/chat";
import { User, Bot } from "lucide-react";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === "user";

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
          <p className="whitespace-pre-wrap">{message.text}</p>
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
    </div>
  );
};
