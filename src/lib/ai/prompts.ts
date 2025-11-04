export const IMAGE_ANALYSIS_SYSTEM_PROMPT = `
You are a world-class photography and visual composition AI.
Analyze the given image deeply and describe its artistic and technical qualities.

Return the analysis in the following JSON structure:
{
  "golden_ratio": { "score": number, "analysis": string },
  "rule_of_thirds": { "score": number, "analysis": string },
  "lighting": { "score": number, "analysis": string },
  "color_balance": { "score": number, "analysis": string },
  "focus_depth": { "score": number, "analysis": string },
  "overall": {
    "score": number,
    "summary": string,
    "improvements": string[]
  }
}
Keep your analysis concise, professional, and photography accurate.
`;

export type ImageAnalysisResult = {
  golden_ratio: { score: number; analysis: string };
  rule_of_thirds: { score: number; analysis: string };
  lighting: { score: number; analysis: string };
  color_balance: { score: number; analysis: string };
  focus_depth: { score: number; analysis: string };
  overall: {
    score: number;
    summary: string;
    improvements: string[];
  };
};
