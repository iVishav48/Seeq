"use client"

import { ChatInput } from "./_components/chat-input"
import { AnalysisDisplay } from "./_components/analysis-display"
import { useState } from "react"

export default function ImageAnalysisPage() {
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [userPrompt, setUserPrompt] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <main className="flex flex-col items-center justify-center bg-background w-3/5 gap-4 pb-8">
      <div className="w-full">
        <ChatInput 
          onAnalysisComplete={(result, blobUrl, prompt) => {
            setAnalysisResult(result)
            setImageUrl(blobUrl || null)
            setUserPrompt(prompt || null)
            setIsLoading(false)
          }}
          onAnalysisStart={() => {
            setIsLoading(true)
            setAnalysisResult(null)
          }}
        />
      </div>

      <div className="text-center text-sm text-muted-foreground">
        <p>we provide deep insights about your image, Ask anything about your image...</p>
      </div>

      {/* Display Analysis Results */}
      <AnalysisDisplay
        imageUrl={imageUrl || undefined}
        userPrompt={userPrompt}
        result={analysisResult}
        isLoading={isLoading}
      />
    </main>
  )
}
// TODO : fix responsiveness of this page