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
export interface SessionData {
  date: string;
  events: Event[];
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

    if (!sessions.length) {
      fetchSessions();
    } else {
      setLoading(false);
    }
  }, [sessions.length]);

  function mapSessions(data: APIResponse["data"]): MappedSession[] {
    const groupedByDate: { [date: string]: Event[] } = {}

    const allSessions = [
      { label: "Today", sessions: data.today },
      { label: "Tomorrow", sessions: data.tomorrow },
      { label: "Upcoming", sessions: data.upcoming },
    ]

    allSessions.forEach(({ sessions }) => {
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
    <div className="h-full rounded-lg border bg-card shadow-sm">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Sessions</h2>
          <Database className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h3 className="text-base font-semibold">Upcoming Sessions</h3>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="mb-4">
          <Image
            src="/fully-functionl-calanderq.png"
            alt="Calendar"
            width={500}
            height={300}
            className="h-auto w-full object-cover rounded-lg"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      </div>
   <hr/>
      <div className="px-4 pb-4">
        {sessions.length === 0 ? (
          <div className="text-center text-muted-foreground py-4">No sessions available.</div>
        ) : (
          <div className="space-y-4">
            {sessions.map((session, index) => (
              <div key={index} className="rounded-lg border p-3 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium">{session.date}</h4>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  {session.events.map((event, eventIndex) => (
                    <div key={eventIndex} className="flex">
                      <div className="w-12 text-sm font-medium">{event.time}</div>
                      <div className="ml-3 border-l-2 border-primary pl-3 flex-1">
                        <div className="text-xs text-muted-foreground">{event.department}</div>
                        <div className="text-sm font-medium">{event.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
