const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export interface Message {
  id: string;
  sender: "user" | "agent";
  text: string;
  timestamp: Date;
}

export interface ChatRequest {
  message: string;
  thread_id: string;
}

export interface ChatResponse {
  response: string;
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
