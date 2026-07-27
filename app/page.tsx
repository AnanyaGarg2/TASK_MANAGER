"use client"

import { useState, useEffect } from "react"
import { LoginPage } from "@/components/login-page"
import { Dashboard } from "@/components/dashboard"

export default function Home() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [user, setUser] = useState<{
    name: string
    email: string
  } | null>(null)

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const token = localStorage.getItem("token")

    const savedUser = localStorage.getItem("user")

    if (token && savedUser) {

      setIsLoggedIn(true)

      setUser(JSON.parse(savedUser))
    }

  }, [])

  // Prevent rendering until after hydration
  if (!mounted) {
    return null
  }

  const handleLogin = (
    email: string,
    password: string
  ) => {

    const loggedUser = {
      name: email.split("@")[0],
      email,
    }

    localStorage.setItem(
      "user",
      JSON.stringify(loggedUser)
    )

    setUser(loggedUser)

    setIsLoggedIn(true)
  }

  const handleLogout = () => {

    localStorage.removeItem("token")

    localStorage.removeItem("user")

    setUser(null)

    setIsLoggedIn(false)
  }

  if (!isLoggedIn) {

    return (
      <LoginPage onLogin={handleLogin} />
    )
  }

  return (
    <Dashboard
      user={user!}
      onLogout={handleLogout}
    />
  )
}