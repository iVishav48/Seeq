import { z } from "zod";
import { createTRPCRouter, protecedProcedure } from "@/trpc/init";
import { put } from "@vercel/blob";
import { TRPCError } from "@trpc/server";
import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { IMAGE_ANALYSIS_SYSTEM_PROMPT, type ImageAnalysisResult } from "@/lib/ai/prompts";

const openai = createOpenAI();

export const aiRouter = createTRPCRouter({
    analyseImage: protecedProcedure
        .input(
            z.object({
                imageData: z.string().min(1, "Image data is required"), 
                userPrompt: z.string().optional(),
                fileName: z.string().optional(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            try {
                const base64Data = input.imageData.includes(',') 
                    ? input.imageData.split(',')[1] 
                    : input.imageData;
                
                const buffer = Buffer.from(base64Data, 'base64');
                
                const mimeMatch = input.imageData.match(/data:image\/([^;]+)/);
                const extension = mimeMatch ? mimeMatch[1] : 'jpeg';
                const fileName = input.fileName || `image-${Date.now()}.${extension}`;
                
                // Upload to Vercel Blob
                const blob = await put(fileName, buffer, {
                    access: 'public',
                    contentType: mimeMatch ? `image/${extension}` : 'image/jpeg',
                    addRandomSuffix: true,
                });

                // Call OpenAI directly to analyze the image
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
                                { type: "text" as const, text: input.userPrompt ?? "Analyze this image for composition and balance." },
                                { type: "image" as const, image: input.imageData },
                            ],
                        },
                    ],
                });

                return { 
                    success: true, 
                    message: "Image analysis completed",
                    blobUrl: blob.url,
                    result: analysis.object,
                };
            } catch (error) {
                console.error("Error analyzing image:", error);
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: error instanceof Error ? error.message : "Failed to analyze image",
                });
            }
        }),
});