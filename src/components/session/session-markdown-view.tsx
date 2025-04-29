import type { SessionData } from "@/components/session-calendar"
import { format } from "date-fns"

interface SessionMarkdownViewProps {
  data: SessionData[]
}

export function SessionMarkdownView({ data }: SessionMarkdownViewProps) {
  return (
    <div className="space-y-6 font-mono text-sm">
      {data.map((dayData) => (
        <div key={dayData.date} className="space-y-2">
          <h3 className="font-bold">{format(new Date(dayData.date), "EEEE, dd MMMM yyyy")}</h3>
          <div className="space-y-1 pl-2">
            {dayData.sessions.map((session, index) => {
              const category = session.divisionName || session.tags?.[0] || "General"

              return (
                <div key={session.id || index} className="space-y-0">
                  <div>
                    - <strong>{category}</strong>
                  </div>
                  <div className="pl-2">{session.title}</div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
