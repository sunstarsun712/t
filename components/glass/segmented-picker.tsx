"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SegmentedPickerProps {
  segments: string[]
  activeSegment: string
  onSegmentChange: (segment: string) => void
  className?: string
}

export function SegmentedPicker({
  segments,
  activeSegment,
  onSegmentChange,
  className,
}: SegmentedPickerProps) {
  return (
    <div
      className={cn(
        "glass-subtle flex items-center gap-1 rounded-2xl p-1",
        className
      )}
    >
      {segments.map((segment) => {
        const isActive = activeSegment === segment
        return (
          <button
            key={segment}
            onClick={() => onSegmentChange(segment)}
            className={cn(
              "relative flex-1 rounded-xl px-4 py-2 text-xs font-semibold tracking-tight transition-colors",
              isActive ? "text-foreground" : "text-foreground/50"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="segment-indicator"
                className="absolute inset-0 rounded-xl bg-background/80 shadow-sm dark:bg-foreground/10"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{segment}</span>
          </button>
        )
      })}
    </div>
  )
}
