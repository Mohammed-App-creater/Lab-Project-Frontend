"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, LayoutList, TableIcon, PlusCircleIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { CreateEventDialog } from "@/components/session/create-event-dialog"
import { CreateSessionDialog } from "../../../components/session/create-session-dialog"
import { EventsTableView } from "@/components/session/events-table-view"
import { EventsListView } from "@/components/session/events-list-view"
import { SessionsListView } from "@/components/session/sessions-list-view"
import { SessionsTableView } from "@/components/session/session-table-view"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Define interfaces
interface Event {
  id: string
  date: string
  title: string
  type: string
  visibility: "Public" | "Members"
  status: "Started" | "Ended" | "Planned"
}

interface EventItem {
  id: string
  status: "Planned" | "Started" | "Ended"
  title: string
  description: string
  date: string
  visibility: "Public" | "Members"
  venue: string
  timeRemaining?: string
  timeAgo?: string
}

interface Session {
  id: string
  date: string
  title: string
  division: string
  totalGroups: number
  status: "Planned" | "Started" | "Ended"
}

interface SessionItem {
  id: string
  status: "Planned" | "Started" | "Ended"
  division: string
  title: string
  date: string
  groups: Array<{ id: string; name: string }>
  venue: string
  timeRemaining?: string
  timeAgo?: string
}

interface SessionFormData {
  // Add your session form data properties here
}

interface EventFormData {
  // Add your event form data properties here
}

// Sample data for sessions table
const sampleSessions: Session[] = [
  {
    id: "1",
    date: "July 01, 2023",
    title: "Weekly session",
    division: "CPD",
    totalGroups: 6,
    status: "Started",
  },
  {
    id: "2",
    date: "July 02, 2023",
    title: "Contest",
    division: "CPD",
    totalGroups: 2,
    status: "Started",
  },
  {
    id: "3",
    date: "July 03, 2023",
    title: "Weekly session",
    division: "CPD",
    totalGroups: 1,
    status: "Started",
  },
  {
    id: "4",
    date: "July 04, 2023",
    title: "Weekly session",
    division: "CPD",
    totalGroups: 0,
    status: "Ended",
  },
  {
    id: "5",
    date: "July 05, 2023",
    title: "Contest",
    division: "CPD",
    totalGroups: 4,
    status: "Ended",
  },
  {
    id: "6",
    date: "July 06, 2023",
    title: "Contest",
    division: "CPD",
    totalGroups: 2,
    status: "Planned",
  },
  {
    id: "7",
    date: "July 07, 2023",
    title: "Contest",
    division: "CPD",
    totalGroups: 2,
    status: "Started",
  },
  {
    id: "8",
    date: "July 08, 2023",
    title: "Contest",
    division: "Dev",
    totalGroups: 2,
    status: "Ended",
  },
  {
    id: "9",
    date: "July 09, 2023",
    title: "Weekly session",
    division: "Dev",
    totalGroups: 2,
    status: "Started",
  },
  {
    id: "10",
    date: "July 09, 2023",
    title: "Weekly session",
    division: "Dev",
    totalGroups: 2,
    status: "Started",
  },
]


export default function SessionsEventsPage() {
  const [activeTab, setActiveTab] = useState<"sessions" | "events">("sessions")
  const [viewMode, setViewMode] = useState<"list" | "table">("list")
  const [createSessionOpen, setCreateSessionOpen] = useState(false)
  const [createEventOpen, setCreateEventOpen] = useState(false)
  const [events, setEvents] = useState<Event[]>([])
  const [sessions, setSessions] = useState<SessionItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalSessions, setTotalSessions] = useState(0)
  const [totalEvents, setTotalEvents] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const response = await fetch(`https://csec-lab-portal-backend.onrender.com/api/event/events?limit=${itemsPerPage}&page=${currentPage}`)
      if (!response.ok) {
        throw new Error('Failed to fetch events')
      }
      const data = await response.json()
      
      const transformedEvents = data.map((event: any) => ({
        id: event.id,
        date: new Date(event.startDate).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        title: event.title,
        type: event.tags?.[0] || 'General',
        visibility: event.visibility,
        status: event.status
      }))
      
      setEvents(transformedEvents)
      
      if (data.length === itemsPerPage) {
        setTotalPages(currentPage + 1)
      } else {
        setTotalPages(currentPage)
      }
      setTotalEvents((currentPage - 1) * itemsPerPage + data.length)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://csec-lab-portal-backend.onrender.com/api/session/sessions?limit=${itemsPerPage}&page=${currentPage}`)
        if (!response.ok) {
          throw new Error('Failed to fetch sessions')
        }
        const data = await response.json()
        
        // Transform the backend data to match the SessionItem interface
        const transformedSessions = data.map((session: any) => ({
          id: session.id,
          status: session.timeSlots?.[0]?.status || "Planned",
          division: session.tags?.[0] || "General",
          title: session.title,
          date: new Date(session.startMonth).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          groups: session.groups.map((group: any) => ({
            id: group.id,
            name: group.name
          })),
          venue: session.location,
          timeRemaining: session.timeSlots?.[0]?.status === "Planned" ? "Upcoming" : undefined,
          timeAgo: session.timeSlots?.[0]?.status === "Ended" ? "Completed" : undefined
        }))
        
        setSessions(transformedSessions)
        
        // Get total count from response headers or calculate based on data length
        const totalCount = data.length
        const calculatedTotalPages = Math.ceil(totalCount / itemsPerPage)
        setTotalPages(calculatedTotalPages)
        setTotalSessions(totalCount)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    if (activeTab === 'sessions') {
      fetchSessions()
    } else if (activeTab === 'events') {
      fetchEvents()
    }
  }, [currentPage, activeTab, itemsPerPage])

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  const handleItemsPerPageChange = (value: string) => {
    const newItemsPerPage = parseInt(value)
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1) // Reset to first page when changing items per page
  }

  const handleCreateClick = () => {
    if (activeTab === "sessions") {
      setCreateSessionOpen(true)
    } else {
      setCreateEventOpen(true)
    }
  }

  const handleCreateSession = (data: SessionFormData) => {
    console.log("Creating session with data:", data)
    // Here you would typically send this data to your backend
  }

  const handleCreateEvent = (data: EventFormData) => {
    console.log("Creating event with data:", data)
    // Here you would typically send this data to your backend
  }

  const handleEditSession = (id: string) => {
    console.log("Editing session with ID:", id)
    // Implement edit functionality
  }

  const handleDeleteSession = (id: string) => {
    console.log("Deleting session with ID:", id)
    // Implement delete functionality
  }

  const handleEditEvent = (id: string) => {
    console.log("Editing event with ID:", id)
    // Implement edit functionality
  }

  const handleDeleteEvent = (id: string) => {
    console.log("Deleting event with ID:", id)
    // Implement delete functionality
  }

  const handleEventCreated = () => {
    fetchEvents()
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Sessions & Events</h1>
        <div className="flex items-center gap-2">
          <Button variant="default" className="bg-blue-700 flex gap-2 hover:bg-blue-800" onClick={handleCreateClick}>
            <PlusCircleIcon className="h-4 w-4" />
            Create {activeTab === "sessions" ? "Session" : "Event"}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-2">
                {activeTab === "sessions" ? "Session" : "Event"} <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setActiveTab("sessions")}>Sessions</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("events")}>Events</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div className="flex  overflow-hidden">

        <div className="flex gap-3">
          <Button
            variant="ghost"
            className={viewMode === "list" ? "bg-blue-700 px-2 py-1 flex gap-2 text-white hover:bg-blue-800" : ""}
            onClick={() => setViewMode("list")}
            size="sm"
          >
            <LayoutList className="h-4 w-4" />
            <p>List</p>
          </Button>
          <Button
            variant="ghost"
            className={viewMode === "table" ? "bg-blue-700 px-2 py-1 flex gap-2 text-white hover:bg-blue-800" : ""}
            onClick={() => setViewMode("table")}
            size="sm"
          >
            <TableIcon className="h-4 w-4" /> 
            <p>Table</p>
          </Button>
        </div>
        </div>
        
      </div>

      {activeTab === "sessions" ? (
        viewMode === "list" ? (
          <>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              </div>
            ) : error ? (
              <div className="text-red-500 text-center p-4">{error}</div>
            ) : (
              <>
                <SessionsListView sessions={sessions} />
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Showing</span>
                    <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
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
                    Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalSessions)} to {Math.min(currentPage * itemsPerPage, totalSessions)} of {totalSessions} sessions
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1 || loading}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages || loading}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <SessionsTableView 
            sessions={sessions.map(session => ({
              id: session.id,
              date: session.date,
              title: session.title,
              division: session.division,
              totalGroups: session.groups.length,
              status: session.status
            }))} 
            onEdit={handleEditSession} 
            onDelete={handleDeleteSession}
            itemsPerPage={itemsPerPage.toString()}
            onItemsPerPageChange={handleItemsPerPageChange}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalPages={totalPages}
            totalSessions={totalSessions}
          />
        )
      ) : viewMode === "list" ? (
        <>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center p-4">{error}</div>
          ) : (
            <>
              <EventsListView events={events.map(event => ({
                id: event.id,
                status: event.status,
                title: event.title,
                description: '',
                date: event.date,
                visibility: event.visibility,
                venue: 'TBD',
                timeRemaining: event.status === 'Planned' ? 'Upcoming' : undefined,
                timeAgo: event.status === 'Ended' ? 'Completed' : undefined
              }))} />
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalEvents)} of {totalEvents} events
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1 || loading}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || loading}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center p-4">{error}</div>
          ) : (
            <EventsTableView 
              events={events} 
              onEdit={handleEditEvent} 
              onDelete={handleDeleteEvent}
              itemsPerPage={itemsPerPage.toString()}
              onItemsPerPageChange={handleItemsPerPageChange}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              totalPages={totalPages}
              totalEvents={totalEvents}
            />
          )}
        </>
      )}

      <CreateSessionDialog
        open={createSessionOpen}
        onOpenChange={setCreateSessionOpen}
        
      />

      <CreateEventDialog 
        open={createEventOpen} 
        onOpenChange={setCreateEventOpen} 
        onSubmit={handleCreateEvent}
        onEventCreated={handleEventCreated}
      />
    </div>
  )
}
