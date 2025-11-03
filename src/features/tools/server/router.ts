import { z } from "zod";
import { createTRPCRouter, protecedProcedure } from "@/trpc/init";
import { inngest } from "@/inngest/client";
import { put } from "@vercel/blob";
import { TRPCError } from "@trpc/server";

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
                
                const blob = await put(fileName, buffer, {
                    access: 'public',
                    contentType: mimeMatch ? `image/${extension}` : 'image/jpeg',
                    addRandomSuffix: true,
                });

                // Create analysis record in database
                const analysis = await (ctx as any).imageAnalysis.create({
                    data: {
                        userId: ctx.auth.user.id,
                        imageUrl: blob.url,
                        userPrompt: input.userPrompt,
                        status: 'pending',
                    },
                });

                // Send to Inngest with analysis ID
                await inngest.send({
                    name: "image/analyze",
                    data: {
                        analysisId: analysis.id,
                        imageData: input.imageData, 
                        blobUrl: blob.url, 
                        userPrompt: input.userPrompt,
                    },
                });

                return { 
                    success: true, 
                    message: "Image analysis queued",
                    analysisId: analysis.id,
                    blobUrl: blob.url,
                };
            } catch (error) {
                console.error("Error uploading to Vercel Blob:", error);
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to upload image to storage",
                });
            }
        }),
});