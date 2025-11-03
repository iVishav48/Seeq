import { inngest } from "./client";
import { createOpenAI } from "@ai-sdk/openai";

import { generateText } from "ai";

const openai = createOpenAI();


export const execute = inngest.createFunction(
    { id: "execute-ai" },
    { event: "execute/ai" },
    async ({ event, step }) => {


        const { steps: openaiSteps } = await step.ai.wrap(
            "openai-generate-text",
            generateText,
            {
                model: openai("gpt-4.1"),
                system: "You are a helpful assistant",
                prompt: "what is 2+2",
                experimental_telemetry: {
                    isEnabled: true,
                    recordInputs: true,
                    recordOutputs: true,
                }
            }
        );
        return {
            openaiSteps,
        }
    }
)
