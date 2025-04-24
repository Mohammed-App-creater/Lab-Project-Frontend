"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Database, MoreVertical } from "lucide-react"
import { cn } from "@/lib/utils"

export default function SessionCalendar() {
  const [date, setDate] = useState<Date>(new Date(2023, 6, 6)) // July 6, 2023
  const [month, setMonth] = useState<Date>(new Date(2023, 6, 1)) // July 2023
  //he Calendar component is built on top of React DayPicker.
  // Sample session data
  const sessions = [
    {
      date: "Wednesday, 06 July 2023",
      events: [     
        { time: "09:30", department: "CPD", title: "Contest in CPD Division" },
        { time: "12:00", department: "Development Division", title: "Development Weekly Sessions" },
        { time: "01:30", department: "Cyber", title: "Cyber Weekly Sessions" },
      ],  
    },
    {
      date: "Thursday, 07 July 2023",
      events: [
        { time: "09:30", department: "Data Science", title: "Data Science Weekly Sessions" },
        { time: "11:00", department: "CPD", title: "Contest Analysis in CPD Division" },
      ],
    },
  ]

  return (
    <div className="w-full max-w-md mx-auto  rounded-lg overflow-hidden shadow-sm border">
      <div className="p-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Session</h2>
        <Database className="h-5 w-5 text-slate-500" />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <Button variant="outline" size="icon" className="h-8 w-8 bg-[#003087] text-white">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="font-medium">July, 2023</h3>
          <Button variant="outline" size="icon" className="h-8 w-8 bg-[#003087] text-white">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => newDate && setDate(newDate)}
          month={month}
          onMonthChange={setMonth}
          className="rounded-md border"
          classNames={{
            day_selected:
              "bg-[#003087] text-primary-foreground hover:bg-[#003087] hover:text-primary-foreground focus:bg-[#003087] focus:text-primary-foreground",
            day_today: "bg-accent text-accent-foreground",
            day: cn("h-9 w-9 p-0 font-normal aria-selected:opacity-100"),
            day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
            day_hidden: "invisible",
            head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
            cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
            table: "border-collapse space-y-1",
          }}
        />
      </div>

      <div className="px-4 pb-4">
        {sessions.map((session, index) => (
          <div key={index} className="mt-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-700">{session.date}</h4>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>

            {session.events.map((event, eventIndex) => (
              <div key={eventIndex} className="mt-3 flex">
                <div className="w-12 text-sm font-medium">{event.time}</div>
                <div className="ml-4 border-l-2 border-primary pl-4 flex-1">
                  <div className="text-xs text-gray-500">{event.department}</div>
                  <div className="text-sm font-medium">{event.title}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
