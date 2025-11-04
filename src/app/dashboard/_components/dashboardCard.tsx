"use client"

import React from "react"
import { 
  Wrench, 
  MessageSquare, 
  Image as ImageIcon, 
  Ruler, 
  Save, 
  History, 
  ArrowRight,
  Sparkles,
  Database
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface DashboardCardProps {
  icon: React.ReactNode
  title: string
  description: string
  features?: string[]
  href?: string
  gradient?: string
  className?: string
}

export function DashboardCard({ 
  icon, 
  title, 
  description, 
  features, 
  href,
  gradient,
  className 
}: DashboardCardProps) {
  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (href) {
      return (
        <Link href={href} className="block h-full">
          {children}
        </Link>
      )
    }
    return <>{children}</>
  }

  return (
    <CardWrapper>
      <Card
        className={cn(
          "group relative h-full overflow-hidden transition-all duration-300",
          "hover:shadow-2xl hover:scale-[1.02] cursor-pointer",
          "border-border/50 bg-card/50 backdrop-blur-sm",
          "hover:border-primary/50 hover:bg-card/80",
          className
        )}
      >
        {/* Gradient overlay */}
        {gradient && (
          <div
            className={cn(
              "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
              "pointer-events-none",
              gradient
            )}
          />
        )}
        
        {/* Subtle shine effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>

        <CardHeader className="relative z-10 pb-4">
          <div className="flex items-start justify-between mb-3">
            <div className={cn(
              "p-3 rounded-xl transition-all duration-300",
              "bg-muted/50 group-hover:bg-muted/80 group-hover:scale-110",
              "border border-border/50"
            )}>
              {icon}
            </div>
            {href && (
              <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
            )}
          </div>
          <CardTitle className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
            {title}
          </CardTitle>
          <CardDescription className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </CardDescription>
        </CardHeader>

        {features && features.length > 0 && (
          <CardContent className="relative z-10 pt-0">
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors duration-300" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        )}
      </Card>
    </CardWrapper>
  )
}