"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"

interface CalendarSectionProps {
  tasks: any[]
}

export function CalendarSection({
  tasks
}: CalendarSectionProps) {

  const [date, setDate] = useState<Date | undefined>(
    new Date()
  )

  const selectedTasks = tasks.filter((task) => {

    if (!date) return false

    const taskDate = new Date(task.dueDate)

    return (
      taskDate.toDateString() ===
      date.toDateString()
    )
  })

  return (

  <div className="glass rounded-2xl p-6 space-y-6">

    {/* Calendar */}
    <div>

      <h2 className="text-xl font-bold mb-4">
        Study Calendar
      </h2>
      <div className="w-full overflow-hidden"></div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="
rounded-2xl
border
border-white/10
bg-black/20
p-4
w-full
shadow-xl
"
      />

    </div>

    {/* Tasks */}
    <div>

      <h3 className="text-lg font-semibold mb-3">
        Tasks For Selected Date
      </h3>

      <div className="space-y-3 max-h-72 overflow-y-auto">

        {selectedTasks.length > 0 ? (

          selectedTasks.map((task) => (

            <div
              key={task._id}
              className="p-3 rounded-xl bg-white/5 border border-white/10"
            >

              <p className="font-medium">
                {task.title}
              </p>

              <p className="text-sm text-muted-foreground">
                {task.completed
                  ? "Completed ✅"
                  : "Pending ⏳"}
              </p>

            </div>

          ))

        ) : (

          <p className="text-sm text-muted-foreground">
            No tasks for this date
          </p>

        )}

      </div>

    </div>

  </div>

)

}