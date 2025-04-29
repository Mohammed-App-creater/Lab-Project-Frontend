"use client"

import type { Session } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"

type SessionCardProps = {
  session: Session
  onAttendanceClick: () => void
}

export default function SessionCard({ session, onAttendanceClick }: SessionCardProps) {
  const statusColor = {
    ended: "text-red-500 bg-red-50",
    planned: "text-green-500 bg-green-50",
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <Badge variant="outline" className={`${statusColor[session.status]} border-0 capitalize`}>
              {session.status}
            </Badge>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={onAttendanceClick}>
              Attendance
            </Button>
          </div>
          <h3 className="text-lg font-semibold">{session.title}</h3>
          <p className="text-sm text-muted-foreground">{session.description}</p>
          <p className="text-xs text-muted-foreground mt-1">{formatDate(session.date)}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {session.groups.map((group) => (
              <Badge key={group.id} variant="outline">
                {group.name}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
