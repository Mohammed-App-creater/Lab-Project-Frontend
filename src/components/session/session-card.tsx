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
    planned: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    started: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    ended: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
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
          {timeDisplay && <span className="text-sm font-medium dark:text-gray-300">{timeDisplay}</span>}
        </div>
      </CardHeader>
      <CardContent className="pb-4 pt-0">
        <p className="mb-1 text-base font-medium dark:text-gray-200">{description}</p>
        <p className="mb-3 text-sm text-muted-foreground dark:text-gray-400">{date}</p>

        <div className="flex flex-wrap items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {groups.map((group) => (
              <Badge key={group.id} variant="outline" className="bg-gray-100 dark:bg-gray-700 dark:text-gray-200">
                {group.name}
              </Badge>
            ))}
            {groups.length === 0 && (
              <Badge variant="outline" className="bg-gray-100 dark:bg-gray-700 dark:text-gray-200">
                Members
              </Badge>
            )}
          </div>
          {venue && <div className="text-sm text-muted-foreground dark:text-gray-400">Venue: {venue}</div>}
        </div>
      </CardContent>
    </Card>
  )
}
