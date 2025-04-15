import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ProfileSidebar } from "./profile.sidebar"

export default function AttendancePage() {
  // Sample attendance data
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
    <div className="flex min-h-screen bg-gray-50 p-6 gap-5">
      <ProfileSidebar activePage="attendance" />

      <div className="flex-1">
        <Card className="overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-900 z-10"></div>
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
