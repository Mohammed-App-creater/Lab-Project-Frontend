"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, LayoutList, TableIcon ,PlusCircleIcon} from "lucide-react"
import { CreateEventDialog } from "@/components/session/create-event-dialog"
import { CreateSessionDialog } from "../../../components/session/create-session-dialog"
import { EventsTableView } from "@/components/session/events-table-view"
import { EventsListView } from "@/components/session/events-list-view"
import { SessionsListView } from "@/components/session/sessions-list-view"
import { SessionsTableView } from "@/components/session/session-table-view"

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

// Sample data for events table
const sampleEvents: Event[] = [
  {
    id: "1",
    date: "July 01, 2023",
    title: "Cyber Security Tutorial",
    type: "CPD",
    visibility: "Public",
    status: "Started",
  },
  {
    id: "2",
    date: "July 02, 2023",
    title: "Cyber Security Tutorial",
    type: "CPD",
    visibility: "Public",
    status: "Started",
  },
  {
    id: "3",
    date: "July 03, 2023",
    title: "Weekly session",
    type: "CPD",
    visibility: "Members",
    status: "Started",
  },
  {
    id: "4",
    date: "July 04, 2023",
    title: "Cyber Security Tutorial",
    type: "CPD",
    visibility: "Public",
    status: "Ended",
  },
  {
    id: "5",
    date: "July 05, 2023",
    title: "Contest",
    type: "CPD",
    visibility: "Public",
    status: "Ended",
  },
  {
    id: "6",
    date: "July 06, 2023",
    title: "Contest",
    type: "CPD",
    visibility: "Public",
    status: "Planned",
  },
  {
    id: "7",
    date: "July 07, 2023",
    title: "Game Night",
    type: "Dev",
    visibility: "Members",
    status: "Started",
  },
  {
    id: "8",
    date: "July 08, 2023",
    title: "Seminar",
    type: "Dev",
    visibility: "Public",
    status: "Ended",
  },
]

// Sample data for session cards
const sessionCards: SessionItem[] = [
  {
    id: "1",
    status: "Planned",
    division: "Dev Division",
    title: "Development weekly session",
    date: "Wednesday, 05 July 2023",
    groups: [
      { id: "1", name: "Group 1" },
      { id: "2", name: "Group 2" },
      { id: "3", name: "Group 3" },
    ],
    venue: "Lab 1",
    timeRemaining: "1d 12h 31m left",
  },
  {
    id: "2",
    status: "Planned",
    division: "Dev Division",
    title: "Development weekly session",
    date: "Wednesday, 05 July 2023",
    groups: [
      { id: "1", name: "Group 1" },
      { id: "2", name: "Group 2" },
      { id: "3", name: "Group 3" },
    ],
    venue: "Lab 1",
    timeRemaining: "1d 12h 31m left",
  },
  {
    id: "3",
    status: "Ended",
    division: "Dev Division",
    title: "Development weekly session",
    date: "Wednesday, 05 July 2023",
    groups: [
      { id: "1", name: "Group 1" },
      { id: "2", name: "Group 2" },
      { id: "3", name: "Group 3" },
    ],
    venue: "Lab 1",
    timeAgo: "1d 12h 5m ago",
  },
  {
    id: "4",
    status: "Planned",
    division: "Dev Division",
    title: "Development weekly session",
    date: "Wednesday, 05 July 2023",
    groups: [
      { id: "1", name: "Group 1" },
      { id: "2", name: "Group 2" },
      { id: "3", name: "Group 3" },
    ],
    venue: "Lab 1",
    timeRemaining: "1d 12h 31m left",
  },
]

// Sample data for event cards
const eventCards: EventItem[] = [
  {
    id: "1",
    status: "Planned",
    title: "Tutorial",
    description: "Cyber Security Tutorial",
    date: "Wednesday, 06 July 2023",
    visibility: "Public",
    venue: "Lab 1",
    timeRemaining: "1d 12h 31m left",
  },
  {
    id: "2",
    status: "Planned",
    title: "Game Night",
    description: "Funny Games Beyond Coding",
    date: "Wednesday, 06 July 2023",
    visibility: "Members",
    venue: "Lab 1",
    timeRemaining: "1d 12h 31m left",
  },
  {
    id: "3",
    status: "Ended",
    title: "Seminar",
    description: "Working Remotely",
    date: "Wednesday, 06 July 2023",
    visibility: "Public",
    venue: "Lab 1",
    timeAgo: "1d 12h 5m ago",
  },
  {
    id: "4",
    status: "Planned",
    title: "Dev Division",
    description: "Development weekly session",
    date: "Wednesday, 06 July 2023",
    visibility: "Members",
    venue: "Lab 1",
    timeRemaining: "1d 12h 31m left",
  },
]

export default function SessionsEventsPage() {
  const [activeTab, setActiveTab] = useState<"sessions" | "events">("sessions")
  const [viewMode, setViewMode] = useState<"list" | "table">("list")
  const [createSessionOpen, setCreateSessionOpen] = useState(false)
  const [createEventOpen, setCreateEventOpen] = useState(false)

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
          {/* <Button
            variant="ghost"
            className={`rounded-none ${activeTab === "sessions" ? "bg-blue-700 text-white hover:bg-blue-800" : ""}`}
            onClick={() => setActiveTab("sessions")}
          >
            Sessions
          </Button>
          <Button
            variant="ghost"
            className={`rounded-none ${activeTab === "events" ? "bg-blue-700 text-white hover:bg-blue-800" : ""}`}
            onClick={() => setActiveTab("events")}
          >
            Events
          </Button> */}

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
          <SessionsListView sessions={sessionCards} />
        ) : (
          <SessionsTableView sessions={sampleSessions} onEdit={handleEditSession} onDelete={handleDeleteSession} />
        )
      ) : viewMode === "list" ? (
        <EventsListView events={eventCards} />
      ) : (
        <EventsTableView events={sampleEvents} onEdit={handleEditEvent} onDelete={handleDeleteEvent} />
      )}

      <CreateSessionDialog
        open={createSessionOpen}
        onOpenChange={setCreateSessionOpen}
        onSubmit={handleCreateSession}
      />

      <CreateEventDialog open={createEventOpen} onOpenChange={setCreateEventOpen} onSubmit={handleCreateEvent} />
    </div>
  )
}
