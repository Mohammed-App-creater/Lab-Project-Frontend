import { Search, Import, Plus, Filter, Pencil, Trash, ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Member {
  id: string
  name: string
  memberId: string
  attendance: "Active" | "Inactive" | "Needs Attention"
  year: string
  status: "On Campus" | "Off Campus" | "Withdrawn"
  avatar?: string
}

const sampleData: Member[] = [
  {
    id: "darlene-robertson",
    name: "Darlene Robertson",
    memberId: "UGR/25605/14",
    attendance: "Active",
    year: "4th",
    status: "On Campus",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "floyd-miles",
    name: "Floyd Miles",
    memberId: "UGR/25605/14",
    attendance: "Active",
    year: "5th",
    status: "Off Campus",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "cody-fisher",
    name: "Cody Fisher",
    memberId: "UGR/25605/14",
    attendance: "Needs Attention",
    year: "3rd",
    status: "Withdrawn",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "dianne-russell",
    name: "Dianne Russell",
    memberId: "UGR/25605/14",
    attendance: "Active",
    year: "4th",
    status: "Withdrawn",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "savannah-nguyen",
    name: "Savannah Nguyen",
    memberId: "UGR/25605/14",
    attendance: "Needs Attention",
    year: "5th",
    status: "Withdrawn",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "jacob-jones",
    name: "Jacob Jones",
    memberId: "UGR/25605/14",
    attendance: "Active",
    year: "5th",
    status: "Withdrawn",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "marvin-mckinney",
    name: "Marvin McKinney",
    memberId: "UGR/25605/14",
    attendance: "Inactive",
    year: "5th",
    status: "Withdrawn",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "brooklyn-simmons",
    name: "Brooklyn Simmons",
    memberId: "UGR/25605/14",
    attendance: "Inactive",
    year: "5th",
    status: "Withdrawn",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "kristin-watson",
    name: "Kristin Watson",
    memberId: "UGR/25605/14",
    attendance: "Needs Attention",
    year: "5th",
    status: "Withdrawn",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "kathryn-murphy-1",
    name: "Kathryn Murphy",
    memberId: "UGR/25605/14",
    attendance: "Active",
    year: "5th",
    status: "Withdrawn",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "kathryn-murphy-2",
    name: "Kathryn Murphy",
    memberId: "UGR/25605/14",
    attendance: "Active",
    year: "5th",
    status: "Withdrawn",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "arlene-mccoy",
    name: "Arlene McCoy",
    memberId: "UGR/25605/14",
    attendance: "Inactive",
    year: "5th",
    status: "Withdrawn",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "devon-lane",
    name: "Devon Lane",
    memberId: "UGR/25605/14",
    attendance: "Inactive",
    year: "5th",
    status: "Withdrawn",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function GroupMembersTableUI() {
  const getAttendanceBadgeClass = (attendance: string) => {
    switch (attendance) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Inactive":
        return "bg-red-100 text-red-800"
      case "Needs Attention":
        return "bg-yellow-100 text-yellow-800"
      default:
        return ""
    }
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "On Campus":
        return "bg-green-100 text-green-800"
      case "Off Campus":
        return "bg-red-100 text-red-800"
      case "Withdrawn":
        return "bg-blue-100 text-blue-800"
      default:
        return ""
    }
  }

  return (
    <div className="ml-2 p-3 rounded-lg border">
      <div className="mb-6 flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Search" className="w-64 pl-10" />
        </div>
        <div className="flex gap-2 ">
          <Button variant="outline" className="gap-2 bg-blue-900 hover:bg-blue-700 text-white">
            <Import className="h-4 w-4" />
            Import
          </Button>
          <Button className="bg-blue-900 hover:bg-blue-700 gap-2">
            <Plus className="h-4 w-4" />
            Add Member
          </Button>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <div className="rounded-lg border">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Member Name</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Member ID</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Attendance</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Year</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Action</th>
            </tr>
          </thead>
          <tbody>
            {sampleData.slice(0, 10).map((member) => (
              <tr key={member.id} className="border-b">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={member.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{member.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm">{member.memberId}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getAttendanceBadgeClass(
                      member.attendance,
                    )}`}
                  >
                    {member.attendance}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm">{member.year}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClass(
                      member.status,
                    )}`}
                  >
                    {member.status}
                  </span>
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
          <Button variant="outline" className="h-8 w-8 p-0 bg-blue-600 text-white">
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
