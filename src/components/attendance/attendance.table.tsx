"use client"

import { useState, useEffect } from "react"
import type { Session, AttendanceStatus } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { HeadsUp } from "./headsup.card"

type AttendanceTableProps = {
  session: Session
  groupId: string
  onSave: () => void
}

export default function AttendanceTable({ session, groupId, onSave }: AttendanceTableProps) {
  // Find the selected group
  const selectedGroup = session.groups.find((group) => group.id === groupId)

  const [groupMembers, setGroupMembers] = useState(selectedGroup ? selectedGroup.members : [])

  useEffect(() => {
    if (selectedGroup) {
      setGroupMembers(selectedGroup.members)
    } else {
      setGroupMembers([])
    }
  }, [selectedGroup])

  const [attendanceData, setAttendanceData] = useState<Record<string, AttendanceStatus>>(() => {
    // Initialize with existing attendance data or default to "present"
    if (selectedGroup) {
      return selectedGroup.members.reduce(
        (acc, member) => {
          acc[member.id] = member.attendance || "present"
          return acc
        },
        {} as Record<string, AttendanceStatus>,
      )
    } else {
      return {}
    }
  })

  useEffect(() => {
    if (selectedGroup) {
      setAttendanceData(
        groupMembers.reduce(
          (acc, member) => {
            acc[member.id] = member.attendance || "present"
            return acc
          },
          {} as Record<string, AttendanceStatus>,
        ),
      )
    }
  }, [groupMembers, selectedGroup])

  if (!selectedGroup) {
    return <div>Group not found</div>
  }

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(groupMembers.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const currentMembers = groupMembers.slice(startIndex, startIndex + itemsPerPage)

  const handleAttendanceChange = (memberId: string, status: AttendanceStatus) => {
    setAttendanceData((prev) => ({
      ...prev,
      [memberId]: status,
    }))
  }

  const handleSave = async () => {
    // In a real app, you would save the attendance data to the server here
    console.log("Saving attendance data for group:", selectedGroup.name, attendanceData)

    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    onSave()
  }

  const [showModal, setShowModal] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{session.title}</h2>
          <p className="text-muted-foreground">{selectedGroup.name} - Attendance</p>
        </div>
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white">
          Save
        </Button>
      </div>

      <div className="relative w-full max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input type="search" placeholder="Search members" className="w-full pl-8 bg-white" />
      </div>

      <div className="bg-white rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Member Name</TableHead>
              <TableHead className="text-center">Attendance</TableHead>
              <TableHead className="text-center">Excused</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{member.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center gap-2">
                    <Button
                      variant={attendanceData[member.id] === "present" ? "default" : "outline"}
                      size="sm"
                      className={`rounded-full ${
                        attendanceData[member.id] === "present"
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : "text-green-500 border-green-200 hover:bg-green-50"
                      }`}
                      onClick={() => handleAttendanceChange(member.id, "present")}
                    >
                      Present
                    </Button>
                    <Button
                      variant={attendanceData[member.id] === "absent" ? "default" : "outline"}
                      size="sm"
                      className={`rounded-full ${
                        attendanceData[member.id] === "absent"
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "text-red-500 border-red-200 hover:bg-red-50"
                      }`}
                      onClick={() => handleAttendanceChange(member.id, "absent")}
                    >
                      Absent
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Button
                              onClick={() => setShowModal(true)}
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              <Plus className="mr-2 h-4 w-4" /> Heads Up
                            </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, groupMembers.length)} out of{" "}
            {groupMembers.length} records
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage > 1) setCurrentPage(currentPage - 1)
                  }}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === i + 1}
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrentPage(i + 1)
                    }}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
       {showModal && <HeadsUp onClose={() => setShowModal(false)} />}
    </div>

    
  )
}
