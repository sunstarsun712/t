"use client"

import { motion } from "framer-motion"
import {
  CheckCircle2,
  Clock,
  TrendingUp,
  Users,
  ArrowUpRight,
} from "lucide-react"
import { GlassCard, GlassIcon } from "@/components/glass"
import { projects, tasks, timeline } from "@/lib/data"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
}

const stats = [
  {
    label: "Completed",
    value: tasks.filter((t) => t.status === "Done").length,
    total: tasks.length,
    icon: CheckCircle2,
    color: "#34C759",
  },
  {
    label: "In Progress",
    value: tasks.filter((t) => t.status === "In Progress").length,
    total: tasks.length,
    icon: Clock,
    color: "#007AFF",
  },
  {
    label: "Productivity",
    value: 87,
    suffix: "%",
    icon: TrendingUp,
    color: "#FF9500",
  },
  {
    label: "Team",
    value: 5,
    suffix: "",
    icon: Users,
    color: "#AF52DE",
  },
]

export function DashboardView() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-5 px-5 pb-28 pt-4"
    >
      {/* Greeting */}
      <motion.div variants={item}>
        <p className="text-sm font-medium text-foreground/50">
          Thursday, Feb 13
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground">
          Good morning, Alex
        </h1>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={item} className="grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <GlassCard key={stat.label} interactive={false} className="p-4">
            <div className="flex items-start justify-between">
              <GlassIcon icon={stat.icon} size="sm" iconClassName="text-foreground/70" />
              <span
                className="text-xs font-semibold"
                style={{ color: stat.color }}
              >
                {stat.label}
              </span>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-bold tracking-tight text-foreground">
                {stat.value}
              </span>
              {stat.total && (
                <span className="text-sm text-foreground/40">
                  /{stat.total}
                </span>
              )}
              {stat.suffix && (
                <span className="text-lg font-semibold text-foreground/60">
                  {stat.suffix}
                </span>
              )}
            </div>
          </GlassCard>
        ))}
      </motion.div>

      {/* Timeline */}
      <motion.div variants={item}>
        <h2 className="mb-3 text-sm font-semibold tracking-tight text-foreground/60">
          Sprint Timeline
        </h2>
        <div className="no-scrollbar flex gap-3 overflow-x-auto pb-2">
          {timeline.map((t, i) => (
            <motion.div
              key={i}
              whileTap={{ scale: 0.95 }}
              className={`flex flex-shrink-0 flex-col items-center gap-1.5 rounded-2xl px-4 py-3 ${
                t.active
                  ? "bg-[#007AFF] text-white shadow-lg shadow-[#007AFF]/25"
                  : "glass-subtle text-foreground/70"
              }`}
            >
              <span className="text-[10px] font-medium uppercase tracking-wider opacity-70">
                {t.date}
              </span>
              <span className="text-xs font-semibold">{t.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Projects */}
      <motion.div variants={item}>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-tight text-foreground/60">
            Projects
          </h2>
          <span className="text-xs font-medium text-[#007AFF]">See All</span>
        </div>
        <div className="flex flex-col gap-3">
          {projects.map((project) => {
            const pct = Math.round(
              (project.completedCount / project.tasksCount) * 100
            )
            return (
              <GlassCard key={project.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-bold text-white"
                      style={{ backgroundColor: project.color }}
                    >
                      {project.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold tracking-tight text-foreground">
                        {project.name}
                      </p>
                      <p className="text-xs text-foreground/50">
                        {project.completedCount}/{project.tasksCount} tasks
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-foreground/70">
                      {pct}%
                    </span>
                    <ArrowUpRight size={14} className="text-foreground/30" />
                  </div>
                </div>
                {/* Progress bar */}
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-foreground/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                      delay: 0.3,
                    }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: project.color }}
                  />
                </div>
                {/* Members */}
                <div className="mt-3 flex -space-x-2">
                  {project.members.map((m) => (
                    <div
                      key={m.id}
                      className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white/50 bg-foreground/10 text-[9px] font-bold text-foreground/70 dark:border-black/30"
                    >
                      {m.avatar}
                    </div>
                  ))}
                </div>
              </GlassCard>
            )
          })}
        </div>
      </motion.div>
    </motion.div>
  )
}
