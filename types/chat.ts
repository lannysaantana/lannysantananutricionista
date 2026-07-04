export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: number;
}

export interface FaqEntry {
  question: string;
  keywords: string[];
  answer: string;
}
