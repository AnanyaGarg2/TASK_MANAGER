"use client"

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"

interface AnalyticsSectionProps {
  tasks: any[]
}

export function AnalyticsSection({
  tasks
}: AnalyticsSectionProps) {

  const completedTasks =
    tasks.filter((task) => task.completed).length

  const pendingTasks =
    tasks.filter((task) => !task.completed).length

  const chartData = [
    {
      name: "Completed",
      value: completedTasks,
    },
    {
      name: "Pending",
      value: pendingTasks,
    },
  ]

  const barData = [
    {
      name: "Tasks",
      Completed: completedTasks,
      Pending: pendingTasks,
    },
  ]

  const COLORS = [
    "#16cd77",
    "#af2626",
  ]

  return (
    <div className="glass rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        Analytics Dashboard
      </h2>

      <div className="grid lg:grid-cols-2 gap-6">

        {/* PIE CHART */}
        <div className="glass rounded-xl p-4">

          <h3 className="text-lg font-semibold mb-4">
            Task Status
          </h3>

          <div className="h-[300px]">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={chartData}
                  dataKey="value"
                  outerRadius={100}
                  label
                >

                  {chartData.map((entry, index) => (

                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />

                  ))}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* BAR CHART */}
        <div className="glass rounded-xl p-4">

          <h3 className="text-lg font-semibold mb-4">
            Productivity Overview
          </h3>

          <div className="h-[300px]">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={barData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="Completed"
                  fill="#1a9748"
                />

                <Bar
                  dataKey="Pending"
                  fill="#b61d1d"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </div>
  )
}