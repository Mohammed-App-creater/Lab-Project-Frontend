"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ProfileSidebar } from "@/components/profile/profileSidebar"
import ProfileHeader from "@/components/profile/profileheader"
import SidebarCard from "@/components/global/sidebar/sidebar.card"
import Header from "@/components/global/header/header"

export default function AttendancePage() {
  const [isEditing, setIsEditing] = useState(false)
  const handleToggleEdit = () => setIsEditing(!isEditing)


  const attendanceRecords = [
    { date: "July 01, 2023", session: "Contest", startTime: "08:02 AM", endTime: "09:02 AM", status: "Present" },
    { date: "July 02, 2023", session: "Contest", startTime: "08:02 AM", endTime: "09:20 AM", status: "Present" },
    { date: "July 03, 2023", session: "Contest", startTime: "08:02 AM", endTime: "09:05 AM", status: "Present" },
    { date: "July 04, 2023", session: "Contest", startTime: "08:02 AM", endTime: "08:35 AM", status: "Absent" },
    { date: "July 05, 2023", session: "Contest", startTime: "08:02 AM", endTime: "08:30 AM", status: "Absent" },
    { date: "July 06, 2023", session: "Contest", startTime: "08:02 AM", endTime: "09:02 AM", status: "Excused" },
    { date: "July 07, 2023", session: "Contest", startTime: "08:02 AM", endTime: "09:15 AM", status: "Present" },
    { date: "July 08, 2023", session: "Contest", startTime: "08:02 AM", endTime: "08:23 AM", status: "Absent" },
    { date: "July 09, 2023", session: "Contest", startTime: "08:02 AM", endTime: "09:02 AM", status: "Present" },
    { date: "July 10, 2023", session: "Contest", startTime: "08:02 AM", endTime: "09:10 AM", status: "Present" },
    { date: "July 11, 2023", session: "Contest", startTime: "08:02 AM", endTime: "09:05 AM", status: "Present" },
    { date: "July 12, 2023", session: "Contest", startTime: "08:02 AM", endTime: "08:40 AM", status: "Absent" },
    { date: "July 13, 2023", session: "Contest", startTime: "08:02 AM", endTime: "09:02 AM", status: "Present" },
    { date: "July 14, 2023", session: "Contest", startTime: "08:02 AM", endTime: "08:45 AM", status: "Absent" },
    { date: "July 15, 2023", session: "Contest", startTime: "08:02 AM", endTime: "09:20 AM", status: "Present" },
    { date: "July 16, 2023", session: "Contest", startTime: "08:02 AM", endTime: "09:00 AM", status: "Excused" },
    { date: "July 17, 2023", session: "Contest", startTime: "08:02 AM", endTime: "09:15 AM", status: "Present" },
    { date: "July 18, 2023", session: "Contest", startTime: "08:02 AM", endTime: "09:05 AM", status: "Present" },
  ]

  return (
    <div className="flex min-h-screen">
      <aside className="w-[250px] hidden md:block ">
        <SidebarCard />
      </aside>

      <div className="flex flex-col flex-1">
        <header>
          <Header />
        </header>

        <main className="flex-1 overflow-y-auto p-4 w-[1030px]">
          <ProfileHeader onEdit={handleToggleEdit} />

          <div className="flex gap-6 mt-5">
            <ProfileSidebar activePage="attendance" />

            <div className="flex-1">
              <Card className="overflow-hidden relative">
                <div className="overflow-y-auto max-h-[500px]">
                  <table className="w-full">
                    <thead className="sticky top-0 bg-white z-10">
                      <tr className="border-b">
                        <th className="text-left p-4 font-medium text-gray-500">Date</th>
                        <th className="text-left p-4 font-medium text-gray-500">Session</th>
                        <th className="text-left p-4 font-medium text-gray-500">Start-Time</th>
                        <th className="text-left p-4 font-medium text-gray-500">End-Time</th>
                        <th className="text-left p-4 font-medium text-gray-500">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceRecords.map((record, index) => (
                        <tr key={index} className="border-b last:border-b-0">
                          <td className="p-4">{record.date}</td>
                          <td className="p-4">{record.session}</td>
                          <td className="p-4">{record.startTime}</td>
                          <td className="p-4">{record.endTime}</td>
                          <td className="p-4">
                            <StatusBadge status={record.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  return (
    <Badge
      className={cn(
        "font-normal",
        status === "Present" && "bg-green-100 text-green-800 hover:bg-green-100",
        status === "Absent" && "bg-red-100 text-red-800 hover:bg-red-100",
        status === "Excused" && "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      )}
    >
      {status}
    </Badge>
  )
}
