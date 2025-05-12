"use client"

import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"

export interface EventItem {
  id: string
  status: "Planned" | "Started" | "Ended"
  title: string
  description: string
  date: string
  visibility: "Public" | "Members"
  venue: string
  timeRemaining?: string
  timeAgo?: string
}

interface EventsListViewProps {
  events: EventItem[]
}

function calculateCountdown(targetDate: string) {
  const countDown = new Date(targetDate).getTime() - new Date().getTime()
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24))
  const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60))
  return {
    display: countDown <= 0 ? "Started" : `${days}d ${hours}h ${minutes}m left`,
    isPast: countDown <= 0
  }
}

export function EventsListView({ events }: EventsListViewProps) {
  const [countdowns, setCountdowns] = useState<Record<string, string>>({})

  useEffect(() => {
    const updateCountdowns = () => {
      const newCountdowns: Record<string, string> = {}
      events.forEach(event => {
        if (event.status === "Planned") {
          newCountdowns[event.id] = calculateCountdown(event.date).display
        }
      })
      setCountdowns(newCountdowns)
    }

    updateCountdowns() // Initial call
    const interval = setInterval(updateCountdowns, 1000)
    return () => clearInterval(interval)
  }, [events])

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Started":
        return "bg-green-100 text-green-800 border-green-200"
      case "Planned":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Ended":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-4 w-full max-w-full">
      {events.map((event) => {
        const countdownDisplay =
          event.status === "Planned"
            ? countdowns[event.id] ?? "Calculating..."
            : event.timeRemaining || event.timeAgo || ""

        return (
          <div key={event.id} className="rounded-lg border shadow-sm overflow-hidden w-full max-w-full">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={getStatusBadgeClass(event.status)}>
                    {event.status}
                  </Badge>
                  <h3 className="font-bold">{event.title}</h3>
                </div>
                <div className="text-sm font-bold dark:text-white text-black">{countdownDisplay}</div>
              </div>
              <h3 className="mt-2 text-lg">{event.description}</h3>
              <p className="text-sm text-gray-400">{event.date}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className={
                    event.visibility === "Public"
                      ? "bg-blue-100 text-blue-800 border-blue-200"
                      : "bg-purple-100 text-purple-800 border-purple-200"
                  }
                >
                  {event.visibility}
                </Badge>
              </div>
              <div className="mt-3 flex items-center justify-end">
                <div className="text-sm text-gray-400">
                  Venue: <span className="font-medium">{event.venue}</span>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
