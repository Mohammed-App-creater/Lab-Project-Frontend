"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

export type SessionStatus = "started" | "ended" | "planned"

export interface Session {
  id: string
  date: string
  title: string
  division: string
  totalGroups: number
  status: SessionStatus
}

interface SessionsTableProps {
  sessions: Session[]
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

export function SessionsTable({ sessions, onEdit, onDelete }: SessionsTableProps) {
  const statusColors = {
    started: "bg-green-100 text-green-800",
    ended: "bg-red-100 text-red-800",
    planned: "bg-yellow-100 text-yellow-800",
  }

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table className="min-w-[800px] w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Session Title</TableHead>
            <TableHead>Division</TableHead>
            <TableHead>Total groups</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessions.map((session) => (
            <TableRow key={session.id}>
              <TableCell className="font-medium">{session.date}</TableCell>
              <TableCell>{session.title}</TableCell>
              <TableCell>{session.division}</TableCell>
              <TableCell>{session.totalGroups}</TableCell>
              <TableCell>
                <Badge variant="outline" className={cn("capitalize", statusColors[session.status])}>
                  {session.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => onEdit?.(session.id)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete?.(session.id)}>
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
