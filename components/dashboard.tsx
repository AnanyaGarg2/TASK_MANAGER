"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Sidebar } from "@/components/sidebar"
import { TaskSection } from "@/components/task-section"
import { ProgressSection } from "@/components/progress-section"
import { AIAssistant } from "@/components/ai-assistant"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CalendarSection } from "@/components/calendar-section"
import { AnalyticsSection } from "@/components/analytics-section"
import { ProductivityGraph } from "@/components/productivity-graph"
import { AdvancedAnalytics } from "@/components/advanced-analytics"
interface DashboardProps {
  user: { name: string; email: string }
  onLogout: () => void
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true)
    
  const [tasks, setTasks] = useState([])
  const [activeSection, setActiveSection] = useState("Dashboard")
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/tasks")
      setTasks(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {

  fetchTasks()

}, [])
  return (
    <div className="min-h-screen bg-background bg-grid relative">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      {/* Sidebar Toggle Button */}
<Button
  variant="ghost"
  size="icon"
  className="fixed top-4 left-4 z-50 glass"
  onClick={() => {
    if (window.innerWidth >= 1024) {
      setDesktopSidebarOpen(!desktopSidebarOpen)
    } else {
      setSidebarOpen(!sidebarOpen)
    }
  }}
>
  {(sidebarOpen || desktopSidebarOpen) ? (
    <X className="w-5 h-5" />
  ) : (
    <Menu className="w-5 h-5" />
  )}
</Button>

      <div className="flex relative z-10">
        {/* Sidebar */}
    <Sidebar
  user={user}
  onLogout={onLogout}
  isOpen={sidebarOpen}
  onClose={() => setSidebarOpen(false)}
  activeSection={activeSection}
  setActiveSection={setActiveSection}
  desktopSidebarOpen={desktopSidebarOpen}
  setDesktopSidebarOpen={setDesktopSidebarOpen}
/>

        {/* Main content */}
        <main
  className={`flex-1 p-4 lg:p-8 min-h-screen transition-all duration-300 ${
    desktopSidebarOpen
      ? "lg:ml-72"
      : "lg:ml-0"
  }`}
>
          <div className="max-w-7xl mx-auto space-y-6 pt-12 lg:pt-0">
            {/* Header */}
            <header className="flex items-center justify-between mb-8">
  
  <div>
    <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
      Welcome back, <span className="text-gradient">{user.name}</span>
    </h1>

    <p className="text-muted-foreground mt-1">
      {"Let's"} make today productive
    </p>
  </div>

</header>

            {/* Progress Section */}
            <div id="dashboard">
  {activeSection === "Dashboard" && (
  <ProgressSection tasks={tasks} />
)} 
</div>

            {/* Main Grid */}
            {/* DASHBOARD */}
{activeSection === "Dashboard" && (

  <div className="grid lg:grid-cols-5 gap-6">

    <div className="lg:col-span-3">
      <TaskSection
        tasks={tasks}
        fetchTasks={fetchTasks}
      />
    </div>

    <div className="lg:col-span-2 space-y-6">

      <CalendarSection tasks={tasks} />

      <AIAssistant />

    </div>

  </div>

)}

{/* TASKS PAGE */}
{activeSection === "Tasks" && (

  <TaskSection
    tasks={tasks}
    fetchTasks={fetchTasks}
  />

)}

{/* SCHEDULE PAGE */}
{activeSection === "Schedule" && (

  <CalendarSection tasks={tasks} />

)}

{/* ANALYTICS PAGE */}
{activeSection === "Analytics" && (

  <div className="space-y-6">

    <AnalyticsSection tasks={tasks} />

    <ProductivityGraph tasks={tasks} />

    <AdvancedAnalytics tasks={tasks} />

  </div>

)}

          </div>
        </main>
      </div>
    </div>
  )
}