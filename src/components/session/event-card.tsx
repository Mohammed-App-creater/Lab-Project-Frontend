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
    planned: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    started: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    ended: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  }

  const visibilityColors = {
    public: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    members: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  }

  const timeDisplay = status === "ended" ? timeAgo : timeLeft

  return (
    <Card className="mb-4 overflow-hidden dark:bg-gray-800 dark:border-gray-700">
      <CardHeader className="pb-2 pt-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={cn("font-medium capitalize", statusColors[status])}>
              {status}
            </Badge>
            <span className="font-semibold dark:text-gray-200">{title}</span>
          </div>
          {timeDisplay && (
            <span className="text-sm font-medium bg-gray-100 dark:bg-gray-700 dark:text-gray-200 px-2 py-1 rounded-md">
              {timeDisplay}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-4 pt-0">
        <p className="mb-1 text-base font-medium dark:text-gray-200">{description}</p>
        <p className="mb-3 text-sm text-muted-foreground dark:text-gray-400">{date}</p>

        <div className="flex flex-wrap items-center justify-between">
          <Badge variant="outline" className={cn("capitalize", visibilityColors[visibility])}>
            {visibility}
          </Badge>
          {venue && <div className="text-sm text-muted-foreground dark:text-gray-400">Venue: {venue}</div>}
        </div>
      </CardContent>
    </Card>
  )
}
