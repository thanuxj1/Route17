"use client"

import { useEffect, useState } from "react"
import "./AnimatedMessages.css"

const messages = [
  {
    text: "This timetable is updated monthly to reflect working and non-working buses at the time.",
    icon: "ℹ️",
    type: "info",
  },
  {
    text: "Times may change due to traffic, weather, or other unavoidable reasons. Please arrive 5–10 minutes early to the bus stop.",
    icon: "⚠️",
    type: "warning",
  },
]

function AnimatedMessages() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)

      setTimeout(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % messages.length)
        setIsVisible(true)
      }, 500)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const currentMessage = messages[currentMessageIndex]

  return (
    <div className="notification-container">
      <div className={`notification ${currentMessage.type} ${isVisible ? "visible" : "hidden"}`}>
        <div className="notification-icon">{currentMessage.icon}</div>
        <div className="notification-content">
          <div className="notification-text">{currentMessage.text}</div>
        </div>
        <div className="notification-close">
          <span>×</span>
        </div>
      </div>
    </div>
  )
}

export default AnimatedMessages
