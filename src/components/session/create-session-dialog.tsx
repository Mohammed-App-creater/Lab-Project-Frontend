"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface CreateSessionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: (data: SessionFormData) => void
}

export interface TimeSlot {
  day: string
  startTime: string
  endTime: string
}

export interface SessionFormData {
  title: string
  division: string
  group: string
  startMonth: string
  endMonth: string
  timeSlots: TimeSlot[]
}

export function CreateSessionDialog({ open, onOpenChange, onSubmit }: CreateSessionDialogProps) {
  const [formData, setFormData] = useState<SessionFormData>({
    title: "",
    division: "",
    group: "",
    startMonth: "",
    endMonth: "",
    timeSlots: [],
  })

  const [newTimeSlot, setNewTimeSlot] = useState<TimeSlot>({
    day: "",
    startTime: "",
    endTime: "",
  })

  const [showStartMonthCalendar, setShowStartMonthCalendar] = useState(false)
  const [showEndMonthCalendar, setShowEndMonthCalendar] = useState(false)
  const [currentMonth, setCurrentMonth] = useState("January")
  const [selectedDate, setSelectedDate] = useState<number | null>(2)

  const handleTimeSlotChange = (field: keyof TimeSlot, value: string) => {
    setNewTimeSlot((prev) => ({ ...prev, [field]: value }))
  }

  const addTimeSlot = () => {
    if (newTimeSlot.day && newTimeSlot.startTime && newTimeSlot.endTime) {
      setFormData((prev) => ({
        ...prev,
        timeSlots: [...prev.timeSlots, { ...newTimeSlot }],
      }))
      setNewTimeSlot({ day: "", startTime: "", endTime: "" })
    }
  }

  const removeTimeSlot = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      timeSlots: prev.timeSlots.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = () => {
    onSubmit?.(formData)
    onOpenChange(false)
  }

  const toggleStartMonthCalendar = () => {
    setShowStartMonthCalendar(!showStartMonthCalendar)
    setShowEndMonthCalendar(false)
  }

  const toggleEndMonthCalendar = () => {
    setShowEndMonthCalendar(!showEndMonthCalendar)
    setShowStartMonthCalendar(false)
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
    if (showStartMonthCalendar) {
      setFormData((prev) => ({ ...prev, startMonth: `${currentMonth}` }))
      setShowStartMonthCalendar(false)
    } else if (showEndMonthCalendar) {
      setFormData((prev) => ({ ...prev, endMonth: `${currentMonth}` }))
      setShowEndMonthCalendar(false)
    }
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
          <h2 className="text-lg font-semibold mb-6">Add New Session</h2>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Session Title"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                className="w-full"
              />

              <Select
                value={formData.division}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, division: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Session Division" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CPD">CPD</SelectItem>
                  <SelectItem value="Dev">Dev</SelectItem>
                  <SelectItem value="Cyber">Cyber</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <Select
                value={formData.group}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, group: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Session Group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Div 1">Div 1</SelectItem>
                  <SelectItem value="Div 2">Div 2</SelectItem>
                  <SelectItem value="Div 3">Div 3</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative">
                <Input
                  placeholder="Start Month"
                  value={formData.startMonth}
                  onClick={toggleStartMonthCalendar}
                  readOnly
                  className="w-full cursor-pointer"
                />

                {showStartMonthCalendar && (
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

              <div className="relative">
                <Input
                  placeholder="End Month"
                  value={formData.endMonth}
                  onClick={toggleEndMonthCalendar}
                  readOnly
                  className="w-full cursor-pointer"
                />

                {showEndMonthCalendar && (
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

            {/* Time slots */}
            {formData.timeSlots.map((slot, index) => (
              <div key={index} className="grid grid-cols-4 gap-4 items-center">
                <Input value={slot.day} readOnly className="bg-gray-50" />
                <Input value={slot.startTime} readOnly className="bg-gray-50" />
                <Input value={slot.endTime} readOnly className="bg-gray-50" />
                <Button
                  variant="outline"
                  onClick={() => removeTimeSlot(index)}
                  className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                >
                  Remove
                </Button>
              </div>
            ))}

            <div className="grid grid-cols-4 gap-6 items-center">
              <Select value={newTimeSlot.day} onValueChange={(value) => handleTimeSlotChange("day", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Monday">Monday</SelectItem>
                  <SelectItem value="Tuesday">Tuesday</SelectItem>
                  <SelectItem value="Wednesday">Wednesday</SelectItem>
                  <SelectItem value="Thursday">Thursday</SelectItem>
                  <SelectItem value="Friday">Friday</SelectItem>
                </SelectContent>
              </Select>

              <Input
                type="time"
                placeholder="Start Time"
                value={newTimeSlot.startTime}
                onChange={(e) => handleTimeSlotChange("startTime", e.target.value)}
              />

              <Input
                type="time"
                placeholder="End Time"
                value={newTimeSlot.endTime}
                onChange={(e) => handleTimeSlotChange("endTime", e.target.value)}
              />

              <Button onClick={addTimeSlot} className="bg-blue-700 hover:bg-blue-800 text-white">
                Add
              </Button>
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
