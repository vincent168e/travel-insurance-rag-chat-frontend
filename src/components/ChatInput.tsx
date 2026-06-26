import React, { useState, useRef } from "react";
import { SendHorizontal, Plus, X, Image as ImageIcon } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (text: string, files: File[]) => void;
  disabled: boolean;
  claimStage: string | null;
  isWorkflowPending: boolean; // True if category workflows are unselected/empty
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  disabled,
  claimStage,
  isWorkflowPending,
}) => {
  const [input, setInput] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isAwaitingImages = claimStage === "awaiting_images";

  // Plus button is enabled ONLY when claim_stage is awaiting_images
  const isPlusEnabled = !disabled && !isWorkflowPending && isAwaitingImages;

  // Disable text input field if general loading, categorization pending, or awaiting_images
  const isTextInputDisabled = disabled || isWorkflowPending || isAwaitingImages;

  // When awaiting_images: enable submit only if >= 1 image attached. Otherwise, use text verification.
  const isSubmitDisabled =
    disabled ||
    isWorkflowPending ||
    (isAwaitingImages ? selectedFiles.length === 0 : !input.trim());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled || isWorkflowPending) return;
    if (isAwaitingImages && selectedFiles.length === 0) return;
    if (!isAwaitingImages && !input.trim()) return;

    onSendMessage(input.trim(), selectedFiles);
    setInput("");
    setSelectedFiles([]);
    setShowPopup(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const removeFile = (indexToRemove: number) => {
    setSelectedFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border-t border-slate-200 bg-white flex gap-2 items-center relative"
    >
      {/* Plus Button Controls */}
      <button
        type="button"
        disabled={!isPlusEnabled}
        onClick={() => setShowPopup(!showPopup)}
        className={`p-2.5 rounded-xl transition-colors relative ${
          selectedFiles.length > 0
            ? "bg-bluecross-light text-white"
            : "text-slate-500 hover:bg-slate-100"
        } disabled:opacity-30`}
      >
        <Plus size={18} />
        {selectedFiles.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
            {selectedFiles.length}
          </span>
        )}
      </button>

      {/* Upload Popup Management Overlay */}
      {showPopup && isAwaitingImages && (
        <div className="absolute bottom-20 left-4 z-50 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 w-72 max-h-80 flex flex-col base-popup animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <ImageIcon size={14} className="text-bluecross-dark" />
              Attach Claim Evidence ({selectedFiles.length})
            </span>
            <button
              type="button"
              onClick={() => setShowPopup(false)}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            accept="image/*"
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full mb-3 py-2 px-3 border border-dashed border-slate-300 hover:border-bluecross-light rounded-xl text-xs font-medium text-slate-600 hover:text-bluecross-dark transition-colors bg-slate-50 text-center"
          >
            Select Image
          </button>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1 max-h-40">
            {selectedFiles.map((file, idx) => (
              <div
                key={`${file.name}-${idx}`}
                className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-100"
              >
                <div className="flex items-center gap-2 truncate">
                  <div className="w-8 h-8 rounded bg-slate-200 overflow-hidden flex items-center justify-center shrink-0">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      className="w-full h-full object-cover"
                      onLoad={(e) =>
                        URL.revokeObjectURL((e.target as HTMLImageElement).src)
                      }
                    />
                  </div>
                  <span className="text-xs text-slate-600 truncate font-mono">
                    {file.name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(idx)}
                  className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            {selectedFiles.length === 0 && (
              <p className="text-center text-xs text-slate-400 py-4">
                No images staged yet.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Message Input Box Text Element */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isTextInputDisabled}
        placeholder={
          isAwaitingImages
            ? "Staging required: Use the plus button to attach photos..."
            : "Ask a question about your travel insurance policy covers..."
        }
        className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-bluecross-light disabled:opacity-50"
      />

      <button
        type="submit"
        disabled={isSubmitDisabled}
        className="bg-bluecross-dark hover:bg-bluecross-light text-white p-2.5 rounded-xl transition-colors disabled:opacity-40 disabled:hover:bg-bluecross-dark"
      >
        <SendHorizontal size={18} />
      </button>
    </form>
  );
};
