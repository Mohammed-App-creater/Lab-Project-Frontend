"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { format } from "date-fns"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"

interface CreateEventDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: (data: EventFormData) => void
  onEventCreated?: () => void
}

export interface EventFormData {
  title: string
  startDate: string
  startTime: string
  endTime: string
  creatorId: string
  visibility: "PUBLIC" | "MEMBERS"
  tag: string[]
  divisionId: string | null
  groups: string[]
}

export function CreateEventDialog({ open, onOpenChange, onSubmit, onEventCreated }: CreateEventDialogProps) {
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    startDate: "",
    startTime: "",
    endTime: "",
    creatorId: "098bc22d-aca2-44fb-ac27-2347d4459e86",
    visibility: "PUBLIC",
    tag: ["SEC", "CPD"],
    divisionId: null,
    groups: []
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [calendarOpen, setCalendarOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const handleChange = (field: keyof EventFormData, value: string | string[] | "PUBLIC" | "MEMBERS" | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    try {
      if (!formData.title || !formData.startDate || !formData.startTime || !formData.endTime) {
        toast.error("Please fill in all required fields")
        return
      }

      setIsSubmitting(true)
      const response = await fetch('https://csec-lab-portal-backend.onrender.com/api/event/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Failed to create event')
      }

      toast.success("Event created successfully")
      onSubmit?.(formData)
      onEventCreated?.()
      onOpenChange(false)
    } catch (error) {
      console.error('Error creating event:', error)
      toast.error("Failed to create event")
    } finally {
      setIsSubmitting(false)
    }
  }

  const prevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1))
  }

  const nextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1))
  }

  const selectDate = (date: number) => {
    const selected = new Date(new Date().getFullYear(), currentMonth, date)
    setSelectedDate(selected)
    const isoDate = format(selected, 'yyyy-MM-dd')
    setFormData((prev) => ({ ...prev, startDate: isoDate }))
    setCalendarOpen(false)
  }

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay()
  }

  const currentYear = new Date().getFullYear()
  const daysInMonth = getDaysInMonth(currentMonth, currentYear)
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth, currentYear)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden w-full max-w-full sm:max-w-md">
        <div className="p-4 sm:p-6 w-full max-w-full">
          <h2 className="text-lg font-semibold mb-4 sm:mb-6">Add New Event</h2>

          <div className="space-y-4 w-full max-w-full">
            <Input
              placeholder="Event Title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full"
            />

            <div className="flex justify-between items-start">
              <div className="w-1/2 pr-2">
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <div
                      className="flex items-center justify-between border rounded-md p-2 cursor-pointer"
                    >
                      <span className="text-gray-500">
                        {selectedDate ? format(selectedDate, 'MMM dd, yyyy') : 'Select Date'}
                      </span>
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
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-[280px] p-2">
                    <div className="flex items-center justify-between p-2 border-b">
                      <button onClick={prevMonth} className="p-1 hover:bg-accent rounded-sm">
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <span className="font-medium">
                        {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}
                      </span>
                      <button onClick={nextMonth} className="p-1 hover:bg-accent rounded-sm">
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-7 gap-1 p-2">
                      {weekdays.map((day) => (
                        <div key={day} className="text-center text-xs text-muted-foreground py-1">
                          {day}
                        </div>
                      ))}

                      {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                        <div key={`empty-${i}`} className="text-center py-1 text-sm" />
                      ))}

                      {days.map((day) => {
                        const currentDate = new Date(currentYear, currentMonth, day)
                        const isSelected = selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(currentDate, 'yyyy-MM-dd')
                        const isToday = format(new Date(), 'yyyy-MM-dd') === format(currentDate, 'yyyy-MM-dd')

                        return (
                          <div
                            key={day}
                            className={cn(
                              "text-center py-1 text-sm cursor-pointer rounded-md hover:bg-accent transition-colors",
                              isSelected && "bg-blue-700 text-white hover:bg-blue-800",
                              isToday && !isSelected && "bg-accent/50"
                            )}
                            onClick={() => selectDate(day)}
                          >
                            {day}
                          </div>
                        )
                      })}
                     
                    </div>
                    
                  </PopoverContent>
                </Popover>
              </div>

              <div className="w-full sm:w-1/2 sm:pl-2 mt-2 sm:mt-0">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Select Visibility</h3>
                  <RadioGroup
                    value={formData.visibility}
                    onValueChange={(value: "PUBLIC" | "MEMBERS") => handleChange("visibility", value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="PUBLIC" id="public" />
                      <Label htmlFor="public">Public</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="MEMBERS" id="members" />
                      <Label htmlFor="members">Only for Members</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
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

        <div className="flex flex-col sm:flex-row justify-between p-4 border-t gap-2 w-full">
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            className="bg-blue-700 hover:bg-blue-800 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
