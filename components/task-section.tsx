"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { TaskCard, type Task } from "@/components/task-card"
import { Plus, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"
interface TaskSectionProps {
  tasks: any[]
  fetchTasks: () => void
}

export function TaskSection({
  tasks,
  fetchTasks
}:
 TaskSectionProps) {
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all")
  useEffect(() => {

  tasks.forEach((task) => {

    if (!task.completed) {

      const today = new Date()
      const due = new Date(task.dueDate)

      const diff =
        due.getTime() - today.getTime()

      const days =
        Math.ceil(
          diff / (1000 * 60 * 60 * 24)
        )

      // OVERDUE
      if (days < 0) {

        toast.error(
          `⚠ ${task.title} is overdue`
        )

      }

      // DUE TODAY
      if (days === 0) {

        toast(
          `📚 ${task.title} is due today`
        )

      }

    }

  })

}, [tasks])

  // NEW STATES
  const [title, setTitle] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [editingTask, setEditingTask] = useState<any>(null)

const [editTitle, setEditTitle] = useState("")

const [editDueDate, setEditDueDate] = useState("")
  // TOGGLE COMPLETE
  const toggleTask = async (id: string, completed: boolean) => {
    try {
      await axios.put(`http://localhost:5000/tasks/${id}`, {
        completed: !completed,
      })

      fetchTasks()
    } catch (error) {
      console.log(error)
    }
  }
  const deleteTask = async (id: string) => {

  try {

    await axios.delete(
      `http://localhost:5000/tasks/${id}`
    )

    fetchTasks()

  } catch (error) {

    console.log(error)
  }
}
  // ADD TASK
  const addTask = async () => {
    if (!title) return

    try {
      await axios.post("http://localhost:5000/tasks", {
        title,
        dueDate,
      })

      setTitle("")
      setDueDate("")

      fetchTasks()
    } catch (error) {
      console.log(error)
    }
  }

  // FILTERS
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed
    if (filter === "completed") return task.completed
    return true
  })
  const editTask = async () => {

  try {

    await axios.put(

      `http://localhost:5000/tasks/${editingTask._id}`,

      {
        title: editTitle,
        dueDate: editDueDate,
        completed: editingTask.completed,
      }

    )

    setEditingTask(null)

    fetchTasks()

  } catch (error) {

    console.log(error)
  }
}

  const overdueCount = tasks.filter(
    (task) =>
      !task.completed &&
      new Date(task.dueDate) < new Date()
  ).length

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">

        <div>
          <h2 className="text-xl font-semibold text-foreground">
            Study Tasks
          </h2>

          <p className="text-sm text-muted-foreground">
            {tasks.filter((t) => !t.completed).length} pending tasks

            {overdueCount > 0 && (
              <span className="text-destructive ml-2">
                • {overdueCount} overdue
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* FILTER BUTTONS */}
          <div className="flex glass rounded-lg p-1">
            {(["all", "active", "completed"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  filter === f
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ADD TASK SECTION */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="New study task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="px-4 py-2 rounded-xl bg-black/20 border border-white/10 text-white w-full"
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="px-4 py-2 rounded-xl bg-black/20 border border-white/10 text-white"
        />

        <Button
          onClick={addTask}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Task
        </Button>
      </div>

      {/* TASK LIST */}
      {editingTask && (

  <div className="glass rounded-xl p-4 mb-4 space-y-3">

    <h2 className="text-lg font-bold">
      Edit Task
    </h2>

    <input
      type="text"
      value={editTitle}
      onChange={(e) =>
        setEditTitle(e.target.value)
      }
      className="w-full px-3 py-2 rounded-lg bg-black/20 border border-white/10 text-white"
    />

    <input
      type="date"
      value={editDueDate}
      onChange={(e) =>
        setEditDueDate(e.target.value)
      }
      className="w-full px-3 py-2 rounded-lg bg-black/20 border border-white/10 text-white"
    />

    <div className="flex gap-2">

      <Button onClick={editTask}>
        Save
      </Button>

      <Button
        variant="destructive"
        onClick={() =>
          setEditingTask(null)
        }
      >
        Cancel
      </Button>

    </div>

  </div>

)}
      <div className="space-y-3">

  {filteredTasks.map((task: any) => (

    <TaskCard
      key={task._id}
      task={task}

      onToggle={() =>
        toggleTask(task._id, task.completed)
      }

      onDelete={() =>
        deleteTask(task._id)
      }

      onEdit={() => {

        setEditingTask(task)

        setEditTitle(task.title)

        setEditDueDate(
          task.dueDate?.split("T")[0]
        )
      }}
    />

  ))}

  {filteredTasks.length === 0 && (
    <div className="text-center py-12 text-muted-foreground">
      <Filter className="w-12 h-12 mx-auto mb-3 opacity-50" />
      <p>No tasks found</p>
    </div>
  )}

</div>
    </div>
  )
}