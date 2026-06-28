import React, { useState } from "react";
import { ShieldCheck, HelpCircle } from "lucide-react"; // Imported HelpCircle for the button icon
import { HelpModal } from "../components/HelpModal";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  // State tracking whether the guidelines help pop-up is open
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Blue Cross Header */}
      <header className="bg-bluecross-dark text-white px-6 py-4 shadow-md flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-3">
          <ShieldCheck className="h-7 w-7 text-bluecross-accent" />

          <div>
            <h1 className="text-lg font-bold tracking-wide">Cobalt Cross</h1>

            <p className="text-xs text-slate-200">
              Travel Insurance Inquiry & Claim Assistant
            </p>
          </div>
        </div>

        {/* Help Button */}
        <button
          type="button"
          onClick={() => setIsHelpOpen(true)}
          className="bg-bluecross-accent hover:brightness-110 active:scale-95 text-slate-900 px-3.5 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
        >
          <HelpCircle size={14} className="stroke-[2.5]" />
          <span>Guide</span>
        </button>
      </header>
      {/* Primary Workspace Panel */}
      <main className="flex-1 flex justify-center items-stretch overflow-hidden p-4 md:p-8">
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
          {children}
        </div>
      </main>
      {/* Global Help Guidelines Popup Overlay Modal */}
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
};
