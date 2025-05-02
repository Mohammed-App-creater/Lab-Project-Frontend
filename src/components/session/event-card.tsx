import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type EventStatus = "planned" | "started" | "ended"
export type EventVisibility = "public" | "members"

export interface EventCardProps {
  title: string
  description: string
  date: string
  visibility: EventVisibility
  status: EventStatus
  timeLeft?: string
  timeAgo?: string
  venue?: string
}

export function EventCard({
  title,
  description,
  date,
  visibility,
  status,
  timeLeft,
  timeAgo,
  venue = "Lab 1",
}: EventCardProps) {
  const statusColors = {
    planned: "bg-yellow-100 text-yellow-800",
    started: "bg-green-100 text-green-800",
    ended: "bg-red-100 text-red-800",
  }

  const visibilityColors = {
    public: "bg-blue-100 text-blue-800",
    members: "bg-purple-100 text-purple-800",
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
          <Badge variant="outline" className={cn("capitalize", visibilityColors[visibility])}>
            {visibility}
          </Badge>
          {venue && <div className="text-sm text-muted-foreground">Venue: {venue}</div>}
        </div>
      </CardContent>
    </Card>
  )
}
