"use client"

import axios from "axios"
import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Sparkles, Lightbulb, BookOpen, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Hello! I'm your AI study assistant. I can help you with study tips, explain concepts, create study plans, or answer questions about your coursework. What would you like help with today?",
    timestamp: new Date(),
  },
]

const suggestedPrompts = [
  { icon: Lightbulb, text: "Study tips for exams" },
  { icon: BookOpen, text: "Explain calculus derivatives" },
  { icon: Brain, text: "Create a study schedule" },
]

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)
    try {

  const res = await axios.post(
  `${process.env.NEXT_PUBLIC_API_URL}/ai`,
    {
      message: input,
    }
  )

  const assistantMessage: Message = {
    id: (Date.now() + 1).toString(),
    role: "assistant",
    content: res.data.reply,
    timestamp: new Date(),
  }

  setMessages((prev) => [
    ...prev,
    assistantMessage,
  ])

} catch (error) {

  console.log(error)

  const errorMessage: Message = {
    id: (Date.now() + 1).toString(),
    role: "assistant",
    content:
      "Something went wrong with AI.",
    timestamp: new Date(),
  }

  setMessages((prev) => [
    ...prev,
    errorMessage,
  ])

} finally {

  setIsTyping(false)

}

  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleSuggestion = (text: string) => {
    setInput(text)
  }

  return (
    <div className="glass rounded-2xl h-[600px] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-glass-border flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center glow-accent">
          <Bot className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h2 className="font-semibold text-foreground">AI Study Assistant</h2>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            Online • Ready to help
          </p>
        </div>
        <Sparkles className="w-5 h-5 text-accent ml-auto" />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-3",
              message.role === "user" ? "flex-row-reverse" : "flex-row"
            )}
          >
            <div
              className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                message.role === "user" ? "bg-primary/20" : "bg-accent/20"
              )}
            >
              {message.role === "user" ? (
                <User className="w-4 h-4 text-primary" />
              ) : (
                <Bot className="w-4 h-4 text-accent" />
              )}
            </div>
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-3",
                message.role === "user"
                  ? "bg-primary/20 text-foreground rounded-tr-sm"
                  : "bg-secondary/50 text-foreground rounded-tl-sm"
              )}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
              <Bot className="w-4 h-4 text-accent" />
            </div>
            <div className="bg-secondary/50 rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 2 && (
        <div className="px-4 pb-2 flex flex-wrap gap-2">
          {suggestedPrompts.map((prompt) => (
            <button
              key={prompt.text}
              onClick={() => handleSuggestion(prompt.text)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs glass rounded-full hover:bg-primary/10 transition-colors text-muted-foreground hover:text-foreground"
            >
              <prompt.icon className="w-3 h-3" />
              {prompt.text}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-glass-border">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask me anything about your studies..."
            className="flex-1 bg-secondary/50 border-glass-border focus:border-accent focus:ring-accent"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-accent hover:bg-accent/90 text-accent-foreground glow-accent"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
