// User Types
export interface User {
  id: string;
  email: string;
  username: string;
  created_at: string;
}

export interface ActiveUser {
  socketId: string;
  userId: string;
  username: string;
  color: string;
}

// Review Types
export interface Review {
  id: string;
  title: string;
  description?: string;
  code: string;
  language: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  creator?: User;
}

export interface CreateReviewInput {
  title: string;
  description?: string;
  code: string;
  language: string;
}

// Comment Types
export interface Comment {
  id: string;
  review_id: string;
  user_id: string;
  line_number: number | null;
  content: string;
  created_at: string;
  user?: User;
}

export interface CreateCommentInput {
  review_id: string;
  line_number: number;
  content: string;
}

// AI Insight Types
export interface AIInsight {
  id: string;
  review_id: string;
  insight_type: InsightType;
  severity: Severity;
  line_number?: number | null;
  message: string;
  suggestion?: string | null;
  created_at: string;
}

export type InsightType = 
  | 'security' 
  | 'performance' 
  | 'best-practice' 
  | 'bug' 
  | 'style'
  | 'maintainability';

export type Severity = 'critical' | 'high' | 'medium' | 'low' | 'info';

// Real-time Collaboration Types
export interface CursorPosition {
  line: number;
  column: number;
}

export interface Selection {
  startLine: number;
  startColumn: number;
  endLine: number;
  endColumn: number;
}

export interface CursorUpdate {
  socketId: string;
  position: CursorPosition;
}

export interface SelectionUpdate {
  socketId: string;
  selection: Selection;
}

export interface CodeChange {
  range: {
    startLine: number;
    startColumn: number;
    endLine: number;
    endColumn: number;
  };
  text: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Authentication Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  username: string;
}

export interface AuthResponse {
  user: User;
  session: {
    access_token: string;
    refresh_token: string;
  };
}

// Supported Languages for Code Editor
export const SUPPORTED_LANGUAGES = [
  'javascript',
  'typescript',
  'python',
  'java',
  'csharp',
  'cpp',
  'go',
  'rust',
  'php',
  'ruby',
  'swift',
  'kotlin',
  'sql',
  'html',
  'css',
  'json',
  'yaml',
  'markdown',
] as const;

export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];