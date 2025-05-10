"use client"

import { useState,useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ProfileSidebar } from "@/components/profile/profileSidebar"
import ProfileHeader from "@/components/profile/profileheader"
import SidebarCard from "@/components/global/sidebar/sidebar.card"
import Header from "@/components/global/header/header"
import { AttendanceRecord } from "@/types/user"

export default function AttendancePage() {
  const [isEditing, setIsEditing] = useState(false)
  const handleToggleEdit = () => setIsEditing(!isEditing)


useEffect(() => {
    const fetchAttendances = async () => {
      try {
        const response = await fetch(
          "https://csec-lab-portal-backend.onrender.com/api/division-resources/all-divisions-resource"
        );
        const data = await response.json();

        const mapped: [] = data.map((div: any) => ({
          title: div.name,
          description: `Useful resources and progress sheet for the ${div.name} division.`,
          resources: div.resourceLink.map((res: any) => ({
            name: res.resourceLinkName,
            url: res.resourceLinkUrl,
          })),
        }));

        (mapped);
      } catch (err) {
        console.error("Failed to fetch division data:", err);
      }
    };

    fetchAttendances();
  }, []);


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
          <ProfileHeader onEdit={handleToggleEdit} user={undefined} />

          <div className="flex gap-6 mt-5">
            <ProfileSidebar activePage="attendance" user={undefined} />

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

// "use client"

// import { useState, useEffect } from "react"
// import { Card } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { cn } from "@/lib/utils"
// import { ProfileSidebar } from "@/components/profile/profileSidebar"
// import ProfileHeader from "@/components/profile/profileheader"
// import SidebarCard from "@/components/global/sidebar/sidebar.card"
// import Header from "@/components/global/header/header"
// import { User } from "@/types/user"

// interface AttendanceData {
//   attendanceRate: number
//   updateAt: string
// }

// export default function AttendancePage() {
//   const [isEditing, setIsEditing] = useState(false)
//   const [user, setUser] = useState<User | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [attendanceData, setAttendanceData] = useState<AttendanceData | null>(null)

//   const handleToggleEdit = () => setIsEditing(!isEditing)

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
      
//         const userRes = await fetch(
//           "https://csec-lab-portal-backend.onrender.com/api/users/user-id", 
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               userId: "192de509-4940-4af1-a407-fed9b417b51e", 
//             }),
//           }
//         )
//         console.log(userRes)

//         if (!userRes.ok) throw new Error("Failed to fetch user data")
//         const userData = await userRes.json()
//         setUser(userData)

       
//         const attendanceRes = await fetch(
//           "https://csec-lab-portal-backend.onrender.com/api/attendance/attendance-rate"
//         )

//         if (!attendanceRes.ok) throw new Error("Failed to fetch attendance data")
//         const { data } = await attendanceRes.json()
//         setAttendanceData(data)

//         setLoading(false)
//       } catch (err: any) {
//         setError(err.message || "An error occurred")
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [])

//   if (loading) return <div className="p-4">Loading...</div>
//   if (error) return <div className="p-4 text-red-500">Error: {error}</div>
//   if (!user) return <div className="p-4">No user data found.</div>
//   if (!attendanceData) return <div className="p-4">No attendance data found.</div>

//   return (
//     <div className="flex min-h-screen">
//       <aside className="w-[250px] hidden md:block">
//         <SidebarCard />
//       </aside>

//       <div className="flex flex-col flex-1">
//         <header>
//           <Header />
//         </header>

//         <main className="flex-1 overflow-y-auto p-4 w-[1030px]">
//           <ProfileHeader onEdit={handleToggleEdit} user={user} />

//           <div className="flex gap-6 mt-5">
//             <ProfileSidebar activePage="attendance" user={user} />

//             <div className="flex-1 space-y-4">
//               <Card className="p-6">
//                 <h2 className="text-xl font-semibold mb-4">Attendance Overview</h2>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <p className="text-gray-500">Attendance Rate</p>
//                     <p className="text-3xl font-bold">
//                       {attendanceData.attendanceRate.toFixed(2)}%
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-gray-500">Last Updated</p>
//                     <p className="text-lg">
//                       {new Date(attendanceData.updateAt).toLocaleString()}
//                     </p>
//                   </div>
//                 </div>
//               </Card>

//               <Card className="p-6">
//                 <h2 className="text-xl font-semibold mb-4">Attendance Status</h2>
//                 <div className="flex items-center gap-4">
//                   <StatusBadge status="Present" />
//                   <StatusBadge status="Absent" />
//                   <StatusBadge status="Excused" />
//                 </div>
//               </Card>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }

// function StatusBadge({ status }: { status: string }) {
//   return (
//     <Badge
//       className={cn(
//         "font-normal",
//         status === "Present" && "bg-green-100 text-green-800 hover:bg-green-100",
//         status === "Absent" && "bg-red-100 text-red-800 hover:bg-red-100",
//         status === "Excused" && "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
//       )}
//     >
//       {status}
//     </Badge>
//   )
// }