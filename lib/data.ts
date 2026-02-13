export type TaskStatus = "To Do" | "In Progress" | "Done"
export type TaskPriority = "Low" | "Medium" | "High"

export interface User {
  id: string
  name: string
  avatar: string
  role: string
}

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  dueDate: string
  assignee: User
  project: string
  tags: string[]
  progress: number
}

export interface Project {
  id: string
  name: string
  color: string
  tasksCount: number
  completedCount: number
  members: User[]
}

export const users: User[] = [
  { id: "1", name: "Alex Kim", avatar: "AK", role: "Designer" },
  { id: "2", name: "Sarah Chen", avatar: "SC", role: "Engineer" },
  { id: "3", name: "Jordan Lee", avatar: "JL", role: "PM" },
  { id: "4", name: "Maya Patel", avatar: "MP", role: "Engineer" },
  { id: "5", name: "Leo Torres", avatar: "LT", role: "Designer" },
]

export const projects: Project[] = [
  {
    id: "p1",
    name: "iOS Redesign",
    color: "#007AFF",
    tasksCount: 12,
    completedCount: 8,
    members: [users[0], users[1], users[2]],
  },
  {
    id: "p2",
    name: "Backend API",
    color: "#34C759",
    tasksCount: 9,
    completedCount: 5,
    members: [users[1], users[3]],
  },
  {
    id: "p3",
    name: "Marketing Site",
    color: "#FF9500",
    tasksCount: 7,
    completedCount: 3,
    members: [users[0], users[4]],
  },
  {
    id: "p4",
    name: "Analytics",
    color: "#AF52DE",
    tasksCount: 5,
    completedCount: 1,
    members: [users[2], users[3], users[4]],
  },
]

export const tasks: Task[] = [
  {
    id: "t1",
    title: "Design navigation system",
    description:
      "Create a comprehensive navigation system with glass morphism effects, including tab bars, sidebars, and floating action buttons.",
    status: "In Progress",
    priority: "High",
    dueDate: "2026-02-15",
    assignee: users[0],
    project: "iOS Redesign",
    tags: ["Design", "UI"],
    progress: 65,
  },
  {
    id: "t2",
    title: "Implement auth endpoints",
    description:
      "Build secure authentication REST API endpoints with JWT tokens, refresh token rotation, and rate limiting.",
    status: "Done",
    priority: "High",
    dueDate: "2026-02-10",
    assignee: users[1],
    project: "Backend API",
    tags: ["Backend", "Security"],
    progress: 100,
  },
  {
    id: "t3",
    title: "Hero section animations",
    description:
      "Implement smooth scroll-triggered animations for the hero section using Framer Motion spring physics.",
    status: "To Do",
    priority: "Medium",
    dueDate: "2026-02-20",
    assignee: users[4],
    project: "Marketing Site",
    tags: ["Frontend", "Animation"],
    progress: 0,
  },
  {
    id: "t4",
    title: "Dashboard data pipeline",
    description:
      "Set up real-time data streaming pipeline for the analytics dashboard using WebSocket connections.",
    status: "In Progress",
    priority: "High",
    dueDate: "2026-02-18",
    assignee: users[3],
    project: "Analytics",
    tags: ["Data", "Backend"],
    progress: 40,
  },
  {
    id: "t5",
    title: "Component library docs",
    description:
      "Write comprehensive documentation for the glass morphism component library including usage examples.",
    status: "To Do",
    priority: "Low",
    dueDate: "2026-02-25",
    assignee: users[2],
    project: "iOS Redesign",
    tags: ["Docs"],
    progress: 0,
  },
  {
    id: "t6",
    title: "API rate limiter",
    description:
      "Implement token bucket rate limiting algorithm with Redis backing store for all public endpoints.",
    status: "In Progress",
    priority: "Medium",
    dueDate: "2026-02-16",
    assignee: users[1],
    project: "Backend API",
    tags: ["Backend", "Infra"],
    progress: 80,
  },
  {
    id: "t7",
    title: "Testimonials carousel",
    description:
      "Build an auto-scrolling testimonials section with glass card design and smooth spring transitions.",
    status: "To Do",
    priority: "Low",
    dueDate: "2026-02-28",
    assignee: users[0],
    project: "Marketing Site",
    tags: ["Frontend", "UI"],
    progress: 0,
  },
  {
    id: "t8",
    title: "User retention chart",
    description:
      "Create interactive cohort retention chart with drill-down capabilities and export functionality.",
    status: "To Do",
    priority: "Medium",
    dueDate: "2026-02-22",
    assignee: users[2],
    project: "Analytics",
    tags: ["Data", "UI"],
    progress: 0,
  },
]

export const timeline = [
  { date: "Feb 10", label: "Sprint Start", active: false },
  { date: "Feb 13", label: "Today", active: true },
  { date: "Feb 15", label: "Design Review", active: false },
  { date: "Feb 18", label: "Dev Sync", active: false },
  { date: "Feb 20", label: "QA Begin", active: false },
  { date: "Feb 24", label: "Sprint End", active: false },
]
