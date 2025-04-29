
"use client"

import type React from "react"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, Plus, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import AddNewMember from "@/components/member/add.member.card"
import Link from "next/link"

type Member = {
  id: string
  name: string
  avatar: string
  memberId: string
  division?: string
  attendance: "Active" | "Needs Attention" | "Disabled"
  year: string
  status: "@1 Campus" | "withdrawn"
}

// Sample data
const initialMembers: Member[] = [
  {
    id: "1",
    name: "Dontene Robertson",
    avatar: "/profile.svg",
    memberId: "UGR/25605/14",
    division: "Design",
    attendance: "Active",
    year: "4th",
    status: "@1 Campus",
  },
  {
    id: "2",
    name: "Floyd Hiles",
    avatar: "/profile.svg",
    memberId: "UGR/25605/14",
    division: "Development",
    attendance: "Active",
    year: "5th",
    status: "@1 Campus",
  },
  {
    id: "3",
    name: "Cody Fisher",
    avatar: "/profile.svg",
    memberId: "UGR/25605/14",
    division: "CPD",
    attendance: "Needs Attention",
    year: "3rd",
    status: "withdrawn",
  },
  {
    id: "4",
    name: "Dianne Russell",
    avatar: "/profile.svg",
    memberId: "UGR/25005/14",
    division: "CPD",
    attendance: "Active",
    year: "4th",
    status: "@1 Campus",
  },
  {
    id: "5",
    name: "Savannah Nguyen",
    avatar: "/profile.svg",
    memberId: "UGR/25005/14",
    division: "CPD",
    attendance: "Needs Attention",
    year: "5th",
    status: "@1 Campus",
  },
  {
    id: "6",
    name: "Jacob Jones",
    avatar: "/profile.svg",
    memberId: "UGR/25005/14",
    division: "Development",
    attendance: "Active",
    year: "5th",
    status: "@1 Campus",
  },
  {
    id: "7",
    name: "Marvin McKinney",
    avatar: "/profile.svg",
    memberId: "UGR/25005/14",
    division: "Development",
    attendance: "Active",
    year: "5th",
    status: "@1 Campus",
  },
  {
    id: "8",
    name: "Brooklyn Simmons",
    avatar: "/profile.svg",
    memberId: "UGR/25005/14",
    division: "CPD",
    attendance: "Active",
    year: "5th",
    status: "@1 Campus",
  },
  {
    id: "9",
    name: "Kristin Watson",
    avatar: "/profile.svg",
    memberId: "UGR/25005/14",
    division: "Cyber",
    attendance: "Needs Attention",
    year: "5th",
    status: "@1 Campus",
  },
  {
    id: "10",
    name: "Kathryn Murphy",
    avatar: "/profile.svg",
    memberId: "UGR/25005/14",
    division: "Development",
    attendance: "Active",
    year: "5th",
    status: "@1 Campus",
  },
  {
    id: "11",
    name: "Arlene McCoy",
    avatar: "/profile.svg",
    memberId: "UGR/25005/14",
    division: "Development",
    attendance: "Active",
    year: "5th",
    status: "@1 Campus",
  },
  {
    id: "12",
    name: "Arlene McCoy",
    avatar: "/profile.svg",
    memberId: "UGR/25005/14",
    division: "Development",
    attendance: "Active",
    year: "5th",
    status: "@1 Campus",
  },
  {
    id: "13",
    name: "Devon Lane",
    avatar: "/profile.svg",
    memberId: "UGR/25005/14",
    division: "CPD",
    attendance: "Active",
    year: "5th",
    status: "@1 Campus",
  },
]

type MemberTableProps = {
  userRole: "admin" | "manager" | "viewer"
}

export default function MemberTable({ userRole }: MemberTableProps) {
  const [members, setMembers] = useState<Member[]>(initialMembers)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [showAddMember, setShowAddMember] = useState(false)
  const [filters, setFilters] = useState({
    division: "",
    attendance: "",
    status: "",
  })

  // Filter members based on search term and filters
  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.memberId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDivision = !filters.division || filters.division === "all" || member.division === filters.division
    const matchesAttendance =
      !filters.attendance || filters.attendance === "all" || member.attendance === filters.attendance
    const matchesStatus = !filters.status || filters.status === "all" || member.status === filters.status

    return matchesSearch && matchesDivision && matchesAttendance && matchesStatus
  })

  const totalItems = filteredMembers.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  // Calculate the current items to display based on pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredMembers.slice(indexOfFirstItem, indexOfLastItem)

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  // Handle items per page change
  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value))
    setCurrentPage(1) // Reset to first page when changing items per page
  }

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  // Handle filter change
  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
    setCurrentPage(1)
  }

  // Handle adding new member
  const handleAddMember = (newMember: any) => {
    const memberToAdd = {
      id: (members.length + 1).toString(),
      name: newMember.email.split("@")[0],
      avatar: "/profile.svg",
      memberId: `UGR/${Math.floor(10000 + Math.random() * 90000)}/14`,
      division: newMember.division,
      attendance: "Active" as const,
      year: "1st",
      status: "@1 Campus" as const,
    }
    setMembers([...members, memberToAdd])
  }

  // Get attendance badge color based on status
  const getAttendanceBadgeColor = (attendance: Member["attendance"]) => {
    switch (attendance) {
      case "Active":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "Needs Attention":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "Disabled":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  // Get status badge color based on status
  const getStatusBadgeColor = (status: Member["status"]) => {
    switch (status) {
      case "@1 Campus":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "withdrawn":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <div className="space-y-4 shadow-lg p-3 rounded-2xl">
      {showAddMember && <AddNewMember onCancel={() => setShowAddMember(false)} onInvite={handleAddMember} />}

      <div className="flex items-center justify-between">
        <div className="relative w-64">
          <Input placeholder="Search" className="pl-8" value={searchTerm} onChange={handleSearch} />
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
          {(userRole === "admin" || userRole === "manager") && (
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowAddMember(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Member
            </Button>
          )}
          <div className="relative group">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md p-4 z-10 hidden group-hover:block">
              <div className="space-y-2">
                <Select onValueChange={(value) => handleFilterChange("division", value)} value={filters.division}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter by Division" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Divisions</SelectItem>
                    <SelectItem value="Development">Development</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="CPD">CPD</SelectItem>
                    <SelectItem value="Cyber">Cyber</SelectItem>
                  </SelectContent>
                </Select>
                <Select onValueChange={(value) => handleFilterChange("attendance", value)} value={filters.attendance}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter by Attendance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Needs Attention">Needs Attention</SelectItem>
                    <SelectItem value="Disabled">Disabled</SelectItem>
                  </SelectContent>
                </Select>
                <Select onValueChange={(value) => handleFilterChange("status", value)} value={filters.status}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="@1 Campus">@1 Campus</SelectItem>
                    <SelectItem value="withdrawn">Withdrawn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Member Name</TableHead>
              <TableHead>Member ID</TableHead>
              <TableHead>Division</TableHead>
              <TableHead>Attendance</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Status</TableHead>
              {(userRole === "admin" || userRole === "manager") && <TableHead className="text-right">Action</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="font-medium">
                  <Link href={`/profile/${member.id}`} className="flex items-center gap-2 hover:underline">
                    <Avatar>
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{member.name}</span>
                  </Link>
                </TableCell>
                <TableCell>{member.memberId}</TableCell>
                <TableCell>{member.division}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getAttendanceBadgeColor(member.attendance)}>
                    {member.attendance}
                  </Badge>
                </TableCell>
                <TableCell>{member.year}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusBadgeColor(member.status)}>
                    {member.status}
                  </Badge>
                </TableCell>
                {(userRole === "admin" || userRole === "manager") && (
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                      </Button>
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

          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            // Show pages around the current page
            let pageToShow = i + 1
            if (currentPage > 3 && totalPages > 5) {
              pageToShow = i + currentPage - 2
              if (pageToShow > totalPages - 4) {
                pageToShow = totalPages - 4 + i
              }
            }

            if (pageToShow <= totalPages) {
              return (
                <Button
                  key={pageToShow}
                  variant={currentPage === pageToShow ? "default" : "outline"}
                  size="sm"
                  className={`h-8 w-8 ${currentPage === pageToShow ? "bg-blue-600 text-white" : ""}`}
                  onClick={() => handlePageChange(pageToShow)}
                >
                  {pageToShow}
                </Button>
              )
            }
            return null
          })}

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
