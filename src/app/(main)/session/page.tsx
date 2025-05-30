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

// Remove the local definition and import the shared interface
import { SessionFormData } from "@/components/session/create-session-dialog";

import { EventFormData } from "@/components/session/create-event-dialog";

interface RawGroup {
  id: string;
  name: string;
}

interface RawSession {
  id: string;
  title: string;
  startMonth: string;
  tags?: string[];
  visibility?: string;
  location: string;
  timeSlots?: {
    status: "Planned" | "Started" | "Ended";
  }[];
  groups: RawGroup[];
}

interface TransformedSession {
  id: string;
  status: "Planned" | "Started" | "Ended";
  division: string;
  title: string;
  date: string;
  venue: string;
  groups: {
    id: string;
    name: string;
  }[];
  timeRemaining?: string;
  timeAgo?: string;
}

interface RawEvent {
  id: string;
  startDate: string;
  title: string;
  tags?: string[];
  visibility: "Public" | "Members";
  status: "Planned" | "Started" | "Ended";
}

interface TransformedEvent {
  id: string;
  date: string;
  title: string;
  type: string;
  visibility: "Public" | "Members";
  status: "Planned" | "Started" | "Ended";
}






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
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}api/event/events?limit=${itemsPerPage}&page=${currentPage}`);
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
  
      const data: RawEvent[] = await response.json();
  
      const transformedEvents: TransformedEvent[] = data.map((event) => ({
        id: event.id,
        date: new Date(event.startDate).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric"
        }),
        title: event.title,
        type: event.tags?.[0] || "General",
        visibility: event.visibility,
        status: event.status
      }));
  
      setEvents(transformedEvents);
  
      if (data.length === itemsPerPage) {
        setTotalPages(currentPage + 1);
      } else {
        setTotalPages(currentPage);
      }
  
      setTotalEvents((currentPage - 1) * itemsPerPage + data.length);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  

  const fetchSessions = async () => {
    try {
      setLoading(true);
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}api/session/sessions?limit=${itemsPerPage}&page=${currentPage}`);
      if (!response.ok) {
        throw new Error("Failed to fetch sessions");
      }
  
      const data: RawSession[] = await response.json();
  
      const transformedSessions: TransformedSession[] = data.map((session) => ({
        id: session.id,
        status: session.timeSlots?.[0]?.status || "Planned",
        division: session.tags?.[0] || "General",
        title: session.title,
        date: new Date(session.startMonth).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric"
        }),
        groups: session.groups.map((group) => ({
          id: group.id,
          name: group.name
        })),
        venue: session.location,
        timeRemaining: session.timeSlots?.[0]?.status === "Planned" ? "Upcoming" : undefined,
        timeAgo: session.timeSlots?.[0]?.status === "Ended" ? "Completed" : undefined
      }));
  
      setSessions(transformedSessions);
  
      const totalCount = data.length;
      const calculatedTotalPages = Math.ceil(totalCount / itemsPerPage);
      setTotalPages(calculatedTotalPages);
      setTotalSessions(totalCount);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  
  const handleSessionCreated = () => {
    fetchSessions()
  }

  useEffect(() => {
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
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 w-full max-w-full">
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
        <h1 className="text-xl sm:text-2xl font-bold">Sessions & Events</h1>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="default" className="bg-blue-700 flex gap-2 hover:bg-blue-800" onClick={handleCreateClick}>
            <PlusCircleIcon className="h-4 w-4" />
            <span className="hidden xs:inline">Create {activeTab === "sessions" ? "Session" : "Event"}</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-0 sm:ml-2">
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

      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
        <div className="flex gap-2">
          <Button
            variant="ghost"
            className={viewMode === "list" ? "bg-blue-700 px-2 py-1 flex gap-2 text-white hover:bg-blue-800" : ""}
            onClick={() => setViewMode("list")}
            size="sm"
          >
            <LayoutList className="h-4 w-4" />
            <span className="hidden xs:inline">List</span>
          </Button>
          <Button
            variant="ghost"
            className={viewMode === "table" ? "bg-blue-700 px-2 py-1 flex gap-2 text-white hover:bg-blue-800" : ""}
            onClick={() => setViewMode("table")}
            size="sm"
          >
            <TableIcon className="h-4 w-4" />
            <span className="hidden xs:inline">Table</span>
          </Button>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
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
      </div>

      <CreateSessionDialog
        open={createSessionOpen}
        onOpenChange={setCreateSessionOpen}
        onSubmit={handleCreateSession}
        onSessionCreated={handleSessionCreated}
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
