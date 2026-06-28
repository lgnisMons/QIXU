/**
 * @qixu/seo — GEO (Generative Engine Optimization) utilities.
 *
 * Optimizes content for AI answer engines (ChatGPT, Copilot, Perplexity, Gemini).
 * Key patterns:
 *   - Answer exactly one question per page
 *   - Use semantic headings (h1 = question, h2 = aspects)
 *   - Include structured FAQ blocks
 *   - Keep paragraphs concise and self-contained
 *   - Use bullet points for scannability
 */

export interface GEOArticle {
  /** The exact user question this page answers */
  question: string;
  /** One-sentence direct answer (gets cited by AI engines) */
  shortAnswer: string;
  /** Full explanation sections */
  sections: GEOSection[];
  /** FAQ block for structured data */
  faq: { q: string; a: string }[];
}

export interface GEOSection {
  heading: string;
  content: string;
  bullets?: string[];
}

/** Generate a geo-optimized meta description */
export function makeGEODescription(question: string, shortAnswer: string): string {
  return `${question} — ${shortAnswer}`.slice(0, 160);
}

/** Generate semantic heading hierarchy for GEO */
export function makeGEOHeadings(question: string, sections: GEOSection[]): string[] {
  return [question, ...sections.map((s) => s.heading)];
}
