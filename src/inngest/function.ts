import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";
import { inngest } from "./client";
import { IMAGE_ANALYSIS_SYSTEM_PROMPT, type ImageAnalysisResult } from "@/lib/ai/prompts";

const openai = createOpenAI();

// Note: This function is kept for potential future async processing
// Currently, image analysis is done directly in the tRPC mutation
export const analyzeImageFn = inngest.createFunction(
  { id: "analyze-image" },
  { event: "image/analyze" },
  async ({ event, step }) => {
    const { imageData, userPrompt } = event.data;

    // imageData should be a base64 data URL (e.g., "data:image/jpeg;base64,...")
    if (!imageData) {
      throw new Error("imageData (blob as base64 data URL) must be provided");
    }

    const result = await step.run("ai-analyze-image", async () => {
      const analysis = await generateObject({
        model: openai("gpt-4o-mini"), 
        system: IMAGE_ANALYSIS_SYSTEM_PROMPT,
        schema: z.object({
          golden_ratio: z.object({
            score: z.number(),
            analysis: z.string(),
          }),
          rule_of_thirds: z.object({
            score: z.number(),
            analysis: z.string(),
          }),
          lighting: z.object({
            score: z.number(),
            analysis: z.string(),
          }),
          color_balance: z.object({
            score: z.number(),
            analysis: z.string(),
          }),
          focus_depth: z.object({
            score: z.number(),
            analysis: z.string(),
          }),
          overall: z.object({
            score: z.number(),
            summary: z.string(),
            improvements: z.array(z.string()),
          }),
        }) satisfies z.ZodType<ImageAnalysisResult>,
        messages: [
          {
            role: "user" as const,
            content: [
              { type: "text" as const, text: userPrompt ?? "Analyze this image for composition and balance." },
              { type: "image" as const, image: imageData },
            ],
          },
        ],
      });

      return analysis.object;
    });

    return { success: true, result };
  }
);

