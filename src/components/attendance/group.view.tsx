"use client"

import type { Session } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type GroupViewProps = {
  session: Session
  onGroupAttendanceClick: (groupId: string) => void
}

export default function GroupView({ session, onGroupAttendanceClick }: GroupViewProps) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">{session.title}</h2>
        <p className="text-muted-foreground">{session.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {session.groups.map((group) => (
          <Card key={group.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">{group.name}</h3>
                <Button
                  size="sm"
                  className="bg-blue-900 hover:bg-blue-700 text-white"
                  onClick={() => onGroupAttendanceClick(group.id)}
                >
                  Attendance
                </Button>
              </div>

              <div className="text-sm text-muted-foreground mb-4">{group.members.length} Members</div>

              <div className="space-y-3">
                {/* Show only up to 5 members per group */}
                {group.members.slice(0, 5).map((member) => (
                  <div key={member.id} className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                ))}

                {/* Show a message if there are more members */}
                {group.members.length > 5 && (
                  <div className="text-sm text-muted-foreground pt-2">+ {group.members.length - 5} more members</div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
