import React from "react";
import { Plus, MessageSquare, X } from "lucide-react";
import type { Message } from "../api/chat";

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  serviceCategory: string;
  claimCategory: string;
  claimStage: string | null;
  claimDescription: string | null;
  threadId: string;
  isSessionClosed: boolean; // Updated field name
}

interface ChatHistorySidebarProps {
  sessions: ChatSession[];
  currentSessionId: string;
  onNewChat: () => void;
  onSelectSession: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const ChatHistorySidebar: React.FC<ChatHistorySidebarProps> = ({
  sessions,
  currentSessionId,
  onNewChat,
  onSelectSession,
  isOpen,
  onClose,
}) => {
  return (
    <>
      {/* Mobile Dark Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 sm:hidden animate-in fade-in duration-200"
          onClick={onClose}
        />
      )}

      {/* Dynamic Conversational Sidebar Column / Drawer Container */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-50 flex flex-col h-full border-r border-slate-200 transition-transform duration-300 ease-in-out transform 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          sm:relative sm:translate-x-0 sm:inset-auto sm:z-0 sm:w-56 md:w-64 sm:flex shrink-0`}
      >
        {/* Sidebar Header Panel Actions */}
        <div className="p-4 flex items-center justify-between gap-2 border-b border-slate-200/60 sm:border-b-0">
          <button
            type="button"
            onClick={() => {
              onNewChat();
              onClose();
            }}
            className="flex-1 flex items-center justify-center gap-2 bg-bluecross-dark hover:bg-bluecross-light text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition-colors shadow-sm"
          >
            <Plus size={14} />
            New Chat
          </button>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-500 hover:bg-slate-200/80 rounded-xl sm:hidden transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Previous Chat History Browsing Streams */}
        <div className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
          <div className="px-2 py-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            Recent Conversations
          </div>
          {sessions.map((sess) => {
            const isActive = sess.id === currentSessionId;
            return (
              <button
                key={sess.id}
                type="button"
                onClick={() => {
                  onSelectSession(sess.id);
                  onClose();
                }}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center gap-2.5 group relative ${
                  isActive
                    ? "bg-white text-bluecross-dark font-semibold shadow-sm border border-slate-200/80"
                    : "text-slate-600 hover:bg-slate-200/50"
                }`}
              >
                <MessageSquare
                  size={14}
                  className={
                    isActive
                      ? "text-bluecross-light"
                      : "text-slate-400 group-hover:text-slate-500"
                  }
                />
                <span className="truncate flex-1 pr-1">
                  {sess.title} {sess.isSessionClosed && "🔒"}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
