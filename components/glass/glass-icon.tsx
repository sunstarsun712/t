"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface GlassIconProps {
  icon: LucideIcon
  className?: string
  iconClassName?: string
  size?: "sm" | "md" | "lg"
  color?: string
}

const sizes = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
}

const iconSizes = {
  sm: 14,
  md: 18,
  lg: 22,
}

export function GlassIcon({
  icon: Icon,
  className,
  iconClassName,
  size = "md",
  color,
}: GlassIconProps) {
  return (
    <motion.div
      className={cn(
        "glass-icon flex items-center justify-center rounded-2xl",
        sizes[size],
        className
      )}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <Icon
        size={iconSizes[size]}
        className={cn("text-foreground/80", iconClassName)}
        style={color ? { color } : undefined}
      />
    </motion.div>
  )
}
