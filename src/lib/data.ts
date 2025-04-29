import type { Session } from "./types"

export async function fetchSessions(): Promise<Session[]> {
  // In a real app, this would be a fetch call to your API
  // For this example, we'll return mock data

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  const attendanceData = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}api/attendance/get-all-attendance`)
  await console.log(" Attendance: ",attendanceData)
  

  return [
    {
      id: "1",
      title: "Dev Division",
      description: "Development weekly session",
      date: "2025-07-09T10:00:00Z",
      status: "ended",
      groups: [
        {
          id: "g1",
          name: "Group 1",
          members: [
            {
              id: "m1",
              name: "Darlene Robertson",
              role: "Full-stack developer",
              avatar: "/placeholder.svg?height=40&width=40",
              attendance: "present",
            },
            {
              id: "m2",
              name: "Floyd Miles",
              role: "Frontend developer",
              avatar: "/placeholder.svg?height=40&width=40",
              attendance: "present",
            },
            {
              id: "m3",
              name: "Cody Fisher",
              role: "Backend developer",
              avatar: "/placeholder.svg?height=40&width=40",
              attendance: "present",
            },
            {
              id: "m4",
              name: "Dianne Russell",
              role: "UX designer",
              avatar: "/placeholder.svg?height=40&width=40",
              attendance: "present",
            },
            {
              id: "m5",
              name: "Ronald Richards",
              role: "DevOps engineer",
              avatar: "/placeholder.svg?height=40&width=40",
              attendance: "absent",
            },
            {
              id: "m6",
              name: "Theresa Webb",
              role: "QA engineer",
              avatar: "/placeholder.svg?height=40&width=40",
              attendance: "present",
            },
          ],
        },
        {
          id: "g2",
          name: "Group 2",
          members: [
            {
              id: "m7",
              name: "Wade Warren",
              role: "Project manager",
              avatar: "/placeholder.svg?height=40&width=40",
              attendance: "present",
            },
            {
              id: "m8",
              name: "Brooklyn Simmons",
              role: "UI designer",
              avatar: "/placeholder.svg?height=40&width=40",
              attendance: "absent",
            },
            {
              id: "m9",
              name: "Kristin Watson",
              role: "Product owner",
              avatar: "/placeholder.svg?height=40&width=40",
              attendance: "present",
            },
            {
              id: "m10",
              name: "Jacob Jones",
              role: "Scrum master",
              avatar: "/placeholder.svg?height=40&width=40",
              attendance: "present",
            },
            {
              id: "m11",
              name: "Cody Fisher",
              role: "Backend developer",
              avatar: "/placeholder.svg?height=40&width=40",
              attendance: "absent",
            },
          ],
        },
        {
          id: "g3",
          name: "Group 3",
          members: [
            {
              id: "m12",
              name: "Savannah Nguyen",
              role: "Data scientist",
              avatar: "/placeholder.svg?height=40&width=40",
              attendance: "present",
            },
            {
              id: "m13",
              name: "Marvin McKinney",
              role: "ML engineer",
              avatar: "/placeholder.svg?height=40&width=40",
              attendance: "present",
            },
          ],
        },
      ],
    },
    {
      id: "2",
      title: "Dev Division",
      description: "Development weekly session",
      date: "2025-07-16T10:00:00Z",
      status: "planned",
      groups: [
        {
          id: "g1",
          name: "Group 1",
          members: [
            {
              id: "m1",
              name: "Darlene Robertson",
              role: "Full-stack developer",
              avatar: "/placeholder.svg?height=40&width=40",
            },
            {
              id: "m2",
              name: "Floyd Miles",
              role: "Frontend developer",
              avatar: "/placeholder.svg?height=40&width=40",
            },
            {
              id: "m3",
              name: "Cody Fisher",
              role: "Backend developer",
              avatar: "/placeholder.svg?height=40&width=40",
            },
          ],
        },
        {
          id: "g2",
          name: "Group 2",
          members: [
            {
              id: "m7",
              name: "Wade Warren",
              role: "Project manager",
              avatar: "/placeholder.svg?height=40&width=40",
            },
            {
              id: "m8",
              name: "Brooklyn Simmons",
              role: "UI designer",
              avatar: "/placeholder.svg?height=40&width=40",
            },
          ],
        },
        {
          id: "g3",
          name: "Group 3",
          members: [
            {
              id: "m12",
              name: "Savannah Nguyen",
              role: "Data scientist",
              avatar: "/placeholder.svg?height=40&width=40",
            },
          ],
        },
      ],
    },
    {
      id: "3",
      title: "Dev Division",
      description: "Development weekly session",
      date: "2025-07-02T10:00:00Z",
      status: "ended",
      groups: [
        {
          id: "g1",
          name: "Group 1",
          members: [
            {
              id: "m1",
              name: "Darlene Robertson",
              role: "Full-stack developer",
              avatar: "/placeholder.svg?height=40&width=40",
              attendance: "present",
            },
            {
              id: "m2",
              name: "Floyd Miles",
              role: "Frontend developer",
              avatar: "/placeholder.svg?height=40&width=40",
              attendance: "absent",
            },
          ],
        },
        {
          id: "g2",
          name: "Group 2",
          members: [
            {
              id: "m7",
              name: "Wade Warren",
              role: "Project manager",
              avatar: "/placeholder.svg?height=40&width=40",
              attendance: "present",
            },
          ],
        },
        {
          id: "g3",
          name: "Group 3",
          members: [
            {
              id: "m12",
              name: "Savannah Nguyen",
              role: "Data scientist",
              avatar: "/placeholder.svg?height=40&width=40",
              attendance: "absent",
            },
          ],
        },
      ],
    },
    {
      id: "4",
      title: "Dev Division",
      description: "Development weekly session",
      date: "2025-06-25T10:00:00Z",
      status: "planned",
      groups: [
        {
          id: "g1",
          name: "Group 1",
          members: [
            {
              id: "m1",
              name: "Darlene Robertson",
              role: "Full-stack developer",
              avatar: "/placeholder.svg?height=40&width=40",
            },
          ],
        },
        {
          id: "g2",
          name: "Group 2",
          members: [
            {
              id: "m7",
              name: "Wade Warren",
              role: "Project manager",
              avatar: "/placeholder.svg?height=40&width=40",
            },
          ],
        },
        {
          id: "g3",
          name: "Group 3",
          members: [
            {
              id: "m12",
              name: "Savannah Nguyen",
              role: "Data scientist",
              avatar: "/placeholder.svg?height=40&width=40",
            },
          ],
        },
      ],
    },
  ]
}
