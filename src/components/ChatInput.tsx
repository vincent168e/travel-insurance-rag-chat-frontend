import React, { useState } from "react";
import { SendHorizontal } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  disabled: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  disabled,
}) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;

    onSendMessage(input.trim());
    setInput("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border-t border-slate-200 bg-white flex gap-2 items-center"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={disabled}
        placeholder="Ask a question about your travel insurance policy covers..."
        className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-bluecross-light disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={disabled || !input.trim()}
        className="bg-bluecross-dark hover:bg-bluecross-light text-white p-2.5 rounded-xl transition-colors disabled:opacity-40 disabled:hover:bg-bluecross-dark"
      >
        <SendHorizontal size={18} />
      </button>
    </form>
  );
};
