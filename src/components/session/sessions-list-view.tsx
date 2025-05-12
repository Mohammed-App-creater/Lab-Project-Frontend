"use client"

import { Badge } from "@/components/ui/badge"

export interface SessionGroup {
  id: string
  name: string
}

export interface SessionItem {
  id: string
  status: "Planned" | "Started" | "Ended"
  division: string
  title: string
  date: string
  groups: SessionGroup[]
  venue: string
  timeRemaining?: string
  timeAgo?: string
}

interface SessionsListViewProps {
  sessions: SessionItem[]
}

export function SessionsListView({ sessions }: SessionsListViewProps) {
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Started":
        return "bg-green-100 text-green-800 border-green-200"
      case "Planned":
        return "bg-green-100 text-green-800 border-green-200"
      case "Ended":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-4 w-full max-w-full">
      {sessions.map((session) => (
        <div key={session.id} className="rounded-lg border shadow-sm overflow-hidden w-full max-w-full">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={getStatusBadgeClass(session.status)}>
                  {session.status}
                </Badge>
                <h3 className="font-bold">{session.division}</h3>
              </div>
              <div className="text-smd dark:text-white text-black font-bold">{session.timeRemaining || session.timeAgo}</div>
            </div>
            <h3 className="mt-2 text-lg">{session.title}</h3>
            <p className="text-sm text-gray-400">{session.date}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {session.groups.map((group) => (
                <Badge key={group.id} variant="outline" className="bg-white text-gray-800 border-gray-300 border-2">
                  {group.name}
                </Badge>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-end">
              <div className="text-sm text-gray-400">
                Venue: <span className="font-medium">{session.venue}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
