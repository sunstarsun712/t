"use client"

import { motion } from "framer-motion"
import {
  Sun,
  Moon,
  Bell,
  Shield,
  Palette,
  ChevronRight,
  Monitor,
} from "lucide-react"
import { useTheme } from "next-themes"
import { GlassCard, GlassIcon } from "@/components/glass"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
}

export function SettingsView() {
  const { theme, setTheme } = useTheme()

  const themeOptions = [
    { id: "light", label: "Light", icon: Sun },
    { id: "dark", label: "Dark", icon: Moon },
    { id: "system", label: "Auto", icon: Monitor },
  ]

  const settingItems = [
    {
      icon: Bell,
      label: "Notifications",
      description: "Push, email, in-app",
      color: "#FF3B30",
    },
    {
      icon: Shield,
      label: "Privacy",
      description: "Data and permissions",
      color: "#34C759",
    },
    {
      icon: Palette,
      label: "Appearance",
      description: "Colors and layout",
      color: "#AF52DE",
    },
  ]

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-4 px-5 pb-28 pt-4"
    >
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Settings
        </h1>
        <p className="mt-1 text-sm text-foreground/50">
          Customize your experience
        </p>
      </motion.div>

      {/* Profile Card */}
      <motion.div variants={item}>
        <GlassCard className="flex items-center gap-4 p-5" interactive={false}>
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#007AFF] text-lg font-bold text-white">
            AK
          </div>
          <div className="flex-1">
            <p className="text-base font-semibold tracking-tight text-foreground">
              Alex Kim
            </p>
            <p className="text-sm text-foreground/50">Designer</p>
          </div>
          <ChevronRight size={16} className="text-foreground/25" />
        </GlassCard>
      </motion.div>

      {/* Theme Switcher */}
      <motion.div variants={item}>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground/40">
          Theme
        </h2>
        <div className="grid grid-cols-3 gap-2">
          {themeOptions.map((opt) => {
            const isActive = theme === opt.id
            const Icon = opt.icon
            return (
              <motion.button
                key={opt.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTheme(opt.id)}
                className={`glass-card relative flex flex-col items-center gap-2 rounded-2xl p-4 ${
                  isActive ? "ring-2 ring-[#007AFF]" : ""
                }`}
              >
                <Icon
                  size={20}
                  className={
                    isActive ? "text-[#007AFF]" : "text-foreground/40"
                  }
                />
                <span
                  className={`text-xs font-semibold ${
                    isActive ? "text-[#007AFF]" : "text-foreground/50"
                  }`}
                >
                  {opt.label}
                </span>
              </motion.button>
            )
          })}
        </div>
      </motion.div>

      {/* Setting Items */}
      <motion.div variants={item}>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground/40">
          Preferences
        </h2>
        <div className="flex flex-col gap-2">
          {settingItems.map((s) => (
            <GlassCard key={s.label} className="p-4">
              <div className="flex items-center gap-3">
                <GlassIcon
                  icon={s.icon}
                  size="md"
                  iconClassName="text-foreground/70"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold tracking-tight text-foreground">
                    {s.label}
                  </p>
                  <p className="text-xs text-foreground/40">
                    {s.description}
                  </p>
                </div>
                <ChevronRight size={14} className="text-foreground/20" />
              </div>
            </GlassCard>
          ))}
        </div>
      </motion.div>

      {/* Version */}
      <motion.div
        variants={item}
        className="flex justify-center pb-4 pt-2"
      >
        <span className="text-[10px] font-medium text-foreground/20">
          Liquid Glass v1.0
        </span>
      </motion.div>
    </motion.div>
  )
}
