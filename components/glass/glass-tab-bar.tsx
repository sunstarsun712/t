"use client"

import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface TabItem {
  id: string
  label: string
  icon: LucideIcon
}

interface GlassTabBarProps {
  tabs: TabItem[]
  activeTab: string
  onTabChange: (id: string) => void
}

export function GlassTabBar({ tabs, activeTab, onTabChange }: GlassTabBarProps) {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.2 }}
      className="fixed bottom-5 left-5 right-5 z-50"
    >
      <div className="glass-strong mx-auto flex max-w-md items-center justify-around rounded-4xl px-2 py-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          const Icon = tab.icon
          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "relative flex flex-1 flex-col items-center gap-0.5 rounded-3xl px-3 py-2 transition-colors",
                isActive
                  ? "text-[#007AFF]"
                  : "text-foreground/50"
              )}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute inset-0 rounded-3xl bg-[#007AFF]/10 dark:bg-[#007AFF]/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </AnimatePresence>
              <Icon size={20} className="relative z-10" />
              <span className="relative z-10 text-[10px] font-medium tracking-tight">
                {tab.label}
              </span>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}
