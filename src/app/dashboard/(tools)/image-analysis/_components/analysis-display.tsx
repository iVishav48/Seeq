"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Loader2, 
  Sparkles, 
  Palette, 
  Sun, 
  Focus, 
  Grid3x3,
  TrendingUp,
  Lightbulb,
  Image as ImageIcon
} from "lucide-react"
import type { ImageAnalysisResult } from "@/lib/ai/prompts"
import { cn } from "@/lib/utils"

interface AnalysisDisplayProps {
  imageUrl?: string
  userPrompt?: string | null
  result: ImageAnalysisResult | null
  isLoading?: boolean
}

function ScoreCard({ 
  title, 
  score, 
  analysis, 
  icon: Icon,
  color = "primary"
}: { 
  title: string
  score: number
  analysis: string
  icon: React.ComponentType<{ className?: string }>
  color?: "primary" | "secondary" | "success" | "warning"
}) {
  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600 dark:text-green-400"
    if (score >= 6) return "text-yellow-600 dark:text-yellow-400"
    return "text-orange-600 dark:text-orange-400"
  }

  const getProgressColor = (score: number) => {
    if (score >= 8) return "bg-green-500"
    if (score >= 6) return "bg-yellow-500"
    return "bg-orange-500"
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-base">{title}</CardTitle>
          </div>
          <Badge 
            variant={score >= 8 ? "default" : score >= 6 ? "secondary" : "outline"}
            className={cn("text-sm font-semibold", getScoreColor(score))}
          >
            {score.toFixed(1)}/10
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <Progress 
          value={score * 10} 
          className="h-2"
        />
        <p className="text-sm text-muted-foreground leading-relaxed">{analysis}</p>
      </CardContent>
    </Card>
  )
}

function OverallScore({ score, summary }: { score: number; summary: string }) {
  const getScoreGradient = (score: number) => {
    if (score >= 8) return "from-green-500 to-emerald-600"
    if (score >= 6) return "from-yellow-500 to-orange-500"
    return "from-orange-500 to-red-500"
  }

  return (
    <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
      <CardContent className="pt-6">
        <div className="flex items-start gap-6">
          <div className="flex flex-col items-center justify-center min-w-[120px]">
            <div className={cn(
              "text-6xl font-bold bg-gradient-to-br bg-clip-text text-transparent",
              `bg-gradient-to-br ${getScoreGradient(score)}`
            )}>
              {score.toFixed(1)}
            </div>
            <div className="text-sm text-muted-foreground mt-1">Overall Score</div>
            <div className="text-xs text-muted-foreground">out of 10</div>
          </div>
          <div className="flex-1 pt-2">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Summary</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{summary}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function AnalysisDisplay({ imageUrl, userPrompt, result, isLoading }: AnalysisDisplayProps) {
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            Analyzing Image...
          </CardTitle>
          <CardDescription>Your image is being analyzed by AI. This may take a few moments.</CardDescription>
        </CardHeader>
        <CardContent>
          {imageUrl && (
            <div className="relative aspect-video rounded-lg overflow-hidden bg-muted border border-border">
              <img src={imageUrl} alt="Uploaded" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-background/70 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center space-y-3">
                  <Loader2 className="h-10 w-10 animate-spin mx-auto text-primary" />
                  <p className="text-sm font-medium">Processing image analysis...</p>
                  <p className="text-xs text-muted-foreground">Analyzing composition, lighting, and more</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  if (!result) {
    return null
  }

  return (
    <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Main Image Card */}
      {imageUrl && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-primary" />
              <CardTitle>Analyzed Image</CardTitle>
            </div>
            {userPrompt && (
              <CardDescription className="text-base">
                <span className="font-medium">Prompt:</span> {userPrompt}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-border shadow-lg">
              <img 
                src={imageUrl} 
                alt="Analyzed" 
                className="w-full h-full object-cover" 
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Overall Score */}
      <OverallScore score={result.overall.score} summary={result.overall.summary} />

      {/* Individual Scores Grid */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Detailed Analysis</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ScoreCard
            title="Golden Ratio"
            score={result.golden_ratio.score}
            analysis={result.golden_ratio.analysis}
            icon={Grid3x3}
          />
          <ScoreCard
            title="Rule of Thirds"
            score={result.rule_of_thirds.score}
            analysis={result.rule_of_thirds.analysis}
            icon={Grid3x3}
          />
          <ScoreCard
            title="Lighting"
            score={result.lighting.score}
            analysis={result.lighting.analysis}
            icon={Sun}
          />
          <ScoreCard
            title="Color Balance"
            score={result.color_balance.score}
            analysis={result.color_balance.analysis}
            icon={Palette}
          />
          <ScoreCard
            title="Focus & Depth"
            score={result.focus_depth.score}
            analysis={result.focus_depth.analysis}
            icon={Focus}
          />
        </div>
      </div>

      {/* Improvements */}
      {result.overall.improvements && result.overall.improvements.length > 0 && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              <CardTitle>Suggested Improvements</CardTitle>
            </div>
            <CardDescription>AI-generated recommendations to enhance your image</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {result.overall.improvements.map((improvement, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <span className="text-xs font-semibold text-primary">{index + 1}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">{improvement}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
