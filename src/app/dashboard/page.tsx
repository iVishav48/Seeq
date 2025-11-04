import { Database, ImageIcon, Ruler, Save, Sparkles, Wrench } from "lucide-react";
import { DashboardCard } from "./_components/dashboardCard";

export default function DashboardPage() {
  return (
    <div className="space-y-8 p-6 md:p-8 lg:p-10">
      {/* Header */}
      <div className="space-y-2 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-base">
          Welcome to your AI-powered analysis workspace
        </p>
      </div>

      {/* Main Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl">
        {/* AI Analysis Tools Card */}
        <DashboardCard
          icon={
            <div className="relative">
              <Wrench className="h-6 w-6 text-primary" />
              <Sparkles className="h-3 w-3 text-primary absolute -top-1 -right-1 opacity-60" />
            </div>
          }
          title="AI Analysis Tools"
          description="Access powerful AI-driven tools including Golden Ratio Analyzer and Image Analyzer. Interact through natural conversations, queries, or AI-assisted questions to get comprehensive insights."
          features={[
            "Golden Ratio Analyzer for image composition",
            "Image Analysis with AI-powered insights",
            "Natural language chat interface",
            "Query-based analysis and recommendations"
          ]}
          href="/dashboard/golden-ratio"
          gradient="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent"
          className="group"
        />

        {/* Automatic History Card */}
        <DashboardCard
          icon={
            <div className="relative">
              <Save className="h-6 w-6 text-primary" />
              <Database className="h-3 w-3 text-primary absolute -bottom-1 -right-1 opacity-60" />
            </div>
          }
          title="Automatic History"
          description="All your AI conversations, queries, and analysis sessions are automatically saved. Review your history anytime to track insights, compare results, or continue previous work."
          features={[
            "Auto-save all chat conversations",
            "Persistent query history",
            "Analysis session tracking",
            "Easy access to past insights"
          ]}
          href="#"
          gradient="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent"
          className="group"
        />
      </div>

      {/* Quick Access Cards */}
      <div className="mt-12">
        <h2 className="text-lg font-semibold mb-4 text-muted-foreground">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-7xl">
          <DashboardCard
            icon={
              <Ruler className="h-5 w-5 text-primary" />
            }
            title="Golden Ratio Analyzer"
            description="Analyze image composition and detect golden ratio patterns with AI-powered precision."
            href="/dashboard/golden-ratio"
            gradient="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent"
            className="h-full"
          />

          <DashboardCard
            icon={
              <ImageIcon className="h-5 w-5 text-primary" />
            }
            title="Image Analysis"
            description="Upload images and get detailed AI analysis including object detection and quality metrics."
            href="/dashboard/image-analysis"
            gradient="bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent"
            className="h-full"
          />
        </div>
      </div>
    </div>
  )
}