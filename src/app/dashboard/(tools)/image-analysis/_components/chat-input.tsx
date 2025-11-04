"use client"

import type React from "react"
import { useForm } from "react-hook-form"
import { useState, useRef } from "react"
import { Lightbulb, Paperclip, Send, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useTRPC } from "@/trpc/client"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

interface ChatInputFormValues {
  message: string
  image: File | null
}

interface ChatInputProps {
  onAnalysisComplete?: (result: any, blobUrl: string, prompt?: string) => void
  onAnalysisStart?: () => void
}

export function ChatInput({ onAnalysisComplete, onAnalysisStart }: ChatInputProps) {

  const trpc = useTRPC();

  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const currentPromptRef = useRef<string | undefined>(undefined)
  
  const analyseImage = useMutation(
    trpc.imageAnalyse.analyseImage.mutationOptions({
      onError:(err)=>{
        toast.error(err.message ?? "Failed to analyse")
      },
      onSuccess :(data)=>{
        toast.success("Image analysis completed", {
          closeButton: true,
        })
        // Pass result to parent component
        if (onAnalysisComplete && data.result) {
          onAnalysisComplete(data.result, data.blobUrl, currentPromptRef.current)
        }
      }
    })
  )

  const form = useForm<ChatInputFormValues>({
    defaultValues: {
      message: "",
      image: null,
    },
  })

  const onSubmit = async (data: ChatInputFormValues) => {
    if (!imagePreview) {
      toast.error("No image selected")
      return
    }

    try {
      // Call onAnalysisStart callback
      onAnalysisStart?.()
      
      const userPrompt = data.message || undefined
      currentPromptRef.current = userPrompt
      
      analyseImage.mutate({
        imageData: imagePreview,
        userPrompt,
        fileName: fileName || undefined,
      })

      form.reset()
      clearImage()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to analyze image")
    }
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      form.setValue("image", file)
      setFileName(file.name)

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const clearImage = () => {
    form.setValue("image", null)
    setImagePreview(null)
    setFileName(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      form.handleSubmit(onSubmit)()
    }
  }

  const canSubmit = form.watch("message").trim() && form.watch("image")

  return (
    <div className="w-full  mx-auto ">
      <Form {...form}>
        <div className="space-y-3">
          {imagePreview && (
            <div className="relative inline-block">
              <div className="relative rounded-lg overflow-hidden border border-border bg-card">
                <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="h-32 w-auto object-cover" />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6"
                  onClick={clearImage}
                >
                  <X size={14} />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1 max-w-[200px] truncate">{fileName}</p>
            </div>
          )}

          <div className="flex items-center gap-3  rounded-lg bg-card text-card-foreground shadow-sm transition-colors duration-200 border border-border h-20 p-4">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-muted-foreground hover:text-foreground"
                aria-label="Tips"
              >
                <Lightbulb size={20} />
              </Button>
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex-1 m-0">
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Ask anything about your image..."
                      className="appearance-none border-0 bg-background focus-visible:ring-0 focus-visible:ring-offset-0  h-20  w-full text-base outline-none resize-none"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex items-center gap-2">
              <Input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-muted-foreground hover:text-foreground"
                aria-label="Attachment"
                onClick={() => fileInputRef.current?.click()}
              >
                <Paperclip size={20} />
              </Button>
              <Button
                type="button"
                size="icon"
                className="h-9 w-9 bg-yellow-600 text-white hover:bg-cyan-600 disabled:opacity-50"
                aria-label="Send"
                disabled={!canSubmit}
                onClick={() => form.handleSubmit(onSubmit)()}
              >
                <Send size={20} />
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  )
}

