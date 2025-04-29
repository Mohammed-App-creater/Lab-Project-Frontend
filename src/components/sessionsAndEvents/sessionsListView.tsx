import { Badge } from "@/components/ui/badge"

interface SessionGroup {
  id: string
  name: string
}

interface Session {
  id: string
  status: "Planned" | "Ended"
  division: string
  title: string
  date: string
  groups: SessionGroup[]
  venue: string
  timeRemaining?: string
  timeAgo?: string
}

const sampleSessions: Session[] = [
  {
    id: "1",
    status: "Planned",
    division: "Dev Division",
    title: "Development weekly session",
    date: "Wednesday, 05 July 2023",
    groups: [
      { id: "1", name: "Group 1" },
      { id: "2", name: "Group 2" },
      { id: "3", name: "Group 1" },
    ],
    venue: "Lab 1",
    timeRemaining: "1d 12h 31m left",
  },
  {
    id: "2",
    status: "Planned",
    division: "Dev Division",
    title: "Development weekly session",
    date: "Wednesday, 05 July 2023",
    groups: [
      { id: "1", name: "Group 1" },
      { id: "2", name: "Group 2" },
      { id: "3", name: "Group 1" },
    ],
    venue: "Lab 1",
    timeRemaining: "1d 12h 31m left",
  },
  {
    id: "3",
    status: "Ended",
    division: "Dev Division",
    title: "Development weekly session",
    date: "Wednesday, 05 July 2023",
    groups: [
      { id: "1", name: "Group 1" },
      { id: "2", name: "Group 2" },
      { id: "3", name: "Group 1" },
    ],
    venue: "Lab 1",
    timeAgo: "1d 12h 3m ago",
  },
  {
    id: "4",
    status: "Planned",
    division: "Dev Division",
    title: "Development weekly session",
    date: "Wednesday, 05 July 2023",
    groups: [
      { id: "1", name: "Group 1" },
      { id: "2", name: "Group 2" },
      { id: "3", name: "Group 1" },
    ],
    venue: "Lab 1",
    timeRemaining: "1d 12h 31m left",
  },
]

export function SessionsListView() {
  return (
    <div className="space-y-4">
      {sampleSessions.map((session) => (
        <div key={session.id} className="rounded-lg border shadow-sm overflow-hidden">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={`${
                    session.status === "Planned"
                      ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                      : "bg-red-100 text-red-800 border-red-200"
                  }`}
                >
                  {session.status}
                </Badge>
                <h3 className="font-bold">{session.division}</h3>
              </div>
              <div className="text-sm text-black font-bold">{session.timeRemaining || session.timeAgo}</div>
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
