// "use client"

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
// import { useState } from "react"

// const data = [
//   { month: "Jan", thisYear: 20, lastYear: 30 },
//   { month: "Feb", thisYear: 10, lastYear: 25 },
//   { month: "Mar", thisYear: 30, lastYear: 15 },
//   { month: "Apr", thisYear: 40, lastYear: 10 },
//   { month: "May", thisYear: 80, lastYear: 30 },
//   { month: "Jun", thisYear: 70, lastYear: 40 },
//   { month: "Jul", thisYear: 60, lastYear: 80 },
// ]

// export default function AttendanceOverview() {
//   const [selectedTab, setSelectedTab] = useState("all")

//   return (
//     <Card className="ml-2 w-[98%] my-5 ">
//       <CardHeader className="flex flex-row items-center justify-between pb-2">
//         <div className="space-y-0.5">
//           <CardTitle className="text-base font-medium">Attendance Overview</CardTitle>
//         </div>
//         <div className="flex items-center gap-4">
//           <div className="text-sm text-muted-foreground">Total Members</div>
//           <div className="text-sm text-muted-foreground">Total Event</div>
//           <Tabs defaultValue="thisYear" className="h-8">
//             <TabsList className="h-8">
//               <TabsTrigger value="thisYear" className="text-xs h-8 px-2 flex items-center gap-1">
//                 <span className="h-2 w-2 rounded-full bg-black"></span>
//                 This year
//               </TabsTrigger>
//               <TabsTrigger value="lastYear" className="text-xs h-8 px-2 flex items-center gap-1">
//                 <span className="h-2 w-2 rounded-full bg-blue-500"></span>
//                 Last year
//               </TabsTrigger>
//             </TabsList>
//           </Tabs>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="h-[250px] w-full">
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart
//               data={data}
//               margin={{
//                 top: 5,
//                 right: 10,
//                 left: -20,
//                 bottom: 0,
//               }}
//             >
//               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
//               <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
//               <YAxis
//                 axisLine={false}
//                 tickLine={false}
//                 tick={{ fontSize: 12 }}
//                 tickFormatter={(value) => `${value}%`}
//                 domain={[0, 100]}
//                 ticks={[0, 10, 50, 100]}
//               />
//               <Tooltip
//                 formatter={(value) => [`${value}%`, ""]}
//                 contentStyle={{
//                   borderRadius: "8px",
//                   border: "none",
//                   boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//                   padding: "8px 12px",
//                 }}
//               />
//               <Line
//                 type="monotone"
//                 dataKey="thisYear"
//                 stroke="#000000"
//                 strokeWidth={2}
//                 dot={false}
//                 activeDot={{ r: 6, fill: "#000000" }}
//               />
//               <Line
//                 type="monotone"
//                 dataKey="lastYear"
//                 stroke="#3b82f6"
//                 strokeWidth={2}
//                 strokeDasharray="5 5"
//                 dot={false}
//                 activeDot={{ r: 6, fill: "#3b82f6" }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import { useState } from "react"

const data = [
  { month: "Jan", thisYear: 20, lastYear: 30 },
  { month: "Feb", thisYear: 10, lastYear: 25 },
  { month: "Mar", thisYear: 30, lastYear: 15 },
  { month: "Apr", thisYear: 40, lastYear: 10 },
  { month: "May", thisYear: 80, lastYear: 30 },
  { month: "Jun", thisYear: 70, lastYear: 40 },
  { month: "Jul", thisYear: 60, lastYear: 80 },
]

export default function AttendanceOverview() {
  const [selectedTab, setSelectedTab] = useState("all")

  return (
    <Card className="w-full my-5">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2">
        <div className="space-y-0.5 mb-2 sm:mb-0">
          <CardTitle className="text-base font-medium">Attendance Overview</CardTitle>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="text-sm text-muted-foreground hidden sm:block">Total Members</div>
          <div className="text-sm text-muted-foreground hidden sm:block">Total Event</div>
          <Tabs defaultValue="thisYear" className="h-8">
            <TabsList className="h-8">
              <TabsTrigger value="thisYear" className="text-xs h-8 px-2 flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-black"></span>
                This year
              </TabsTrigger>
              <TabsTrigger value="lastYear" className="text-xs h-8 px-2 flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                Last year
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: -20,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `${value}%`}
                domain={[0, 100]}
                ticks={[0, 10, 50, 100]}
              />
              <Tooltip
                formatter={(value) => [`${value}%`, ""]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  padding: "8px 12px",
                }}
              />
              <Line
                type="monotone"
                dataKey="thisYear"
                stroke="#000000"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: "#000000" }}
              />
              <Line
                type="monotone"
                dataKey="lastYear"
                stroke="#3b82f6"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                activeDot={{ r: 6, fill: "#3b82f6" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}