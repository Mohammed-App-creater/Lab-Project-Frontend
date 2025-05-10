import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { TeamMember } from "@/lib/types"


interface HeadsViewProps {
  teamMembers: TeamMember[]
}

export default function HeadsView({ teamMembers }: HeadsViewProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent border-none">
          <TableHead className="text-gray-500 font-normal">Member Name</TableHead>
          <TableHead className="text-gray-500 font-normal">Division</TableHead>
          <TableHead className="text-gray-500 font-normal">Role</TableHead>
          <TableHead className="text-gray-500 font-normal">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {teamMembers.map((member) => (
          <TableRow key={member.id} className="hover:bg-transparent border-none">
            <TableCell className="py-3">
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8 border">
                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                  <AvatarFallback>{member.initials}</AvatarFallback>
                </Avatar>
                <span>{member.name}</span>
              </div>
            </TableCell>
            <TableCell className="py-3">{member.division}</TableCell>
            <TableCell className="py-3">{member.role}</TableCell>
            <TableCell className="py-3">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
