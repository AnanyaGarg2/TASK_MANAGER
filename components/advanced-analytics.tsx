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
  LineChart,
  Line,
} from "recharts"

interface AdvancedAnalyticsProps {
  tasks: any[]
}

export function AdvancedAnalytics({
  tasks
}: AdvancedAnalyticsProps) {

  const completed =
    tasks.filter((t) => t.completed).length

  const pending =
    tasks.filter((t) => !t.completed).length

  const overdue =
    tasks.filter(
      (t) =>
        !t.completed &&
        new Date(t.dueDate) < new Date()
    ).length

  // PIE DATA
  const pieData = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
    { name: "Overdue", value: overdue },
  ]

  const COLORS = [
  "url(#greenGradient)",
  "url(#blueGradient)",
  "url(#redGradient)",
]

  // WEEKLY DATA
  const weeklyMap: Record<string, number> = {}

  tasks.forEach((task) => {

    const date = new Date(
      task.dueDate
    ).toLocaleDateString()

    weeklyMap[date] =
      (weeklyMap[date] || 0) + 1
  })

  const weeklyData = Object.keys(
    weeklyMap
  ).map((date) => ({
    date,
    tasks: weeklyMap[date],
  }))

  return (

    <div className="glass rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        Advanced Analytics
      </h2>

      <div className="grid lg:grid-cols-2 gap-6">

        {/* PIE */}
        <div className="glass rounded-xl p-4">

          <h3 className="font-semibold mb-4">
            Task Distribution
          </h3>

          <div className="h-[300px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>
                <defs>

  <linearGradient
    id="greenGradient"
    x1="0"
    y1="0"
    x2="1"
    y2="1"
  >
    <stop
      offset="0%"
      stopColor="#188941"
    />
    <stop
      offset="100%"
      stopColor="#19c555"
    />
  </linearGradient>

  <linearGradient
    id="blueGradient"
    x1="0"
    y1="0"
    x2="1"
    y2="1"
  >
    <stop
      offset="0%"
      stopColor="#0f4cae"
    />
    <stop
      offset="100%"
      stopColor="#114786"
    />
  </linearGradient>

  <linearGradient
    id="redGradient"
    x1="0"
    y1="0"
    x2="1"
    y2="1"
  >
    <stop
      offset="0%"
      stopColor="#b71b1b"
    />
    <stop
      offset="100%"
      stopColor="#bf3a3a"
    />
  </linearGradient>

</defs>

                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={100}
                  label
                >

                  {pieData.map((entry, index) => (

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

        {/* BAR */}
        <div className="glass rounded-xl p-4">

          <h3 className="font-semibold mb-4">
            Weekly Tasks
          </h3>

          <div className="h-[300px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart data={weeklyData}>

                <CartesianGrid
  stroke="rgba(255,255,255,0.08)"
  strokeDasharray="3 3"
/>

                <XAxis dataKey="date" />

                <YAxis />

                <Tooltip />
                 <defs>

  <linearGradient
    id="barGradient"
    x1="0"
    y1="0"
    x2="0"
    y2="1"
  >
    <stop
      offset="0%"
      stopColor="#6435d2"
    />

    <stop
      offset="100%"
      stopColor="#4d2dcb"
    />

  </linearGradient>

</defs>
                <Bar
                  dataKey="tasks"
                  fill="url(#barGradient)"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

      {/* LINE CHART */}
      <div className="glass rounded-xl p-4 mt-6">

        <h3 className="font-semibold mb-4">
          Productivity Trend
        </h3>

        <div className="h-[350px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <LineChart data={weeklyData}>

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="date" />

              <YAxis />

              <Tooltip />
              <defs>

  <linearGradient
    id="lineGradient"
    x1="0"
    y1="0"
    x2="1"
    y2="0"
  >

    <stop
      offset="0%"
      stopColor="#22c55e"
    />

    <stop
      offset="100%"
      stopColor="#86efac"
    />

  </linearGradient>

</defs>

              <Line
                type="monotone"
                dataKey="tasks"
                stroke="url(#lineGradient)"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  )
}