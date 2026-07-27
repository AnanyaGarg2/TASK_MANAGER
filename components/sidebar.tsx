"use client"

import { Brain, LayoutDashboard, CheckSquare, Calendar, Settings, LogOut, BookOpen, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SidebarProps {
  user: { name: string; email: string }
  onLogout: () => void
  isOpen: boolean
  onClose: () => void

  activeSection: string
setActiveSection: (section: string) => void
desktopSidebarOpen: boolean
setDesktopSidebarOpen: (open: boolean) => void
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: CheckSquare, label: "Tasks" },
  { icon: Calendar, label: "Schedule" },
  { icon: BookOpen, label: "Courses" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Settings, label: "Settings" },
]

export function Sidebar({
  user,
  onLogout,
  isOpen,
  onClose,
  activeSection,
  setActiveSection,
  desktopSidebarOpen,
  setDesktopSidebarOpen
}: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen w-72 glass-strong transition-transform duration-300 ease-in-out",
          desktopSidebarOpen
  ? "lg:translate-x-0"
  : "lg:-translate-x-full",
          isOpen
  ? "translate-x-0"
  : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <div className="flex items-center justify-between mb-8">
            <button
  onClick={() =>
    setDesktopSidebarOpen(
      !desktopSidebarOpen
    )
  }
  className="hidden lg:flex p-2 rounded-lg hover:bg-white/10 transition-all"
>
  ✕
</button>
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center glow-primary">
              <Brain className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-bold text-gradient text-lg">StudyAI</h2>
              <p className="text-xs text-muted-foreground">Smart Learning</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <button
  key={item.label}
  onClick={() => {

  setActiveSection(item.label)

  // only close on mobile
  if (window.innerWidth < 1024) {
    onClose()
  }

  }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                  activeSection === item.label
                  ? "bg-primary/20 text-primary glow-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
            
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>

          {/* User section */}
          <div className="pt-6 border-t border-glass-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-medium text-primary">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              onClick={onLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
