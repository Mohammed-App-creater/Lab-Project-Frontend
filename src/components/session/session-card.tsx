import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type SessionStatus = "planned" | "started" | "ended"

export interface SessionCardProps {
  title: string
  division: string
  description: string
  date: string
  groups?: Array<{ id: string; name: string }>
  status: SessionStatus
  timeLeft?: string
  timeAgo?: string
  venue?: string
}

export function SessionCard({
  title,
  division,
  description,
  date,
  groups = [],
  status,
  timeLeft,
  timeAgo,
  venue = "Lab 1",
}: SessionCardProps) {
  const statusColors = {
    planned: "bg-yellow-100 text-yellow-800",
    started: "bg-green-100 text-green-800",
    ended: "bg-red-100 text-red-800",
  }

  const timeDisplay = status === "ended" ? timeAgo : timeLeft

  return (
    <Card className="mb-4 overflow-hidden">
      <CardHeader className="pb-2 pt-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={cn("font-medium capitalize", statusColors[status])}>
              {status}
            </Badge>
            <span className="font-semibold">{title}</span>
          </div>
          {timeDisplay && <span className="text-sm font-medium">{timeDisplay}</span>}
        </div>
      </CardHeader>
      <CardContent className="pb-4 pt-0">
        <p className="mb-1 text-base font-medium">{description}</p>
        <p className="mb-3 text-sm text-muted-foreground">{date}</p>

        <div className="flex flex-wrap items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {groups.map((group) => (
              <Badge key={group.id} variant="outline" className="bg-gray-100">
                {group.name}
              </Badge>
            ))}
            {groups.length === 0 && (
              <Badge variant="outline" className="bg-gray-100">
                Members
              </Badge>
            )}
          </div>
          {venue && <div className="text-sm text-muted-foreground">Venue: {venue}</div>}
        </div>
      </CardContent>
    </Card>
  )
}
