import React from "react";
import { ShieldCheck } from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Blue Cross Header */}
      <header className="bg-bluecross-dark text-white px-6 py-4 shadow-md flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-3">
          <ShieldCheck className="h-7 w-7 text-bluecross-accent" />
          <div>
            <h1 className="text-lg font-bold tracking-wide">Blue Cross</h1>
            <p className="text-xs text-slate-200">
              Travel Policy Assistant Demo
            </p>
          </div>
        </div>
        <span className="bg-bluecross-light px-3 py-1 rounded-full text-xs font-semibold">
          RAG Agent Session Active
        </span>
      </header>

      {/* Primary Workspace Panel */}
      <main className="flex-1 flex justify-center items-stretch overflow-hidden p-4 md:p-8">
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
          {children}
        </div>
      </main>
    </div>
  );
};
