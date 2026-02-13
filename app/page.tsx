"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { AnimatePresence, motion } from "framer-motion"
import {
  LayoutDashboard,
  ListChecks,
  Users,
  Settings,
  Search,
} from "lucide-react"
import { FloatingIsland, GlassTabBar } from "@/components/glass"
import { DashboardView } from "@/components/views/dashboard-view"
import { TasksView } from "@/components/views/tasks-view"
import { TeamView } from "@/components/views/team-view"
import { SettingsView } from "@/components/views/settings-view"

const tabs = [
  { id: "home", label: "Home", icon: LayoutDashboard },
  { id: "tasks", label: "Tasks", icon: ListChecks },
  { id: "team", label: "Team", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
]

export default function Page() {
  const [activeTab, setActiveTab] = useState("home")
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const renderView = () => {
    switch (activeTab) {
      case "home":
        return <DashboardView />
      case "tasks":
        return <TasksView />
      case "team":
        return <TeamView />
      case "settings":
        return <SettingsView />
      default:
        return <DashboardView />
    }
  }

  return (
    <div className="relative mx-auto min-h-[100dvh] max-w-md overflow-hidden bg-background">
      {/* Background wallpaper */}
      {mounted && (
        <div
          className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60 transition-opacity duration-700 dark:opacity-40"
          style={{
            backgroundImage: `url(${
              resolvedTheme === "dark"
                ? "/images/bg-dark.jpg"
                : "/images/bg-light.jpg"
            })`,
          }}
        />
      )}

      {/* Gradient overlay for readability */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-background/30 via-transparent to-background/60" />

      {/* Content */}
      <div className="relative z-10">
        {/* Floating Top Bar (Island) */}
        <div className="sticky top-0 z-40 px-5 pt-4">
          <FloatingIsland className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#007AFF] text-[10px] font-bold text-white">
                LG
              </div>
              <span className="text-sm font-semibold tracking-tight text-foreground">
                Liquid Glass
              </span>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="glass-icon flex h-8 w-8 items-center justify-center rounded-xl"
            >
              <Search size={15} className="text-foreground/60" />
            </motion.button>
          </FloatingIsland>
        </div>

        {/* View Content with morph transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="mt-4"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Glass Tab Bar floating at bottom */}
      <GlassTabBar
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  )
}
