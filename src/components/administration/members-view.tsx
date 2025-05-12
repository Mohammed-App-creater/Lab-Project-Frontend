"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Filter, Pencil, Search, Trash2 } from "lucide-react"
import type { MemberRecord } from "@/lib/types"

interface MembersViewProps {
  onBack: () => void
  memberRecords: MemberRecord[]
}

export default function MembersView({ onBack, memberRecords }: MembersViewProps) {
  return (
    <Card className="border shadow-sm">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="pl-8" />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="destructive" className="bg-blue-700 hover:bg-blue-800 text-white">
              Remove Selected
            </Button>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              <TableHead>Member Name</TableHead>
              <TableHead>Member ID</TableHead>
              <TableHead>Division</TableHead>
              <TableHead>Attendance</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {memberRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8 border">
                      <AvatarImage src={record.avatar || "/placeholder.svg"} alt={record.name} />
                      <AvatarFallback>{record.initials}</AvatarFallback>
                    </Avatar>
                    <span>{record.name}</span>
                  </div>
                </TableCell>
                <TableCell>{record.memberId}</TableCell>
                <TableCell>{record.division}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      record.attendance === "Active"
                        ? "bg-green-100 text-green-800 border-green-200"
                        : "bg-yellow-100 text-yellow-800 border-yellow-200"
                    }
                  >
                    {record.attendance}
                  </Badge>
                </TableCell>
                <TableCell>{record.year}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      record.status === "On Campus"
                        ? "bg-green-100 text-green-800 border-green-200"
                        : record.status === "Off Campus"
                          ? "bg-red-100 text-red-800 border-red-200"
                          : "bg-blue-100 text-blue-800 border-blue-200"
                    }
                  >
                    {record.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between p-4 border-t mt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Showing</span>
            <Select defaultValue="10">
              <SelectTrigger className="w-16 h-8">
                <SelectValue>10</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="text-sm text-gray-500">Showing 1 to 10 out of 60 records</div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">4</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        <div className="mt-4">
          <Button variant="outline" onClick={onBack}>
            Back to Rules
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
