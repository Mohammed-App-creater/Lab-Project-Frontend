"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Toaster, toast } from "sonner"
import { Calendar } from "@/components/ui/calendar"
import { addMonths, format } from "date-fns"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface CreateSessionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: (data: SessionFormData) => void
}

export interface TimeSlot {
  date: string
  startTime: string
  endTime: string
}

export interface SessionFormData {
  title: string
  description: string
  startMonth: string
  endTMonth: string
  location: string
  creatorId: string
  divisionId: string
  tags: string[]
  timeSlotAndGroup: {
    groupIds: string[]
    timeSlots: TimeSlot[]
  }
}

// Division and group options (with IDs for backend)
const DIVISIONS = [
  { id: "bc539ae7-1452-4bc4-9e1b-f2b030c4215c", label: "CPD" },
  { id: "dev-division-id", label: "Dev" },
  { id: "cyber-division-id", label: "Cyber" },
  { id: "dataScience-division-id", label: "Data Science" },
]
const GROUPS = [
  { id: "475906f0-12e3-4147-b0c7-d3b7602c2c60", label: "Div 1" },
  { id: "group-2-id", label: "Div 2" },
  { id: "group-3-id", label: "Div 3" },
]

export function CreateSessionDialog({ open, onOpenChange, onSubmit }: CreateSessionDialogProps) {
  const [formData, setFormData] = useState<SessionFormData>({
    title: "",
    description: "",
    startMonth: "",
    endTMonth: "",
    location: "",
    creatorId: "098bc22d-aca2-44fb-ac27-2347d4459e86",
    divisionId: "",
    tags: [],
    timeSlotAndGroup: {
      groupIds: [],
      timeSlots: []
    }
  })
  const [newTimeSlot, setNewTimeSlot] = useState<TimeSlot>({
    date: "",
    startTime: "",
    endTime: "",
  })
  const [showStartCalendar, setShowStartCalendar] = useState(false)
  const [showEndCalendar, setShowEndCalendar] = useState(false)
  const startCalendarRef = useRef<HTMLDivElement>(null)
  const endCalendarRef = useRef<HTMLDivElement>(null)

  // Close calendar on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (showStartCalendar && startCalendarRef.current && !startCalendarRef.current.contains(event.target as Node)) {
        setShowStartCalendar(false)
      }
      if (showEndCalendar && endCalendarRef.current && !endCalendarRef.current.contains(event.target as Node)) {
        setShowEndCalendar(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showStartCalendar, showEndCalendar])

  // Handlers for dropdowns
  const handleDivisionChange = (id: string) => {
    setFormData((prev) => ({ ...prev, divisionId: id }))
  }
  const handleGroupChange = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      timeSlotAndGroup: { ...prev.timeSlotAndGroup, groupIds: [id] }
    }))
  }

  // Calendar pickers
  const handleStartDateSelect = (date: Date | undefined) => {
    if (!date) return;
    setFormData((prev) => ({ ...prev, startMonth: date.toISOString() }))
    setShowStartCalendar(false)
  }
  const handleEndDateSelect = (date: Date | undefined) => {
    if (!date) return;
    setFormData((prev) => ({ ...prev, endTMonth: date.toISOString() }))
    setShowEndCalendar(false)
  }

  // Time slot logic
  const handleTimeSlotChange = (field: keyof TimeSlot, value: string) => {
    setNewTimeSlot((prev) => ({ ...prev, [field]: value }))
  }
  const addTimeSlot = () => {
    if (newTimeSlot.date && newTimeSlot.startTime && newTimeSlot.endTime) {
      setFormData((prev) => ({
        ...prev,
        timeSlotAndGroup: {
          ...prev.timeSlotAndGroup,
          timeSlots: [...prev.timeSlotAndGroup.timeSlots, { ...newTimeSlot }]
        }
      }))
      setNewTimeSlot({ date: "", startTime: "", endTime: "" })
    }
  }
  const removeTimeSlot = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      timeSlotAndGroup: {
        ...prev.timeSlotAndGroup,
        timeSlots: prev.timeSlotAndGroup.timeSlots.filter((_, i) => i !== index)
      }
    }))
  }

  // Submit handler (backend compatible)
  const handleSubmit = async () => {
    try {
      const formattedData = {
        ...formData,
        startMonth: formData.startMonth,
        endTMonth: formData.endTMonth,
        timeSlotAndGroup: {
          ...formData.timeSlotAndGroup,
          timeSlots: formData.timeSlotAndGroup.timeSlots.map(slot => ({
            ...slot,
            date: slot.date,
            startTime: slot.startTime,
            endTime: slot.endTime
          }))
        }
      }
      const response = await fetch('https://csec-lab-portal-backend.onrender.com/api/session/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedData)
      })
      if (!response.ok) throw new Error('Failed to create session')
      toast.success('Session created successfully')
      onSubmit?.(formData)
      onOpenChange(false)
    } catch (error) {
      toast.error('Failed to create session')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden max-w-xl rounded-xl">
        <div className="p-8">
          <h2 className="text-lg font-semibold mb-6">Add New Session</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Input
              placeholder="Session Title"
              value={formData.title}
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
            />
            <Select value={formData.divisionId} onValueChange={handleDivisionChange}>
              <SelectTrigger>
                <SelectValue placeholder="Session Division" />
              </SelectTrigger>
              <SelectContent>
                {DIVISIONS.map(d => <SelectItem key={d.id} value={d.id}>{d.label}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={formData.timeSlotAndGroup.groupIds[0] || ""} onValueChange={handleGroupChange}>
              <SelectTrigger>
                <SelectValue placeholder="Session Group" />
              </SelectTrigger>
              <SelectContent>
                {GROUPS.map(g => <SelectItem key={g.id} value={g.id}>{g.label}</SelectItem>)}
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Popover open={showStartCalendar} onOpenChange={setShowStartCalendar}>
                <PopoverTrigger asChild>
                  <Input
                    placeholder="Start Month"
                    value={formData.startMonth ? format(new Date(formData.startMonth), 'MMMM') : ''}
                    readOnly
                    className="cursor-pointer"
                  />
                </PopoverTrigger>
                <PopoverContent align="start" className="w-[400px] p-3 bg-white rounded-xl border border-gray-100 shadow-lg">
                  <Calendar
                    mode="single"
                    selected={formData.startMonth ? new Date(formData.startMonth) : undefined}
                    onSelect={handleStartDateSelect}
                    initialFocus
                    fromMonth={new Date(new Date().getFullYear(), 0, 1)}
                    toMonth={new Date(new Date().getFullYear(), 11, 31)}
                    showOutsideDays={false}
                    className="border-none shadow-none p-0"
                    classNames={{
                      months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                      month: "space-y-4 w-full",
                      caption: "flex justify-center relative items-center h-10",
                      caption_label: "text-xl font-semibold",
                      nav: "space-x-1 flex items-center",
                      nav_button: cn(
                        "h-9 w-9 bg-white hover:bg-gray-100 p-0 opacity-100 hover:opacity-100 rounded-full flex items-center justify-center"
                      ),
                      nav_button_previous: "absolute left-1",
                      nav_button_next: "absolute right-1",
                      table: "w-full border-collapse space-y-1",
                      head_row: "flex w-full",
                      head_cell: "text-gray-500 rounded-md w-14 font-normal text-base",
                      row: "flex w-full mt-2",
                      cell: cn(
                        "relative p-0 text-center text-base focus-within:relative focus-within:z-20 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-100/50",
                        "[&:has([aria-selected])]:bg-gray-100"
                      ),
                      day: cn(
                        "h-14 w-14 p-0 font-normal aria-selected:opacity-100 hover:bg-gray-100 rounded-full"
                      ),
                      day_range_end: "day-range-end",
                      day_selected: "bg-[#00346b] text-white hover:bg-[#00346b] hover:text-white focus:bg-[#00346b] focus:text-white",
                      day_today: "border border-[#00346b] text-[#00346b]",
                      day_outside: "day-outside text-gray-300 opacity-50 aria-selected:bg-gray-100/50 aria-selected:text-gray-300 aria-selected:opacity-30",
                      day_disabled: "text-gray-300 opacity-50",
                      day_hidden: "invisible",
                    }}
                  />
                </PopoverContent>
              </Popover>
              <Popover open={showEndCalendar} onOpenChange={setShowEndCalendar}>
                <PopoverTrigger asChild>
                  <Input
                    placeholder="End Month"
                    value={formData.endTMonth ? format(new Date(formData.endTMonth), 'MMMM') : ''}
                    readOnly
                    className="cursor-pointer"
                  />
                </PopoverTrigger>
                <PopoverContent align="start" className="w-[400px] p-3 bg-white rounded-xl border border-gray-100 shadow-lg">
                  <Calendar
                    mode="single"
                    selected={formData.endTMonth ? new Date(formData.endTMonth) : undefined}
                    onSelect={handleEndDateSelect}
                    initialFocus
                    fromMonth={new Date(new Date().getFullYear(), 0, 1)}
                    toMonth={new Date(new Date().getFullYear(), 11, 31)}
                    showOutsideDays={false}
                    className="border-none shadow-none p-0"
                    classNames={{
                      months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                      month: "space-y-4 w-full",
                      caption: "flex justify-center relative items-center h-10",
                      caption_label: "text-xl font-semibold",
                      nav: "space-x-1 flex items-center",
                      nav_button: cn(
                        "h-9 w-9 bg-white hover:bg-gray-100 p-0 opacity-100 hover:opacity-100 rounded-full flex items-center justify-center"
                      ),
                      nav_button_previous: "absolute left-1",
                      nav_button_next: "absolute right-1",
                      table: "w-full border-collapse space-y-1",
                      head_row: "flex w-full",
                      head_cell: "text-gray-500 rounded-md w-14 font-normal text-base",
                      row: "flex w-full mt-2",
                      cell: cn(
                        "relative p-0 text-center text-base focus-within:relative focus-within:z-20 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-100/50",
                        "[&:has([aria-selected])]:bg-gray-100"
                      ),
                      day: cn(
                        "h-14 w-14 p-0 font-normal aria-selected:opacity-100 hover:bg-gray-100 rounded-full"
                      ),
                      day_range_end: "day-range-end",
                      day_selected: "bg-[#00346b] text-white hover:bg-[#00346b] hover:text-white focus:bg-[#00346b] focus:text-white",
                      day_today: "border border-[#00346b] text-[#00346b]",
                      day_outside: "day-outside text-gray-300 opacity-50 aria-selected:bg-gray-100/50 aria-selected:text-gray-300 aria-selected:opacity-30",
                      day_disabled: "text-gray-300 opacity-50",
                      day_hidden: "invisible",
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          {/* Time slot rows */}
          {formData.timeSlotAndGroup.timeSlots.map((slot, idx) => (
            <div key={idx} className="grid grid-cols-4 gap-4 items-center mb-2">
              <Input value={slot.date} readOnly className="bg-gray-50" />
              <Input value={slot.startTime} readOnly className="bg-gray-50" />
              <Input value={slot.endTime} readOnly className="bg-gray-50" />
              <Button variant="outline" onClick={() => removeTimeSlot(idx)} className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">Remove</Button>
            </div>
          ))}
          {/* Add time slot row */}
          <div className="grid grid-cols-4 gap-4 items-end mb-4">
            <Select value={newTimeSlot.date} onValueChange={val => handleTimeSlotChange('date', val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Day" />
              </SelectTrigger>
              <SelectContent>
                {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map(day => (
                  <SelectItem key={day} value={day}>{day}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="time"
              value={newTimeSlot.startTime}
              onChange={e => handleTimeSlotChange('startTime', e.target.value)}
              placeholder="Start Time"
            />
            <Input
              type="time"
              value={newTimeSlot.endTime}
              onChange={e => handleTimeSlotChange('endTime', e.target.value)}
              placeholder="End Time"
            />
            <Button onClick={addTimeSlot} className="bg-[#00346b] text-white">Add</Button>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button className="bg-[#00346b] text-white" onClick={handleSubmit}>Create</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
