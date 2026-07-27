"use client"

import { TrendingUp, Target, Clock, Flame } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface ProgressSectionProps {
  tasks: any[]
}

export function ProgressSection({
  tasks,
}: ProgressSectionProps) {

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length

  const pendingTasks = tasks.filter(
    (task) => !task.completed
  ).length

  const totalTasks = tasks.length

  const weeklyGoal =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        )

  const studyHours = completedTasks * 2

  const streak =
    completedTasks >= 7
      ? 7
      : completedTasks

  const stats = [
    {
      label: "Weekly Goal",
      value: weeklyGoal,
      max: 100,
      unit: "%",
      icon: Target,
      color: "text-primary",
      bgColor: "bg-primary/20",
    },
    {
      label: "Study Hours",
      value: studyHours,
      max: 40,
      unit: "hrs",
      icon: Clock,
      color: "text-accent",
      bgColor: "bg-accent/20",
    },
    {
      label: "Tasks Done",
      value: completedTasks,
      max: totalTasks || 1,
      unit: "tasks",
      icon: TrendingUp,
      color: "text-success",
      bgColor: "bg-success/20",
    },
    {
      label: "Day Streak",
      value: streak,
      max: 7,
      unit: "days",
      icon: Flame,
      color: "text-warning",
      bgColor: "bg-warning/20",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  )
}

interface StatCardProps {
  label: string
  value: number
  max: number
  unit: string
  icon: React.ElementType
  color: string
  bgColor: string
}

function StatCard({
  label,
  value,
  max,
  unit,
  icon: Icon,
  color,
  bgColor,
}: StatCardProps) {

  const percentage = Math.round(
    (value / max) * 100
  )

  return (
    <div className="glass rounded-xl p-5 hover:glow-primary transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-muted-foreground">
            {label}
          </p>

          <p className={`text-2xl font-bold ${color} mt-1`}>
            {value}

            <span className="text-sm font-normal text-muted-foreground ml-1">
              {unit}
            </span>
          </p>
        </div>

        <div className={`p-2 rounded-lg ${bgColor}`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">
            Progress
          </span>

          <span className={color}>
            {percentage}%
          </span>
        </div>

        <Progress
          value={percentage}
          className="h-2 bg-secondary"
        />
      </div>
    </div>
  )
}