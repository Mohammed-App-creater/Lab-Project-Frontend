"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Pencil, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export interface Event {
  id: string
  date: string
  title: string
  type: string
  visibility: "Public" | "Members"
  status: "Started" | "Ended" | "Planned"
}

interface EventsTableViewProps {
  events: Event[]
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  itemsPerPage: string
  onItemsPerPageChange: (value: string) => void
  currentPage: number
  onPageChange: (newPage: number) => void
  totalPages: number
  totalEvents: number
}

export function EventsTableView({
  events,
  onEdit,
  onDelete,
  itemsPerPage,
  onItemsPerPageChange,
  currentPage,
  onPageChange,
  totalPages,
  totalEvents
}: EventsTableViewProps) {
  const itemsPerPageNum = parseInt(itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPageNum
  const endIndex = startIndex + itemsPerPageNum
  const currentEvents = events.slice(startIndex, endIndex)

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Started":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-800"
      case "Ended":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-800"
      case "Planned":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-800"
      default:
        return ""
    }
  }

  const getVisibilityBadgeClass = (visibility: string) => {
    switch (visibility) {
      case "Public":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-800"
      case "Members":
        return "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-200 dark:border-purple-800"
      default:
        return ""
    }
  }

  return (
    <div>
      <div className="rounded-lg border bg-white dark:bg-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-300">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-300">Event Title</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-300">Event Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-300">Visibility</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-300">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentEvents.map((event) => (
                <tr key={event.id} className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-3 px-4 text-sm dark:text-gray-200">{event.date}</td>
                  <td className="py-3 px-4 text-sm font-medium dark:text-gray-200">{event.title}</td>
                  <td className="py-3 px-4 text-sm dark:text-gray-200">{event.type}</td>
                  <td className="py-3 px-4">
                    <Badge variant="outline" className={`${getVisibilityBadgeClass(event.visibility)}`}>
                      {event.visibility}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="outline" className={`${getStatusBadgeClass(event.status)}`}>
                      {event.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" onClick={() => onEdit && onEdit(event.id)}>
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        onClick={() => onDelete && onDelete(event.id)}
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
      </div>

      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">Showing</span>
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
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Showing {startIndex + 1} to {Math.min(endIndex, totalEvents)} out of {totalEvents} records
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 p-0 dark:border-gray-600 dark:hover:bg-gray-700"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {Array.from({ length: Math.min(totalPages, 4) }, (_, i) => (
            <Button
              key={i + 1}
              variant="outline"
              className={`h-8 w-8 p-0 dark:border-gray-600 dark:hover:bg-gray-700 ${currentPage === i + 1 ? "bg-blue-600 text-white dark:bg-blue-700" : ""
                }`}
              onClick={() => onPageChange(i + 1)}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 p-0 dark:border-gray-600 dark:hover:bg-gray-700"
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
