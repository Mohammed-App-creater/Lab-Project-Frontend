import { ChevronLeft, ChevronRight, Pencil, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface Session {
  id: string
  date: string
  title: string
  division: string
  totalGroups: number
  status: "Started" | "Ended" | "Planned"
}

const sampleSessions: Session[] = [
  {
    id: "1",
    date: "July 01, 2023",
    title: "Weekly session",
    division: "CPD",
    totalGroups: 6,
    status: "Started",
  },
  {
    id: "2",
    date: "July 02, 2023",
    title: "Contest",
    division: "CPD",
    totalGroups: 2,
    status: "Started",
  },
  {
    id: "3",
    date: "July 03, 2023",
    title: "Weekly session",
    division: "CPD",
    totalGroups: 1,
    status: "Started",
  },
  {
    id: "4",
    date: "July 04, 2023",
    title: "Weekly session",
    division: "CPD",
    totalGroups: 0,
    status: "Ended",
  },
  {
    id: "5",
    date: "July 05, 2023",
    title: "Contest",
    division: "CPD",
    totalGroups: 4,
    status: "Ended",
  },
  {
    id: "6",
    date: "July 06, 2023",
    title: "Contest",
    division: "CPD",
    totalGroups: 2,
    status: "Planned",
  },
  {
    id: "7",
    date: "July 07, 2023",
    title: "Contest",
    division: "CPD",
    totalGroups: 2,
    status: "Started",
  },
  {
    id: "8",
    date: "July 08, 2023",
    title: "Contest",
    division: "Dev",
    totalGroups: 2,
    status: "Ended",
  },
  {
    id: "9",
    date: "July 09, 2023",
    title: "Weekly session",
    division: "Dev",
    totalGroups: 2,
    status: "Started",
  },
  {
    id: "10",
    date: "July 09, 2023",
    title: "Weekly session",
    division: "Dev",
    totalGroups: 2,
    status: "Started",
  },
]

export function SessionsTableView() {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Started":
        return { style: { backgroundColor: "#ECFDF3", color: "#027A48" } }
      case "Ended":
        return { style: { backgroundColor: "#FFEBEB", color: "#B42318" } }
      case "Planned":
        return { style: { backgroundColor: "#FFF8E6", color: "#805B10" } }
      default:
        return { style: {} }
    }
  }

  return (
    <div>
      <div className="rounded-lg border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Session Title</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Division</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Total groups</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sampleSessions.map((session) => (
              <tr key={session.id} className="border-b">
                <td className="py-3 px-4 text-sm">{session.date}</td>
                <td className="py-3 px-4 text-sm font-medium">{session.title}</td>
                <td className="py-3 px-4 text-sm">{session.division}</td>
                <td className="py-3 px-4 text-sm">{session.totalGroups}</td>
                <td className="py-3 px-4">
                  <Badge variant="outline" style={getStatusStyles(session.status).style}>
                    {session.status}
                  </Badge>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <button className="text-gray-500 hover:text-gray-700">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Showing</span>
          <Select defaultValue="10">
            <SelectTrigger className="h-8 w-16">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="text-sm text-gray-500">Showing 1 to 10 out of 50 records</div>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" className="h-8 w-8 p-0" disabled>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="h-8 w-8 p-0 text-white" style={{ backgroundColor: "#0040A0" }}>
            1
          </Button>
          <Button variant="outline" className="h-8 w-8 p-0">
            2
          </Button>
          <Button variant="outline" className="h-8 w-8 p-0">
            3
          </Button>
          <Button variant="outline" className="h-8 w-8 p-0">
            4
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 p-0">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
