"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

export type EventStatus = "started" | "ended" | "planned"
export type EventVisibility = "public" | "members"

export interface Event {
  id: string
  date: string
  title: string
  type: string
  visibility: EventVisibility
  status: EventStatus
}

interface EventsTableProps {
  events: Event[]
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

export function EventsTable({ events, onEdit, onDelete }: EventsTableProps) {
  const statusColors = {
    started: "bg-green-100 text-green-800",
    ended: "bg-red-100 text-red-800",
    planned: "bg-yellow-100 text-yellow-800",
  }

  const visibilityColors = {
    public: "bg-blue-100 text-blue-800",
    members: "bg-purple-100 text-purple-800",
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Event Title</TableHead>
            <TableHead>Event Type</TableHead>
            <TableHead>Visibility</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell className="font-medium">{event.date}</TableCell>
              <TableCell>{event.title}</TableCell>
              <TableCell>{event.type}</TableCell>
              <TableCell>
                <Badge variant="outline" className={cn("capitalize", visibilityColors[event.visibility])}>
                  {event.visibility}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={cn("capitalize", statusColors[event.status])}>
                  {event.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => onEdit?.(event.id)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete?.(event.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
