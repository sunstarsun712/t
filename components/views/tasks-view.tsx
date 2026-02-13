"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Circle,
  Clock,
  CheckCircle2,
  ChevronRight,
  Flag,
} from "lucide-react"
import { GlassCard, SegmentedPicker, GlassSheet } from "@/components/glass"
import { tasks, type Task, type TaskStatus, type TaskPriority } from "@/lib/data"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
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

const statusIcon: Record<TaskStatus, React.ReactNode> = {
  "To Do": <Circle size={16} className="text-foreground/30" />,
  "In Progress": <Clock size={16} className="text-[#007AFF]" />,
  Done: <CheckCircle2 size={16} className="text-[#34C759]" />,
}

const priorityColor: Record<TaskPriority, string> = {
  High: "#FF3B30",
  Medium: "#FF9500",
  Low: "#8E8E93",
}

export function TasksView() {
  const segments: TaskStatus[] = ["To Do", "In Progress", "Done"]
  const [activeSegment, setActiveSegment] = useState<string>("In Progress")
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const filteredTasks = tasks.filter((t) => t.status === activeSegment)

  return (
    <>
      <div className="flex flex-col gap-4 px-5 pb-28 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Tasks
          </h1>
          <p className="mt-1 text-sm text-foreground/50">
            {tasks.length} total across {new Set(tasks.map((t) => t.project)).size} projects
          </p>
        </motion.div>

        <SegmentedPicker
          segments={segments}
          activeSegment={activeSegment}
          onSegmentChange={setActiveSegment}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSegment}
            variants={container}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-3"
          >
            {filteredTasks.map((task) => (
              <motion.div key={task.id} variants={item}>
                <GlassCard
                  className="p-4"
                  onClick={() => setSelectedTask(task)}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">{statusIcon[task.status]}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <p className="text-sm font-semibold tracking-tight text-foreground">
                          {task.title}
                        </p>
                        <ChevronRight
                          size={14}
                          className="mt-0.5 flex-shrink-0 text-foreground/20"
                        />
                      </div>
                      <p className="mt-1 text-xs text-foreground/50">
                        {task.project}
                      </p>
                      <div className="mt-2.5 flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Flag
                            size={10}
                            style={{ color: priorityColor[task.priority] }}
                          />
                          <span
                            className="text-[10px] font-semibold"
                            style={{ color: priorityColor[task.priority] }}
                          >
                            {task.priority}
                          </span>
                        </div>
                        <span className="text-foreground/15">|</span>
                        <span className="text-[10px] text-foreground/40">
                          Due{" "}
                          {new Date(task.dueDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <div className="ml-auto flex items-center gap-1.5">
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-foreground/10 text-[8px] font-bold text-foreground/60">
                            {task.assignee.avatar}
                          </div>
                        </div>
                      </div>
                      {task.status === "In Progress" && (
                        <div className="mt-3 flex items-center gap-2">
                          <div className="h-1 flex-1 overflow-hidden rounded-full bg-foreground/5">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${task.progress}%` }}
                              transition={{
                                type: "spring",
                                stiffness: 100,
                                damping: 20,
                                delay: 0.2,
                              }}
                              className="h-full rounded-full bg-[#007AFF]"
                            />
                          </div>
                          <span className="text-[10px] font-semibold text-foreground/40">
                            {task.progress}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
            {filteredTasks.length === 0 && (
              <motion.div
                variants={item}
                className="flex flex-col items-center gap-2 py-12"
              >
                <CheckCircle2 size={32} className="text-foreground/15" />
                <p className="text-sm text-foreground/30">No tasks here</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Detail Sheet */}
      <GlassSheet
        open={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        title={selectedTask?.title}
      >
        {selectedTask && <TaskDetail task={selectedTask} />}
      </GlassSheet>
    </>
  )
}

function TaskDetail({ task }: { task: Task }) {
  return (
    <div className="flex flex-col gap-5">
      {/* Status + Priority */}
      <div className="flex items-center gap-3">
        <span
          className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold"
          style={{
            backgroundColor:
              task.status === "Done"
                ? "rgba(52, 199, 89, 0.12)"
                : task.status === "In Progress"
                  ? "rgba(0, 122, 255, 0.12)"
                  : "rgba(142, 142, 147, 0.12)",
            color:
              task.status === "Done"
                ? "#34C759"
                : task.status === "In Progress"
                  ? "#007AFF"
                  : "#8E8E93",
          }}
        >
          {statusIcon[task.status]}
          {task.status}
        </span>
        <span
          className="inline-flex items-center gap-1 rounded-xl px-3 py-1.5 text-xs font-semibold"
          style={{
            backgroundColor: `${priorityColor[task.priority]}15`,
            color: priorityColor[task.priority],
          }}
        >
          <Flag size={10} />
          {task.priority}
        </span>
      </div>

      {/* Description */}
      <div>
        <h3 className="mb-1.5 text-xs font-semibold text-foreground/40">
          Description
        </h3>
        <p className="text-sm leading-relaxed text-foreground/70">
          {task.description}
        </p>
      </div>

      {/* Progress */}
      {task.progress > 0 && task.progress < 100 && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-xs font-semibold text-foreground/40">
              Progress
            </h3>
            <span className="text-xs font-bold text-[#007AFF]">
              {task.progress}%
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-foreground/5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${task.progress}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="h-full rounded-full bg-[#007AFF]"
            />
          </div>
        </div>
      )}

      {/* Details */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between rounded-2xl bg-foreground/[0.03] px-4 py-3">
          <span className="text-xs text-foreground/40">Assignee</span>
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground/10 text-[9px] font-bold text-foreground/60">
              {task.assignee.avatar}
            </div>
            <span className="text-xs font-semibold text-foreground/70">
              {task.assignee.name}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-foreground/[0.03] px-4 py-3">
          <span className="text-xs text-foreground/40">Project</span>
          <span className="text-xs font-semibold text-foreground/70">
            {task.project}
          </span>
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-foreground/[0.03] px-4 py-3">
          <span className="text-xs text-foreground/40">Due Date</span>
          <span className="text-xs font-semibold text-foreground/70">
            {new Date(task.dueDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Tags */}
      <div>
        <h3 className="mb-2 text-xs font-semibold text-foreground/40">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {task.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-xl bg-foreground/[0.05] px-3 py-1 text-[10px] font-semibold text-foreground/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
