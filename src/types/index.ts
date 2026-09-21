export interface ConversationWithMetadata {
  id: string;
  title: string;
  description?: string;
  summary?: string;
  preview?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  messageCount: number;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: Date | string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  conversations: string[];
  createdAt: Date | string;
}

export interface DashboardStats {
  totalConversations: number;
  totalProjects: number;
  totalMessages: number;
  totalStorage: string;
  lastBackup?: Date | string;
}

export interface ConversationWithMetadata {
  id: string;
  title: string;
  description?: string;
  summary?: string;
  preview?: string;
  tags?: string[];
  createdAt: Date | string;
  updatedAt: Date | string;
  messageCount: number;
}
