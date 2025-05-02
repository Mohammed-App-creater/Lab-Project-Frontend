"use client"

import { ChevronLeft, ChevronRight, Pencil, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export interface Session {
  id: string
  date: string
  title: string
  division: string
  totalGroups: number
  status: "Planned" | "Started" | "Ended"
}

interface SessionsTableViewProps {
  sessions: Session[]
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  itemsPerPage: string
  onItemsPerPageChange: (value: string) => void
  currentPage: number
  onPageChange: (newPage: number) => void
  totalPages: number
  totalSessions: number
}

export function SessionsTableView({ 
  sessions, 
  onEdit, 
  onDelete,
  itemsPerPage,
  onItemsPerPageChange,
  currentPage,
  onPageChange,
  totalPages,
  totalSessions
}: SessionsTableViewProps) {
  const itemsPerPageNum = parseInt(itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPageNum
  const endIndex = startIndex + itemsPerPageNum
  const currentSessions = sessions.slice(startIndex, endIndex)

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Started":
        return "bg-green-100 text-green-800 border-green-200"
      case "Ended":
        return "bg-red-100 text-red-800 border-red-200"
      case "Planned":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return ""
    }
  }

  return (
    <div>
      <div className="rounded-lg border bg-white overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Session Title</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Division</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Total Groups</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentSessions.map((session) => (
              <tr key={session.id} className="border-b">
                <td className="py-3 px-4 text-sm">{session.date}</td>
                <td className="py-3 px-4 text-sm font-medium">{session.title}</td>
                <td className="py-3 px-4 text-sm">{session.division}</td>
                <td className="py-3 px-4 text-sm">{session.totalGroups}</td>
                <td className="py-3 px-4">
                  <Badge variant="outline" className={`${getStatusBadgeClass(session.status)}`}>
                    {session.status}
                  </Badge>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <button className="text-gray-500 hover:text-gray-700" onClick={() => onEdit && onEdit(session.id)}>
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => onDelete && onDelete(session.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Showing</span>
          <Select value={itemsPerPage} onValueChange={onItemsPerPageChange}>
            <SelectTrigger className="h-8 w-16">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="text-sm text-gray-500">
          Showing {startIndex + 1} to {Math.min(endIndex, totalSessions)} out of {totalSessions} records
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 p-0"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {Array.from({ length: Math.min(totalPages, 4) }, (_, i) => (
            <Button
              key={i + 1}
              variant="outline"
              className={`h-8 w-8 p-0 ${currentPage === i + 1 ? "bg-blue-600 text-white" : ""}`}
              onClick={() => onPageChange(i + 1)}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 p-0"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
