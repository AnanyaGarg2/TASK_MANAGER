"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface ProductivityGraphProps {
  tasks: any[]
}

export function ProductivityGraph({
  tasks
}: ProductivityGraphProps) {

  // GROUP COMPLETED TASKS BY DATE
  const completedTasks = tasks.filter(
    (task) => task.completed
  )

  const groupedData: Record<string, number> = {}

  completedTasks.forEach((task) => {

    const date = new Date(
      task.dueDate
    ).toLocaleDateString()

    groupedData[date] =
      (groupedData[date] || 0) + 1
  })

  const data = Object.keys(groupedData).map(
    (date) => ({
      date,
      tasks: groupedData[date],
    })
  )

  return (
    <div className="glass rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        Productivity Graph
      </h2>

      <div className="h-[350px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="tasks"
              stroke="#8b5cf6"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  )
}