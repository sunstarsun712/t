"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FloatingIslandProps {
  children: React.ReactNode
  className?: string
}

export function FloatingIsland({ children, className }: FloatingIslandProps) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.1 }}
      className={cn(
        "glass-strong rounded-4xl px-5 py-3",
        className
      )}
    >
      {children}
    </motion.div>
  )
}
