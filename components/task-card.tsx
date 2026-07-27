"use client"

import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Circle,
  Trash2,
  Pencil
} from "lucide-react"
import { cn } from "@/lib/utils"

export interface Task {
  id: string
  title: string
  subject: string
  dueDate: Date
  priority: "low" | "medium" | "high"
  completed: boolean
  description?: string
}

interface TaskCardProps {
  task: Task
  onToggle: () => void
  onDelete: () => void
  onEdit: () => void
}

function formatDueDate(date: any): string {
  const due = new Date(date)

  const now = new Date()

  const diff = due.getTime() - now.getTime()

  
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24))

  if (days < 0) return `${Math.abs(days)} day${Math.abs(days) > 1 ? "s" : ""} overdue`
  if (days === 0) return "Due today"
  if (days === 1) return "Due tomorrow"
  return `Due in ${days} days`
}

function isOverdue(date: Date, completed: boolean): boolean {
  return !completed && new Date(date) < new Date()
}

const priorityColors = {
  low: "bg-success/20 text-success",
  medium: "bg-warning/20 text-warning",
  high: "bg-destructive/20 text-destructive",
}

const subjectColors: Record<string, string> = {
  Mathematics: "border-l-chart-1",
  Physics: "border-l-chart-2",
  History: "border-l-chart-3",
  "Computer Science": "border-l-primary",
  English: "border-l-accent",
}

export function TaskCard({
  task,
  onToggle,
  onDelete,
  onEdit
}: TaskCardProps) {
  const overdue = isOverdue(task.dueDate, task.completed)

  return (
    <div
      className={cn(
        "glass rounded-xl p-4 border-l-4 transition-all duration-200 hover:scale-[1.01]",
        subjectColors[task.subject] || "border-l-primary",
        task.completed && "opacity-60",
        overdue && "ring-1 ring-destructive/50"
      )}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={onToggle}
          className={cn(
            "mt-0.5 transition-all duration-200",
            task.completed ? "text-primary" : "text-muted-foreground hover:text-primary"
          )}
        >
          {task.completed ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : (
            <Circle className="w-5 h-5" />
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3
                className={cn(
                  "font-medium text-foreground",
                  task.completed && "line-through text-muted-foreground"
                )}
              >
                {task.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">{task.subject}</p>
            </div>
            <button
  onClick={onEdit}
  className="text-blue-400 hover:text-blue-600 transition-colors"
>
  <Pencil className="w-4 h-4" />
</button>
            <button
  onClick={onDelete}
  className="text-red-400 hover:text-red-600 transition-colors"
>
  <Trash2 className="w-4 h-4" />
</button>
            <span
              className={cn(
                "text-xs font-medium px-2 py-1 rounded-full shrink-0",
                priorityColors[task.priority]
              )}
            >
              {task.priority}
            </span>
          </div>

          {task.description && (
            <p className="text-sm text-muted-foreground mt-2 line-clamp-1">{task.description}</p>
          )}

          <div className="flex items-center gap-4 mt-3">
            <div
              className={cn(
                "flex items-center gap-1.5 text-xs",
                overdue ? "text-destructive" : "text-muted-foreground"
              )}
            >
              {overdue ? (
                <AlertTriangle className="w-3.5 h-3.5" />
              ) : (
                <Calendar className="w-3.5 h-3.5" />
              )}
              {formatDueDate(task.dueDate)}
            </div>
          </div>
        </div>
      </div>

      {/* Overdue warning banner */}
      {overdue && (
        <div className="mt-3 p-2 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-destructive shrink-0" />
          <p className="text-xs text-destructive">
            This task is overdue! Complete it as soon as possible.
          </p>
        </div>
      )}
    </div>
  )
}
