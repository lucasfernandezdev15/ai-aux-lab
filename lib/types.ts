export type MessageRole = "user" | "assistant" | "system";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: number;
}

export interface ToolCall {
  id: string;
  name: string;
  args: Record<string, unknown>;
  result?: string;
  status: "pending" | "running" | "done" | "error";
}

export interface MemoryItem {
  id: string;
  key: string;
  value: string;
  updatedAt: number;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  toolCalls: ToolCall[];
  createdAt: number;
  updatedAt: number;
}

export interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  prompt: string;
  category: string;
}
