"use client"

import { motion } from "framer-motion"
import { Mail, MoreHorizontal } from "lucide-react"
import { GlassCard, GlassIcon } from "@/components/glass"
import { users, tasks } from "@/lib/data"

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

const roleColors: Record<string, string> = {
  Designer: "#007AFF",
  Engineer: "#34C759",
  PM: "#FF9500",
}

export function TeamView() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-4 px-5 pb-28 pt-4"
    >
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Team
        </h1>
        <p className="mt-1 text-sm text-foreground/50">
          {users.length} members
        </p>
      </motion.div>

      <motion.div variants={item} className="flex flex-col gap-3">
        {users.map((user) => {
          const userTasks = tasks.filter((t) => t.assignee.id === user.id)
          const completedTasks = userTasks.filter((t) => t.status === "Done")
          const inProgressTasks = userTasks.filter(
            (t) => t.status === "In Progress"
          )
          return (
            <GlassCard key={user.id} className="p-4" interactive={false}>
              <div className="flex items-start gap-3">
                <div
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl text-sm font-bold text-white"
                  style={{
                    backgroundColor: roleColors[user.role] || "#8E8E93",
                  }}
                >
                  {user.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold tracking-tight text-foreground">
                        {user.name}
                      </p>
                      <p
                        className="text-xs font-medium"
                        style={{
                          color: roleColors[user.role] || "#8E8E93",
                        }}
                      >
                        {user.role}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <GlassIcon icon={Mail} size="sm" />
                      <GlassIcon icon={MoreHorizontal} size="sm" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-[#34C759]" />
                      <span className="text-[10px] font-semibold text-foreground/50">
                        {completedTasks.length} done
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-[#007AFF]" />
                      <span className="text-[10px] font-semibold text-foreground/50">
                        {inProgressTasks.length} active
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-foreground/15" />
                      <span className="text-[10px] font-semibold text-foreground/50">
                        {userTasks.length} total
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          )
        })}
      </motion.div>
    </motion.div>
  )
}
