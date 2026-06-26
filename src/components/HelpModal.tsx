import React from "react";
import {
  X,
  ExternalLink,
  HelpCircle,
  FileText,
  Eye,
  Download,
  CheckCircle2,
  XCircle,
  Cpu,
} from "lucide-react";

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Real Cloudinary URLs provided for viewing
  const urls = {
    medicalInvoice:
      "https://res.cloudinary.com/dhlzzsblb/image/upload/v1782388441/travel-insurance-rag-chat/samples/sample_claim_medical_invoice.png",
    flightReceipt:
      "https://res.cloudinary.com/dhlzzsblb/image/upload/v1782387175/travel-insurance-rag-chat/samples/sample_claim_flight_receipt.png",
    flightCancellation:
      "https://res.cloudinary.com/dhlzzsblb/image/upload/v1782386701/travel-insurance-rag-chat/samples/sample_claim_flight_cancellation_notice.jpg",
  };

  // Injected 'fl_attachment' transformation flag to force browser file downloads
  const downloadUrls = {
    medicalInvoice:
      "https://res.cloudinary.com/dhlzzsblb/image/upload/fl_attachment/v1782388441/travel-insurance-rag-chat/samples/sample_claim_medical_invoice.png",
    flightReceipt:
      "https://res.cloudinary.com/dhlzzsblb/image/upload/fl_attachment/v1782387175/travel-insurance-rag-chat/samples/sample_claim_flight_receipt.png",
    flightCancellation:
      "https://res.cloudinary.com/dhlzzsblb/image/upload/fl_attachment/v1782386701/travel-insurance-rag-chat/samples/sample_claim_flight_cancellation_notice.jpg",
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[150] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50 rounded-t-2xl shrink-0">
          <div className="flex items-center gap-2 text-bluecross-dark">
            <HelpCircle size={20} className="text-bluecross-light" />
            <h2 className="text-base font-bold text-slate-800 tracking-wide">
              User Guide
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-xl transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body / Scroll Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-slate-600 leading-relaxed">
          {/* Welcome Area */}
          <section className="space-y-2">
            <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">
              Welcome to Cobalt Cross Travel Insurance
            </h1>
            <p className="text-slate-600">
              This demo app is a virtual assistant designed to help you easily
              understand and interpretour our travel insurance policies in
              Canada.
            </p>
            <div className="pt-1">
              <a
                href="https://qc.bluecross.ca/en/dam/jcr:7db443db-b794-4de0-aa1f-a849a941d89f/travel_insurance_policy_11QVV0196A_2022-10.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-bluecross-light hover:text-bluecross-dark underline transition-colors"
              >
                <span>Reference: Travel Insurance Policy PDF</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* How to Use Area */}
          <section className="space-y-4">
            <h2 className="text-base font-bold text-slate-800 tracking-wide uppercase text-xs text-slate-400">
              🛠️ How to Use ?
            </h2>

            {/* Inquiry Workflow Panel */}
            <div className="bg-slate-50/70 border border-slate-200/60 rounded-xl p-4 space-y-3">
              <h3 className="font-bold text-bluecross-dark flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-bluecross-light" />
                Inquiry Mode
              </h3>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 size={13} /> Sample Questions to Ask:
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-600 pl-1">
                  <li className="bg-white p-2 rounded-lg border border-slate-100 shadow-2sm">
                    "What situations is this travel insurance policy actually
                    designed to cover?"
                  </li>
                  <li className="bg-white p-2 rounded-lg border border-slate-100 shadow-2sm">
                    "Is there a maximum dollar limit on the Emergency Medical
                    Care coverage?"
                  </li>
                  <li className="bg-white p-2 rounded-lg border border-slate-100 shadow-2sm">
                    "Am I covered if I get injured while participating in
                    extreme sports?"
                  </li>
                  <li className="bg-white p-2 rounded-lg border border-slate-100 shadow-2sm">
                    "Are there restrictions regarding pregnancy and childbirth
                    while traveling?"
                  </li>
                  <li className="bg-white p-2 rounded-lg border border-slate-100 shadow-2sm">
                    "What happens if I made an mistake on my medical
                    questionnaire?"
                  </li>
                  <li className="bg-white p-2 rounded-lg border border-slate-100 shadow-2sm">
                    "How much will the policy pay for my extra hotel/food bills
                    if stranded?"
                  </li>
                  <li className="bg-white p-2 rounded-lg border border-slate-100 shadow-2sm">
                    "What happens if my luggage is delayed at the airport? Does
                    the policy pay for emergency clothing?"
                  </li>
                  <li className="bg-white p-2 rounded-lg border border-slate-100 shadow-2sm">
                    "What is the financial limit if remains need to be prepared
                    and returned home?"
                  </li>
                </ul>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-rose-700 flex items-center gap-1">
                  <XCircle size={13} /> Sample Restricted Questions:
                </h4>
                <ul className="space-y-1.5 text-xs pl-1">
                  <li className="flex items-center justify-between bg-rose-50/50 p-2 rounded-lg border border-rose-100">
                    <span className="text-slate-600">
                      "Tell me how to commit suicide."
                    </span>
                    <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-700 font-bold text-[10px] uppercase">
                      Improper
                    </span>
                  </li>
                  <li className="flex items-center justify-between bg-rose-50/50 p-2 rounded-lg border border-rose-100">
                    <span className="text-slate-600">
                      "Is this policy cheaper than Manulife's travel insurance?"
                    </span>
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px] uppercase">
                      Competitor
                    </span>
                  </li>
                  <li className="flex items-center justify-between bg-rose-50/50 p-2 rounded-lg border border-rose-100">
                    <span className="text-slate-600">
                      "Can you give me a recipe for chocolate chip cookies?"
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-bold text-[10px] uppercase">
                      Out of Topic
                    </span>
                  </li>
                </ul>
              </div>

              <blockquote className="mt-3 border-l-2 border-bluecross-light bg-blue-50/50 p-2.5 rounded-r-lg text-xs font-medium text-slate-700">
                💡{" "}
                <strong>
                  You can switch to Claim Mode at any time, by telling the
                  assistant that you want to file a claim.
                </strong>
              </blockquote>
            </div>

            {/* Claim Workflow Panel */}
            <div className="bg-slate-50/70 border border-slate-200/60 rounded-xl p-4 space-y-4">
              <h3 className="font-bold text-bluecross-dark flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-bluecross-dark" />
                Claim Mode
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Scenario 1 */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Scenario 1
                    </span>
                    <h4 className="font-bold text-slate-800 text-sm mt-0.5">
                      Staying in Hospital
                    </h4>
                    <p className="text-xs text-slate-500 mt-2">
                      <strong>Category:</strong> Emergency medical care
                    </p>
                    <p className="text-xs text-slate-600 mt-1 italic bg-slate-50 p-2 rounded border border-slate-100">
                      "I got food poisoning when travelling in Vancouver. Stayed
                      in hospital for 3 days."
                    </p>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <span className="text-[10px] font-semibold text-slate-500 block mb-1.5">
                      Evidence:
                    </span>
                    <div className="flex items-center justify-between bg-slate-50 p-2 rounded-lg border border-slate-200 text-xs">
                      <div className="flex items-center gap-1.5 truncate text-slate-700 font-medium">
                        <FileText
                          size={14}
                          className="text-bluecross-light shrink-0"
                        />
                        <span className="truncate">Medical Invoice</span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0 ml-2">
                        <a
                          href={urls.medicalInvoice}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 hover:text-bluecross-light text-slate-400 transition-colors flex items-center gap-0.5"
                          title="Click to view"
                        >
                          <Eye size={14} />
                          <span className="text-[10px] hidden lg:inline">
                            View
                          </span>
                        </a>
                        <a
                          href={downloadUrls.medicalInvoice}
                          download
                          className="p-1 hover:text-bluecross-light text-slate-400 transition-colors flex items-center gap-0.5"
                          title="Download it"
                        >
                          <Download size={14} />
                          <span className="text-[10px] hidden lg:inline">
                            Download
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scenario 2 */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Scenario 2
                    </span>
                    <h4 className="font-bold text-slate-800 text-sm mt-0.5">
                      Flight Cancellation
                    </h4>
                    <p className="text-xs text-slate-500 mt-2">
                      <strong>Category:</strong> Trip cancellation or
                      interruption
                    </p>
                    <p className="text-xs text-slate-600 mt-1 italic bg-slate-50 p-2 rounded border border-slate-100">
                      "My flight from NYC to Vancouver is cancelled by airline."
                    </p>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5">
                    <span className="text-[10px] font-semibold text-slate-500 block">
                      Evidence:
                    </span>

                    <div className="flex items-center justify-between bg-slate-50 p-2 rounded-lg border border-slate-200 text-xs">
                      <div className="flex items-center gap-1.5 truncate text-slate-700 font-medium">
                        <FileText
                          size={14}
                          className="text-bluecross-light shrink-0"
                        />
                        <span className="truncate">Flight Receipt</span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0 ml-2">
                        <a
                          href={urls.flightReceipt}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 hover:text-bluecross-light text-slate-400 transition-colors flex items-center gap-0.5"
                          title="Click to view"
                        >
                          <Eye size={14} />
                          <span className="text-[10px] hidden lg:inline">
                            View
                          </span>
                        </a>
                        <a
                          href={downloadUrls.flightReceipt}
                          download
                          className="p-1 hover:text-bluecross-light text-slate-400 transition-colors flex items-center gap-0.5"
                          title="Download it"
                        >
                          <Download size={14} />
                          <span className="text-[10px] hidden lg:inline">
                            Download
                          </span>
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center justify-between bg-slate-50 p-2 rounded-lg border border-slate-200 text-xs">
                      <div className="flex items-center gap-1.5 truncate text-slate-700 font-medium">
                        <FileText
                          size={14}
                          className="text-bluecross-light shrink-0"
                        />
                        <span className="truncate">Cancellation Notice</span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0 ml-2">
                        <a
                          href={urls.flightCancellation}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 hover:text-bluecross-light text-slate-400 transition-colors flex items-center gap-0.5"
                          title="Click to view"
                        >
                          <Eye size={14} />
                          <span className="text-[10px] hidden lg:inline">
                            View
                          </span>
                        </a>
                        <a
                          href={downloadUrls.flightCancellation}
                          download
                          className="p-1 hover:text-bluecross-light text-slate-400 transition-colors flex items-center gap-0.5"
                          title="Download it"
                        >
                          <Download size={14} />
                          <span className="text-[10px] hidden lg:inline">
                            Download
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <blockquote className="mt-3 border-l-2 border-bluecross-light bg-blue-50/50 p-2.5 rounded-r-lg text-xs font-medium text-slate-700">
                💡{" "}
                <strong>
                  You will receive a claim audit report at the end.
                </strong>
              </blockquote>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* System Architecture Meta Section */}
          <section className="flex items-center gap-3 bg-bluecross-dark text-slate-100 p-3.5 rounded-xl shadow-inner">
            <Cpu size={22} className="text-slate-200 shrink-0 animate-pulse" />
            <div>
              <span className="text-[9px] font-bold uppercase text-slate-200 tracking-widest block">
                Core Architecture
              </span>
              <p className="text-xs font-mono text-slate-200 font-medium mt-0.5">
                Hub-and-spoke multi-agent, RAG, MCP
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
