"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, Plus, Filter, ChevronLeft, ChevronRight } from "lucide-react"


type Member = {
  id: string
  name: string
  avatar: string
  memberId: string
  division?: string
  attendance: "Active" | "Needs Attention" | "Inactive"
  year: string
  status: "On Campus" | "Off Campus" | "Withdrawn"
}

// Sample data
const members: Member[] = [
  {
    id: "1",
    name: "Darlene Robertson",
    avatar: "profile.svg",
    memberId: "UGR/25005/14",
    division: "Design",
    attendance: "Active",
    year: "4th",
    status: "On Campus",
  },
  {
    id: "2",
    name: "Floyd Miles",
    avatar: "profile.svg",
    memberId: "UGR/25005/14",
    division: "Development",
    attendance: "Active",
    year: "5th",
    status: "Off Campus",
  },
  {
    id: "3",
    name: "Cody Fisher",
    avatar: "profile.svg",
    memberId: "UGR/25005/14",
    division: "CFD",
    attendance: "Needs Attention",
    year: "3rd",
    status: "Withdrawn",
  },
  {
    id: "4",
    name: "Dianne Russell",
    avatar: "profile.svg",
    memberId: "UGR/25005/14",
    division: "CFD",
    attendance: "Active",
    year: "4th",
    status: "Withdrawn",
  },
  {
    id: "5",
    name: "Savannah Nguyen",
    avatar: "profile.svg",
    memberId: "UGR/25005/14",
    division: "CFD",
    attendance: "Needs Attention",
    year: "5th",
    status: "Withdrawn",
  },
  {
    id: "6",
    name: "Jacob Jones",
    avatar: "profile.svg",
    memberId: "UGR/25005/14",
    division: "Development",
    attendance: "Active",
    year: "5th",
    status: "Withdrawn",
  },
  {
    id: "7",
    name: "Marvin McKinney",
    avatar: "profile.svg",
    memberId: "UGR/25005/14",
    division: "Development",
    attendance: "Inactive",
    year: "5th",
    status: "Withdrawn",
  },
  {
    id: "8",
    name: "Brooklyn Simmons",
    avatar: "profile.svg",
    memberId: "UGR/25005/14",
    division: "CFD",
    attendance: "Inactive",
    year: "5th",
    status: "Withdrawn",
  },
  {
    id: "9",
    name: "Kristin Watson",
    avatar: "profile.svg",
    memberId: "UGR/25005/14",
    division: "Cyber",
    attendance: "Needs Attention",
    year: "5th",
    status: "Withdrawn",
  },
  {
    id: "10",
    name: "Kathryn Murphy",
    avatar: "profile.svg",
    memberId: "UGR/25005/14",
    division: "Development",
    attendance: "Active",
    year: "5th",
    status: "Withdrawn",
  },
]

// Define the props for our component
type MemberTableProps = {
  userRole: "admin" | "manager" | "viewer"
}

export default function MemberTable({ userRole }: MemberTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const totalItems = members.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  // Calculate the current items to display based on pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = members.slice(indexOfFirstItem, indexOfLastItem)

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  // Handle items per page change
  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value))
    setCurrentPage(1) // Reset to first page when changing items per page
  }

  // Get attendance badge color based on status
  const getAttendanceBadgeColor = (attendance: Member["attendance"]) => {
    switch (attendance) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Needs Attention":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Inactive":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  // Get status badge color based on status
  const getStatusBadgeColor = (status: Member["status"]) => {
    switch (status) {
      case "On Campus":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Off Campus":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "Withdrawn":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-4 inset-shadow-2xs shadow-xl p-3 rounded-2xl">
      <div className="flex items-center justify-between">
        <div className="relative w-64">
          <Input placeholder="Search" className="pl-8" />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Only show Add Member button for admin and manager roles */}
          {(userRole === "admin" || userRole === "manager") && (
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Member
            </Button>
          )}
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Member Name</TableHead>
              <TableHead>Member ID</TableHead>
              {/* Only show Division column for admin role */}
              {userRole === "admin" && <TableHead>Division</TableHead>}
              <TableHead>Attendance</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Status</TableHead>
              {/* Only show Action column for admin and manager roles */}
              {(userRole === "admin" || userRole === "manager") && <TableHead className="text-right">Action</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{member.name}</span>
                  </div>
                </TableCell>
                <TableCell>{member.memberId}</TableCell>
                {/* Only show Division column for admin role */}
                {userRole === "admin" && <TableCell>{member.division}</TableCell>}
                <TableCell>
                  <Badge variant="outline" className={`${getAttendanceBadgeColor(member.attendance)}`}>
                    {member.attendance}
                  </Badge>
                </TableCell>
                <TableCell>{member.year}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={`${getStatusBadgeColor(member.status)}`}>
                    {member.status}
                  </Badge>
                </TableCell>
                {/* Only show Action column for admin and manager roles */}
                {(userRole === "admin" || userRole === "manager") && (
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      {/* Only show delete button for admin role */}
                      {userRole === "admin" && (
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Showing</span>
          <Select defaultValue={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
            <SelectTrigger className="w-16 h-8">
              <SelectValue placeholder={itemsPerPage.toString()} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-500">
            {`${indexOfFirstItem + 1} to ${Math.min(indexOfLastItem, totalItems)} out of ${totalItems} records`}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
            <Button
              key={i + 1}
              variant="outline"
              size="sm"
              className={`h-8 w-8 ${currentPage === i + 1 ? "bg-primary text-primary-foreground" : ""}`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
