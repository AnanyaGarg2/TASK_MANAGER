"use client"
import axios from "axios"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BookOpen, Brain, Sparkles, Eye, EyeOff } from "lucide-react"

interface LoginPageProps {
  onLogin: (email: string, password: string) => void
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    // Validate inputs
    if (isLogin) {
      if (!email || !password) {
        setError("Please enter email and password")
        return
      }
    } else {
      if (!name || !email || !password) {
        setError("Please fill in all fields (Name, Email, Password)")
        return
      }
    }
    
    setIsLoading(true)

    try {
      const endpoint = isLogin
        ? "login"
        : "register"

      const body = isLogin
        ? { email, password }
        : { name, email, password }

      const res = await axios.post(
        `http://localhost:5000/${endpoint}`,
        body
      )

      if (isLogin) {
        localStorage.setItem(
          "token",
          res.data.token
        )

        onLogin(email, password)
      } else {
        alert("✅ Account Created Successfully!")
        setIsLogin(true)
        setEmail("")
        setPassword("")
        setName("")
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "Authentication failed"
      setError(errorMessage)
      console.error("Auth error:", error)
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background bg-grid relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo and branding */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl glass glow-primary mb-4">
              <Brain className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-gradient mb-2">StudyAI</h1>
            <p className="text-muted-foreground">Your AI-powered study companion</p>
          </div>

          {/* Login form */}
          <div className="glass rounded-2xl p-8 glow-primary">
            {error && (
              <div className="mb-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-secondary/50 border-glass-border focus:border-primary focus:ring-primary"
                    required
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="student@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-secondary/50 border-glass-border focus:border-primary focus:ring-primary"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-secondary/50 border-glass-border focus:border-primary focus:ring-primary pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-5 glow-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    {isLogin ? "Signing in..." : "Creating account..."}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    {isLogin ? "Sign In" : "Create Account"}
                  </span>
                )}
              </Button>
            </form>

<div className="mt-6 pt-6 border-t border-glass-border">
  <p className="text-center text-sm text-muted-foreground">
    {isLogin
      ? "New to StudyAI?"
      : "Already have an account?"}

    <button
      onClick={() => {
        setIsLogin(!isLogin)
        setError("")
      }}
      className="text-primary hover:underline font-medium ml-1"
    >
      {isLogin ? "Create Account" : "Login"}
    </button>
  </p>
</div>
</div>

          {/* Features preview */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <FeatureCard icon={<Brain className="w-5 h-5" />} label="AI Assistant" />
            <FeatureCard icon={<BookOpen className="w-5 h-5" />} label="Smart Tasks" />
            <FeatureCard icon={<Sparkles className="w-5 h-5" />} label="Progress Track" />
          </div>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="glass rounded-xl p-4 text-center hover:glow-primary transition-all duration-300">
      <div className="text-primary mb-2 flex justify-center">{icon}</div>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  )
}
