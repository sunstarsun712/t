"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface GlassSheetProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
  title?: string
}

export function GlassSheet({
  open,
  onClose,
  children,
  className,
  title,
}: GlassSheetProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={cn(
              "fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-[2rem]",
              "glass-strong",
              className
            )}
          >
            <div className="flex flex-col">
              {/* Handle */}
              <div className="flex justify-center pt-3">
                <div className="h-1 w-10 rounded-full bg-foreground/20" />
              </div>
              {/* Header */}
              {title && (
                <div className="flex items-center justify-between px-6 pb-2 pt-4">
                  <h2 className="text-lg font-semibold tracking-tight text-foreground">
                    {title}
                  </h2>
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={onClose}
                    className="glass-icon flex h-8 w-8 items-center justify-center rounded-full"
                  >
                    <X size={16} className="text-foreground/60" />
                  </motion.button>
                </div>
              )}
              {/* Content */}
              <div className="px-6 pb-8 pt-2">{children}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
