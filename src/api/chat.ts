const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export interface Message {
  id: string;
  sender: "user" | "agent";
  text: string;
  timestamp: Date;
  imageUrls?: string[];
}

export interface ChatRequest {
  thread_id: string;
  message: string;
  service_category?: string | null;
  claim_category?: string | null;
  claim_description?: string | null;
  claim_stage?: string | null;
  image_urls?: string[];
}

export interface ChatResponse {
  thread_id: string;
  response: string;
  service_category?: string | null;
  claim_category?: string | null;
  claim_description?: string | null;
  session_closed: boolean;
  claim_stage?: string | null;
  audit_report?: Record<string, unknown> | null;
}

export async function sendChatMessage(
  payload: ChatRequest,
): Promise<ChatResponse> {
  const response = await fetch(`${API_BASE_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(
      "Failed to fetch response from the insurance support backend.",
    );
  }

  return response.json();
}

/**
 * Uploads a list of files to the backend Cloudinary endpoint
 */
export async function uploadImages(
  files: File[],
): Promise<{ image_urls: string[] }> {
  const formData = new FormData();

  // Appends files to match the backend expectation: files: List[UploadFile]
  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await fetch(`${API_BASE_URL}/api/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload attachments to the server.");
  }

  return response.json();
}
