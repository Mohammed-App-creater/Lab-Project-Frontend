import { Search, Plus, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Member {
  id: string
  name: string
  role: string
  avatar?: string
}

interface Group {
  id: string
  name: string
  memberCount: number
  members: Member[]
}

const sampleData: Group[] = [
  {
    id: "group-1",
    name: "Group 1",
    memberCount: 20,
    members: [
      {
        id: "dianne-russell",
        name: "Dianne Russell",
        role: "Full-stack developer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "arlene-mccoy",
        name: "Arlene McCoy",
        role: "Full-stack developer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "cody-fisher",
        name: "Cody Fisher",
        role: "Full-stack developer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "theresa-webb",
        name: "Theresa Webb",
        role: "Full-stack developer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "ronald-richards",
        name: "Ronald Richards",
        role: "Full-stack developer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
  },
  {
    id: "group-2",
    name: "Group 2",
    memberCount: 10,
    members: [
      {
        id: "wade-warren",
        name: "Wade Warren",
        role: "Full-stack developer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "brooklyn-simmons",
        name: "Brooklyn Simmons",
        role: "Full-stack developer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "kristin-watson",
        name: "Kristin Watson",
        role: "Full-stack developer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "jacob-jones",
        name: "Jacob Jones",
        role: "Full-stack developer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "cody-fisher-2",
        name: "Cody Fisher",
        role: "Full-stack developer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
  },
]

export function DivisionProfileUI() {
  return (
    <div className="p-6 bg-white">
      <div className="mb-6 flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Search" className="w-64 pl-10" />
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 rounded-md">
          <Plus className="mr-2 h-4 w-4" />
          Add Group
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {sampleData.map((group) => (
          <div key={group.id} className="rounded-lg border bg-white shadow-sm">
            <div className="flex items-center justify-between p-4 pb-2">
              <div>
                <h2 className="text-lg font-bold">{group.name}</h2>
                <p className="text-sm text-gray-500">{group.memberCount} Members</p>
              </div>
              <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
                View All
              </a>
            </div>
            <div className="mt-2">
              {group.members.map((member) => (
                <div key={member.id} className="flex items-center justify-between border-t px-4 py-3 hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={member.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{member.name}</h3>
                      <p className="text-sm text-gray-500">{member.role}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
