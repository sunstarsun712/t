"use client"

import { motion, type HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
  className?: string
  interactive?: boolean
}

export function GlassCard({
  children,
  className,
  interactive = true,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "glass-card rounded-4xl p-6",
        interactive && "cursor-pointer",
        className
      )}
      whileTap={interactive ? { scale: 0.97 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
