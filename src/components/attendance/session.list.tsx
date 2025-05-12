"use client"

import { useState } from "react"
import type { Session } from "@/lib/types"

import { Button } from "@/components/ui/button"
import GroupView from "./group.view"
import AttendanceTable from "./attendance.table"
import SessionCard from "./session.card"

type SessionsListProps = {
  sessions: Session[]
}

export default function SessionsList({ sessions }: SessionsListProps) {
  const [activeView, setActiveView] = useState<"sessions" | "groups" | "attendance">("sessions")
  const [activeSession, setActiveSession] = useState<Session | null>(null)
  const [activeGroup, setActiveGroup] = useState<string | null>(null)

  const handleAttendanceClick = (session: Session) => {
    setActiveSession(session)
    setActiveView("groups") // Now redirects to groups view instead of attendance
  }

  const handleGroupAttendanceClick = (groupId: string) => {
    setActiveGroup(groupId)
    setActiveView("attendance")
  }

  const handleBackToSessions = () => {
    setActiveView("sessions")
    setActiveSession(null)
    setActiveGroup(null)
  }

  const handleBackToGroups = () => {
    setActiveView("groups")
    setActiveGroup(null)
  }

  if (activeView === "groups" && activeSession) {
    return (
      <div>
        <Button variant="ghost" onClick={handleBackToSessions} className="mb-4">
          ← Back to Sessions
        </Button>
        <GroupView
          session={activeSession}
          onGroupAttendanceClick={handleGroupAttendanceClick}
        />
      </div>
    )
  }

  if (activeView === "attendance" && activeSession && activeGroup) {
    return (
      <div>
        <div className="flex gap-2 mb-4">
          <Button variant="ghost" onClick={handleBackToSessions}>
            ← Back to Sessions
          </Button>
          <Button variant="ghost" onClick={handleBackToGroups}>
            ← Back to Groups
          </Button>
        </div>
        <AttendanceTable 
          sessionId={activeSession.id} 
          groupId={activeGroup} 
        />
      </div>
    )
  }

  return (
    <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
      {sessions.map((session) => (
        <SessionCard
          key={session.id}
          session={session}
          onAttendanceClick={() => handleAttendanceClick(session)}
        />
      ))}
    </div>
  )
}
