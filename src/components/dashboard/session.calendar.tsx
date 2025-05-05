"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ArrowLeft, ChevronRight, Database, MoreVertical } from 'lucide-react'

// Interfaces
interface TimeSlotDetails {
  id: string
  startTime: string
  endTime: string
  date: string
  status: string
}

interface Group {
  id: string
  name: string
  description: string
  updatedAt: string
}

interface SessionGroupsAndTimeSlotDto {
  id: string
  title: string
  description: string
  startMonth: string
  endTMonth: string
  tags: string[]
  location: string
  timeSlots: TimeSlotDetails[]
  groups: Group[]
}

interface APIResponse {
  success: boolean
  message: string
  data: {
    today: SessionGroupsAndTimeSlotDto[]
    tomorrow: SessionGroupsAndTimeSlotDto[]
    upcoming: SessionGroupsAndTimeSlotDto[]
  }
}

interface Event {
  time: string
  department: string
  title: string
}

interface MappedSession {
  date: string
  events: Event[]
}

export default function SessionCalendar() {
  const [sessions, setSessions] = useState<MappedSession[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSessions() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}api/session/sessions?limit=10&page=1`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        const result: APIResponse = await response.json()
        console.log("Fetched API response:", result)

        if (result.success) {
          const mapped = mapSessions(result.data)
          console.log("Mapped Sessions:", mapped)
          setSessions(mapped)
        }
      } catch (error) {
        console.error("Error fetching sessions:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSessions()
  }, [])

  function mapSessions(data: APIResponse["data"]): MappedSession[] {
    const groupedByDate: { [date: string]: Event[] } = {}

    const allSessions = [
      { label: "Today", sessions: data.today },
      { label: "Tomorrow", sessions: data.tomorrow },
      { label: "Upcoming", sessions: data.upcoming },
    ]

    allSessions.forEach(({ label, sessions }) => {
      sessions.forEach((session) => {
        session.timeSlots.forEach((slot) => {
          const dateStr = new Date(slot.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })

          if (!groupedByDate[dateStr]) {
            groupedByDate[dateStr] = []
          }

          groupedByDate[dateStr].push({
            time: new Date(slot.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            department: session.title,
            title: "Session Scheduled",
          })
        })
      })
    })

    return Object.keys(groupedByDate).map((date) => ({
      date,
      events: groupedByDate[date],
    }))
  }

  if (loading) return <div className="p-4">Loading sessions...</div>

  return (
    <div className="w-1/4 h-full  p-5 rounded-lg overflow-hidden shadow-sm border">
      <div className="p-3 sm:p-4 flex items-center justify-between">
        <h2 className="text-base sm:text-lg font-semibold">Sessions</h2>
        <Database className="h-4 w-4 sm:h-5 sm:w-5 text-slate-500" />
      </div>

      <div className="p-3 sm:p-4">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <Button variant="outline" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 bg-[#003087] text-white">
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          <h3 className="text-sm sm:text-base font-bold">Upcoming Sessions</h3>
          <Button variant="outline" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 bg-[#003087] text-white">
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>

        <div>
          <Image
            src="/fully-functionl-calanderq.png"
            alt="Calendar"
            width={100}
            height={100}
            className="h-full w-full object-cover rounded-lg"
          />
        </div>
      </div>

      <div className="px-3 sm:px-4 pb-3 sm:pb-4">
        {sessions.length === 0 && <div className="text-center text-gray-500 mt-3 sm:mt-4">No sessions available.</div>}
        {sessions.map((session, index) => (
          <div key={index} className="mt-3 sm:mt-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs sm:text-sm font-medium text-gray-700">{session.date}</h4>
              <Button variant="ghost" size="icon" className="h-6 w-6 sm:h-8 sm:w-8">
                <MoreVertical className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>

            {session.events.map((event, eventIndex) => (
              <div key={eventIndex} className="mt-2 sm:mt-3 flex">
                <div className="w-10 sm:w-12 text-xs sm:text-sm font-medium">{event.time}</div>
                <div className="ml-2 sm:ml-4 border-l-2 border-primary pl-2 sm:pl-4 flex-1">
                  <div className="text-xs text-gray-500">{event.department}</div>
                  <div className="text-xs sm:text-sm font-medium">{event.title}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
