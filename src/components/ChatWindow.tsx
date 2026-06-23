import React, { useState, useEffect, useRef } from "react";
import type { Message } from "../api/chat";
import { sendChatMessage } from "../api/chat";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { Loader2 } from "lucide-react";

export const ChatWindow: React.FC = () => {
  // Fix 1: Seed the welcome note directly inside the useState initializer
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: "welcome",
      sender: "agent",
      text: "Hello! I am your Blue Cross virtual travel policy assistant. How can I help clarify your policy coverage constraints today?",
      timestamp: new Date(),
    },
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fix 2: Keep thread ID in a ref and initialize it outside render
  const threadIdRef = useRef<string>("");

  // This effect remains valid because it synchronizes state with an external system (the browser DOM scrolling API)
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSendMessage = async (text: string) => {
    if (!threadIdRef.current) {
      threadIdRef.current = `session_${Math.random().toString(36).substring(2, 11)}`;
    }

    const userMsg: Message = {
      id: crypto.randomUUID(),
      sender: "user",
      text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const apiResponse = await sendChatMessage({
        message: text,
        thread_id: threadIdRef.current,
      });

      const agentMsg: Message = {
        id: crypto.randomUUID(),
        sender: "agent",
        text: apiResponse.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, agentMsg]);
    } catch {
      const errorMsg: Message = {
        id: crypto.randomUUID(),
        sender: "agent",
        text: "An operational issue occurred. Please re-submit your inquiry.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden h-full">
      <div className="flex-1 overflow-y-auto px-4 py-2 bg-slate-50/50">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-slate-400 my-2 px-12">
            <Loader2 className="animate-spin h-3.5 w-3.5 text-bluecross-light" />
            <span>Reviewing travel policy provisions...</span>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
    </div>
  );
};
