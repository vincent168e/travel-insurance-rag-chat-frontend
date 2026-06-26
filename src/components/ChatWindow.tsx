import React, { useState, useEffect, useRef } from "react";
import type { Message } from "../api/chat";
import { sendChatMessage, uploadImages } from "../api/chat";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { ChatHistorySidebar, type ChatSession } from "./ChatHistorySidebar";
import { Loader2, Menu } from "lucide-react";

export const ChatWindow: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Chat History Sessions State Index
  const [sessions, setSessions] = useState<ChatSession[]>(() => [
    {
      id: "default_session",
      title: "Welcome Chat",
      messages: [
        {
          id: "welcome",
          sender: "agent",
          text: "Hello! I am your Cobalt Cross travel insurance assistant. How can I help you today?",
          timestamp: new Date(),
        },
      ],
      serviceCategory: "",
      claimCategory: "",
      claimStage: null,
      claimDescription: null,
      threadId: "",
      isSessionClosed: false,
    },
  ]);
  const [currentSessionId, setCurrentSessionId] =
    useState<string>("default_session");

  // Core Active Workspace Sub-States
  const [messages, setMessages] = useState<Message[]>(sessions[0].messages);
  const [serviceCategory, setServiceCategory] = useState<string>("");
  const [claimCategory, setClaimCategory] = useState<string>("");
  const [claimStage, setClaimStage] = useState<string | null>(null);
  const [claimDescription, setClaimDescription] = useState<string | null>(null);
  const [isSessionClosed, setIsSessionClosed] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const threadIdRef = useRef<string>("");

  // Auto-scroll anchor system
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [
    messages,
    loading,
    serviceCategory,
    claimCategory,
    claimStage,
    isSessionClosed,
  ]);

  // Synchronize dynamic active context variations back into the core historical directory map
  useEffect(() => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === currentSessionId) {
          let title = s.title;

          if (title === "Welcome Chat" || title === "New Chat") {
            if (claimCategory) {
              const labels: Record<string, string> = {
                emergency_medical_care: "Medical Care Claim",
                trip_cancellation_or_interruption: "Trip Interruption Claim",
                baggage: "Baggage Claim",
                accidental_death_or_dismemberment: "Death/Disemberment Claim",
              };
              title = labels[claimCategory] || claimCategory;
            } else if (serviceCategory === "inquiry") {
              title = "Policy Inquiry";
            } else {
              const firstUserMsg = messages.find((m) => m.sender === "user");
              if (firstUserMsg?.text) {
                title =
                  firstUserMsg.text.substring(0, 22) +
                  (firstUserMsg.text.length > 22 ? "..." : "");
              }
            }
          }

          return {
            ...s,
            title,
            messages,
            serviceCategory,
            claimCategory,
            claimStage,
            claimDescription,
            threadId: threadIdRef.current,
            isSessionClosed,
          };
        }
        return s;
      }),
    );
  }, [
    messages,
    serviceCategory,
    claimCategory,
    claimStage,
    claimDescription,
    isSessionClosed,
    currentSessionId,
  ]);

  // UPDATED: Added condition to freeze input workflow when an inquiry is awaiting a claim category confirmation
  const isWorkflowPending =
    serviceCategory === "" ||
    (serviceCategory === "claim" && claimCategory === "") ||
    (serviceCategory === "inquiry" && claimStage === "awaiting_claim_category");

  const handleNewChat = () => {
    const nextSessionId = `session_${Date.now()}`;
    const newSess: ChatSession = {
      id: nextSessionId,
      title: "New Chat",
      messages: [
        {
          id: "welcome",
          sender: "agent",
          text: "Hello! I am your Cobalt Cross travel insurance assistant. How can I help you today?",
          timestamp: new Date(),
        },
      ],
      serviceCategory: "",
      claimCategory: "",
      claimStage: null,
      claimDescription: null,
      threadId: "",
      isSessionClosed: false,
    };

    setSessions((prev) => [...prev, newSess]);
    setCurrentSessionId(nextSessionId);

    setMessages(newSess.messages);
    setServiceCategory("");
    setClaimCategory("");
    setClaimStage(null);
    setClaimDescription(null);
    setIsSessionClosed(false);
    threadIdRef.current = "";
  };

  const handleSelectSession = (sessionId: string) => {
    if (sessionId === currentSessionId) return;

    const target = sessions.find((s) => s.id === sessionId);
    if (target) {
      setCurrentSessionId(target.id);
      setMessages(target.messages);
      setServiceCategory(target.serviceCategory);
      setClaimCategory(target.claimCategory);
      setClaimStage(target.claimStage);
      setClaimDescription(target.claimDescription);
      setIsSessionClosed(target.isSessionClosed);
      threadIdRef.current = target.threadId;
    }
  };

  const executeChatFlow = async (
    payloadMessage: string,
    files: File[],
    sCat: string | null,
    cCat: string | null,
    sStage: string | null = claimStage,
    overrideNextStage?: string | null, // Added to intercept and override backend stage values
  ) => {
    if (isSessionClosed) return;

    if (!threadIdRef.current) {
      threadIdRef.current = `session_${Math.random().toString(36).substring(2, 11)}`;
    }

    setLoading(true);

    try {
      let uploadedUrls: string[] = [];

      if (files && files.length > 0) {
        setLoadingText("Uploading and analyzing media evidence...");
        const uploadResult = await uploadImages(files);
        uploadedUrls = uploadResult.image_urls;
      }

      const userMsg: Message = {
        id: crypto.randomUUID(),
        sender: "user",
        text:
          payloadMessage ||
          (uploadedUrls.length > 0 ? "Attached Claim Evidence: " : ""),
        timestamp: new Date(),
        imageUrls: uploadedUrls,
      };
      setMessages((prev) => [...prev, userMsg]);

      setLoadingText("Reviewing travel insurance policy provisions... ");

      const apiResponse = await sendChatMessage({
        message: payloadMessage,
        thread_id: threadIdRef.current,
        service_category: sCat,
        claim_category: cCat,
        claim_description: claimDescription || null,
        claim_stage: sStage,
        image_urls: uploadedUrls,
      });

      if (apiResponse.session_closed) {
        setIsSessionClosed(true);
        setClaimStage(null);
        setClaimDescription(null);
      } else {
        // Force the override stage if explicitly provided, otherwise fallback to the backend response
        const nextStage =
          overrideNextStage !== undefined
            ? overrideNextStage
            : apiResponse.claim_stage || null;
        setClaimStage(nextStage);

        if (apiResponse.service_category) {
          setServiceCategory(apiResponse.service_category);
        }
        if (apiResponse.claim_category) {
          setClaimCategory(apiResponse.claim_category);
        }

        if (nextStage === "awaiting_images") {
          setClaimDescription(apiResponse.claim_description || null);
        }
      }

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
        text: "An operational issue occurred while processing your query or attachments. Please re-submit.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
      setLoadingText("");
    }
  };

  const handleServiceCategoryChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const val = e.target.value;
    if (!val || isSessionClosed) return;

    setServiceCategory(val);

    if (val === "inquiry") {
      await executeChatFlow("Inquiry service", [], "inquiry", null);
    }
  };

  const handleClaimCategoryChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const val = e.target.value;
    if (!val || isSessionClosed) return;

    const labels: Record<string, string> = {
      emergency_medical_care: "Emergency Medical Care",
      trip_cancellation_or_interruption: "Trip Cancellation or Interruption",
      baggage: "Baggage Damage/Loss",
      accidental_death_or_dismemberment: "Accidental Death or Dismemberment",
    };

    setClaimCategory(val);
    await executeChatFlow(
      `Claim service: ${labels[val] || val}`,
      [],
      "claim",
      val,
    );
  };

  // NEW: Handles selection when an inquiry switches context to a potential claim selection workflow
  const handleAwaitingClaimCategoryChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const val = e.target.value;
    if (!val || isSessionClosed) return;

    if (val === "yes") {
      setServiceCategory("claim");
      setClaimStage(null);
    } else {
      setClaimStage(null);
      // Pass null as the 6th argument (overrideNextStage) to stop the incoming API response from resetting it
      await executeChatFlow(
        "Inquiry service",
        [],
        serviceCategory,
        null,
        null,
        null,
      );
    }
  };

  const handleSendMessage = async (text: string, files: File[]) => {
    await executeChatFlow(
      text,
      files,
      serviceCategory || null,
      claimCategory || null,
    );
  };

  return (
    <div className="flex flex-1 h-full overflow-hidden divide-x divide-slate-200">
      <ChatHistorySidebar
        sessions={sessions}
        currentSessionId={currentSessionId}
        onNewChat={handleNewChat}
        onSelectSession={handleSelectSession}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex flex-col flex-1 overflow-hidden h-full bg-white">
        {/* Mobile Navbar Control Header */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200 bg-white sm:hidden shrink-0">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="p-1.5 text-slate-600 hover:bg-slate-100 active:bg-slate-200/80 rounded-xl transition-colors flex items-center gap-1.5 text-xs font-semibold"
          >
            <Menu size={18} className="text-slate-500" />
            <span>History</span>
          </button>
          <div className="text-xs font-bold text-slate-700 truncate max-w-[180px]">
            {sessions.find((s) => s.id === currentSessionId)?.title ||
              "Workspace"}
          </div>
          <div className="w-12" />
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2 bg-slate-50/50">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}

          {/* Session Ended Informational Status Banner */}
          {isSessionClosed && (
            <div className="text-center text-xs font-semibold text-slate-400 my-5 py-2 border-y border-slate-200/60 tracking-wide animate-in fade-in slide-in-from-bottom-1 duration-300">
              🔒 This session has ended.
            </div>
          )}

          {/* Guided workflows */}
          {!isSessionClosed && serviceCategory === "" && !loading && (
            <div className="flex w-full my-3 justify-end animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm max-w-[80%] min-w-[280px]">
                <label className="block text-xs font-semibold text-slate-500 mb-2">
                  Please select a service:
                </label>
                <select
                  onChange={handleServiceCategoryChange}
                  value={serviceCategory}
                  className="block w-full p-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-bluecross-light text-slate-700"
                >
                  <option value="" disabled>
                    -- Select Option --
                  </option>
                  <option value="inquiry">Inquiry</option>
                  <option value="claim">Claim</option>
                </select>
              </div>
            </div>
          )}

          {!isSessionClosed &&
            serviceCategory === "claim" &&
            claimCategory === "" &&
            !loading && (
              <div className="flex w-full my-3 justify-end animate-in fade-in slide-in-from-bottom-2 duration-200">
                <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm max-w-[80%] min-w-[280px]">
                  <label className="block text-xs font-semibold text-slate-500 mb-2">
                    Select your claim category:
                  </label>
                  <select
                    onChange={handleClaimCategoryChange}
                    value={claimCategory}
                    className="block w-full p-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-bluecross-light text-slate-700"
                  >
                    <option value="" disabled>
                      -- Select Claim Category --
                    </option>
                    <option value="emergency_medical_care">
                      Emergency Medical Care
                    </option>
                    <option value="trip_cancellation_or_interruption">
                      Trip Cancellation or Interruption
                    </option>
                    <option value="baggage">Baggage Loss or Damage</option>
                    <option value="accidental_death_or_dismemberment">
                      Accidental Death or Dismemberment
                    </option>
                  </select>
                </div>
              </div>
            )}

          {/* NEW: Renders dropdown menu displaying No and Yes buttons during custom Inquiry triage */}
          {!isSessionClosed &&
            serviceCategory === "inquiry" &&
            claimStage === "awaiting_claim_category" &&
            !loading && (
              <div className="flex w-full my-3 justify-end animate-in fade-in slide-in-from-bottom-2 duration-200">
                <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm max-w-[80%] min-w-[280px]">
                  <label className="block text-xs font-semibold text-slate-500 mb-2">
                    Switch to a claim service?
                  </label>
                  <select
                    onChange={handleAwaitingClaimCategoryChange}
                    defaultValue=""
                    className="block w-full p-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-bluecross-light text-slate-700"
                  >
                    <option value="" disabled>
                      -- Select Option --
                    </option>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
              </div>
            )}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-400 my-2 px-12 animate-pulse">
              <Loader2 className="animate-spin h-3.5 w-3.5 text-bluecross-light" />
              <span>
                {loadingText ||
                  "Reviewing travel insurance policy provisions..."}
              </span>
            </div>
          )}
          <div ref={scrollRef} />
        </div>

        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={loading || isSessionClosed}
          claimStage={claimStage}
          isWorkflowPending={isWorkflowPending && !isSessionClosed}
        />
      </div>
    </div>
  );
};
