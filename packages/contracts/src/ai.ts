/**
 * AI domain contracts.
 * Pure TypeScript types — no implementation, no runtime dependency.
 */

/** An AI-generated recommendation */
export interface AIRecommendation {
  id: string;
  userId: string;
  type: "learning_path" | "resource" | "tutor" | "topic";
  title: string;
  description: string;
  confidence: number; // 0–1
  reasoning: string;
  suggestedAction: string;
  createdAt: string;
}

/** An AI diagnostic result */
export interface AIDiagnostic {
  id: string;
  userId: string;
  subject: string;
  strengths: string[];
  weaknesses: string[];
  overallLevel: "beginner" | "intermediate" | "advanced" | "expert";
  recommendations: AIRecommendation[];
  createdAt: string;
}

/** AI workflow state for LangGraph integration */
export interface AIWorkflowState {
  id: string;
  userId: string;
  agent: string;
  status: "idle" | "processing" | "completed" | "error";
  input: Record<string, unknown>;
  output: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
}
