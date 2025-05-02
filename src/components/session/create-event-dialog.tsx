"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface CreateEventDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: (data: EventFormData) => void
}

export interface EventFormData {
  title: string
  visibility: "Public" | "Members"
  date: string
  startTime: string
  endTime: string
  selectedDate?: number
}

export function CreateEventDialog({ open, onOpenChange, onSubmit }: CreateEventDialogProps) {
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    visibility: "Public",
    date: "",
    startTime: "",
    endTime: "",
  })

  const [showCalendar, setShowCalendar] = useState(false)
  const [currentMonth, setCurrentMonth] = useState("January")
  const [selectedDate, setSelectedDate] = useState<number | null>(2)

  const handleChange = (field: keyof EventFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    onSubmit?.(formData)
    onOpenChange(false)
  }

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar)
  }

  const prevMonth = () => {
    // Logic to go to previous month
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    const currentIndex = months.indexOf(currentMonth)
    if (currentIndex > 0) {
      setCurrentMonth(months[currentIndex - 1])
    } else {
      setCurrentMonth(months[11])
    }
  }

  const nextMonth = () => {
    // Logic to go to next month
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    const currentIndex = months.indexOf(currentMonth)
    if (currentIndex < 11) {
      setCurrentMonth(months[currentIndex + 1])
    } else {
      setCurrentMonth(months[0])
    }
  }

  const selectDate = (date: number) => {
    setSelectedDate(date)
    setFormData((prev) => ({ ...prev, selectedDate: date, date: `${date} ${currentMonth}` }))
    setShowCalendar(false)
  }

  // Calendar data for January
  const days = [
    { day: 31, isCurrentMonth: false },
    ...Array.from({ length: 31 }, (_, i) => ({ day: i + 1, isCurrentMonth: true })),
    ...Array.from({ length: 4 }, (_, i) => ({ day: i + 1, isCurrentMonth: false })),
  ]

  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  const isHighlighted = (day: number) => day === 18
  const isSelected = (day: number) => day === selectedDate

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden max-w-md">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-6">Add New Event</h2>

          <div className="space-y-4">
            <Input
              placeholder="Event Title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full"
            />

            <div className="flex justify-between items-start">
              <div className="w-1/2 pr-2">
                <div className="relative">
                  <div
                    className="flex items-center justify-between border rounded-md p-2 cursor-pointer"
                    onClick={toggleCalendar}
                  >
                    <span className="text-gray-500">Select Date</span>
                    <span className="text-gray-400">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </div>

                  {showCalendar && (
                    <div className="absolute top-full left-0 w-full bg-white border rounded-md shadow-lg z-10 mt-1">
                      <div className="flex items-center justify-between p-2 border-b">
                        <button onClick={prevMonth} className="p-1">
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <span className="font-medium">{currentMonth}</span>
                        <button onClick={nextMonth} className="p-1">
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-7 gap-1 p-2">
                        {weekdays.map((day) => (
                          <div key={day} className="text-center text-xs text-gray-500 py-1">
                            {day}
                          </div>
                        ))}

                        {days.map((day, i) => (
                          <div
                            key={i}
                            className={cn(
                              "text-center py-1 text-sm cursor-pointer",
                              !day.isCurrentMonth && "text-gray-300",
                              isSelected(day.day) && day.isCurrentMonth && "bg-blue-100 rounded-md",
                              isHighlighted(day.day) && day.isCurrentMonth && "bg-blue-700 text-white rounded-md",
                            )}
                            onClick={() => day.isCurrentMonth && selectDate(day.day)}
                          >
                            {day.day}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-1/2 pl-2">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Select Visibility</h3>
                  <RadioGroup
                    value={formData.visibility}
                    onValueChange={(value: "Public" | "Members") => handleChange("visibility", value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Public" id="public" />
                      <Label htmlFor="public">Public</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Members" id="members" />
                      <Label htmlFor="members">Only for Members</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Start Time"
                type="time"
                value={formData.startTime}
                onChange={(e) => handleChange("startTime", e.target.value)}
              />
              <Input
                placeholder="End Time"
                type="time"
                value={formData.endTime}
                onChange={(e) => handleChange("endTime", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between p-4 border-t">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-blue-700 hover:bg-blue-800 text-white">
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
