"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ProfileSidebar } from "@/components/profile/profileSidebar"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import ProfileHeader from "@/components/profile/profileheader"
import SidebarCard from "@/components/global/sidebar/sidebar.card"
import Header from "@/components/global/header/header"

export default function HeadsUpPage() {
  const [isEditing, setIsEditing] = useState(false)
  const handleToggleEdit = () => setIsEditing(!isEditing)

  
  const headsUpMessages = [
    {
      id: 1,
      date: new Date(2023, 6, 15), 
      message:
        "Hey everyone, just wanted to let you know I won't be joining the contest this time around. Life's throwing a few curveballs my way, and I'm prioritizing some other commitments. Appreciate the support and can't wait to cheer you all on from the sidelines—good luck!",
      read: false,
    },
    {
      id: 2,
      date: new Date(2023, 6, 10), 
      message:
        "Hey everyone, just wanted to let you know I won't be joining the contest this time around. Life's throwing a few curveballs my way, and I'm prioritizing some other commitments. Appreciate the support and can't wait to cheer you all on from the sidelines—good luck!",
      read: false,
    },
    {
      id: 3,
      date: new Date(2023, 6, 5), 
      message:
        "Hey everyone, just wanted to let you know I won't be joining the contest this time around. Life's throwing a few curveballs my way, and I'm prioritizing some other commitments. Appreciate the support and can't wait to cheer you all on from the sidelines—good luck!",
      read: false,
    },
    {
      id: 4,
      date: new Date(2023, 6, 1),
      message:
        "Hey everyone, just wanted to let you know I won't be joining the contest this time around. Life's throwing a few curveballs my way, and I'm prioritizing some other commitments. Appreciate the support and can't wait to cheer you all on from the sidelines—good luck!",
      read: false,
    },
  ]

  return (
    <div className="flex min-h-screen">
      <aside className="w-[250px] hidden md:block">
        <SidebarCard />
      </aside>

      <div className="flex flex-col flex-1">
        <header>
          <Header />
        </header>

        <main className="flex-1 overflow-y-auto p-4 w-[1030px]">
          <ProfileHeader onEdit={handleToggleEdit} />

          <div className="flex gap-6 mt-5">
            <ProfileSidebar activePage="headsup" />

            <div className="flex-1">
              <div className="space-y-4">
                {headsUpMessages.map((message) => (
                  <Card key={message.id} className="p-4 border-l-4 border-l-blue-900">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-900 mt-2"></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium">A Quick Heads-Up</h3>
                          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100 text-xs">
                            {format(message.date, "MMM dd, yyyy")}
                          </Badge>
                        </div>
                        <p className="text-gray-700 text-sm">{message.message}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
