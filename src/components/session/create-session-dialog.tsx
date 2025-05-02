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
  onSessionCreated?: () => void
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

export function CreateSessionDialog({ open, onOpenChange, onSubmit, onSessionCreated }: CreateSessionDialogProps) {
  const [formData, setFormData] = useState<SessionFormData>({
    title: "",
    description: "",
    startMonth: "",
    endTMonth: "",
    location: "",
    creatorId: "098bc22d-aca2-44fb-ac27-2347d4459e86",
    divisionId: "bc539ae7-1452-4bc4-9e1b-f2b030c4215c",
    tags: [],
    timeSlotAndGroup: {
      groupIds: [],
      timeSlots: []
    }
  })
  const [groups, setGroups] = useState<Array<{ id: string; name: string }>>([])
  const [newTimeSlot, setNewTimeSlot] = useState<TimeSlot>({
    date: "",
    startTime: "",
    endTime: "",
  })
  const [showStartCalendar, setShowStartCalendar] = useState(false)
  const [showEndCalendar, setShowEndCalendar] = useState(false)
  const startCalendarRef = useRef<HTMLDivElement>(null)
  const endCalendarRef = useRef<HTMLDivElement>(null)

  // Fetch groups when division changes
  const fetchGroups = async (divisionId: string) => {
    try {
      const response = await fetch(`https://csec-lab-portal-backend.onrender.com/api/division/groups`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ divisionId })
      })

      if (!response.ok) {
        throw new Error('Failed to fetch groups')
      }

      const data = await response.json()
      setGroups(data.groups)
    } catch (error) {
      console.error('Error fetching groups:', error)
      toast.error('Failed to fetch groups')
    }
  }

  // Initial fetch of groups
  useEffect(() => {
    fetchGroups(formData.divisionId)
  }, [])

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
  const handleDivisionChange = async (id: string) => {
    setFormData((prev) => ({ ...prev, divisionId: id, timeSlotAndGroup: { ...prev.timeSlotAndGroup, groupIds: [] } }))
    await fetchGroups(id)
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
    if (!newTimeSlot.date || !newTimeSlot.startTime || !newTimeSlot.endTime) {
      toast.error('Please fill in date, start time, and end time for the time slot.')
      console.warn('Attempted to add incomplete time slot:', newTimeSlot)
      return
    }
    console.log('Adding time slot:', newTimeSlot)
    setFormData((prev) => ({
      ...prev,
      timeSlotAndGroup: {
        ...prev.timeSlotAndGroup,
        timeSlots: [...prev.timeSlotAndGroup.timeSlots, { ...newTimeSlot }]
      }
    }))
    setNewTimeSlot({ date: "", startTime: "", endTime: "" })
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
      if (!formData.title || !formData.description || !formData.startMonth || !formData.endTMonth || !formData.location || !formData.divisionId) {
        toast.error("Please fill in all required fields")
        return
      }

      if (formData.timeSlotAndGroup.timeSlots.length === 0) {
        toast.error("Please add at least one time slot")
        return
      }

      if (formData.timeSlotAndGroup.groupIds.length === 0) {
        toast.error("Please select a group")
        return
      }

      // --- Silly error scan ---
      if (formData.timeSlotAndGroup.groupIds.some(id => !id || id.length < 10)) {
        console.warn('Warning: Some groupIds are empty or too short:', formData.timeSlotAndGroup.groupIds)
      }
      if (formData.tags.length === 0) {
        console.warn('Warning: tags array is empty')
      }
      if (formData.timeSlotAndGroup.timeSlots.some(slot => !slot.date || !slot.startTime || !slot.endTime)) {
        console.warn('Warning: Some timeSlots are missing fields:', formData.timeSlotAndGroup.timeSlots)
      }
      // --- End silly error scan ---

      // Transform timeSlots to API format
      const transformedTimeSlots = formData.timeSlotAndGroup.timeSlots.map(slot => {
        // slot.date: yyyy-MM-dd, slot.startTime: HH:mm, slot.endTime: HH:mm
        // Compose ISO strings
        const dateISO = new Date(slot.date + 'T00:00:00.000Z').toISOString();
        const startTimeISO = new Date(slot.date + 'T' + slot.startTime + ':00.000Z').toISOString();
        const endTimeISO = new Date(slot.date + 'T' + slot.endTime + ':00.000Z').toISOString();
        return {
          date: dateISO,
          startTime: startTimeISO,
          endTime: endTimeISO
        };
      });

      const formattedBody = {
        ...formData,
        timeSlotAndGroup: {
          ...formData.timeSlotAndGroup,
          timeSlots: transformedTimeSlots
        }
      };

      // Log the formatted body before sending
      console.log('Formatted session body to send:', JSON.stringify(formattedBody, null, 2))

      const response = await fetch('https://csec-lab-portal-backend.onrender.com/api/session/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedBody)
      })

      if (!response.ok) {
        let errorMsg = 'Failed to create session';
        try {
          const errorData = await response.json();
          errorMsg = errorData.message || JSON.stringify(errorData);
          console.error("Error response:", errorData);
        } catch (e) {
          errorMsg = await response.text();
          console.error("Error response (text):", errorMsg);
        }
        toast.error(errorMsg)
        return;
      }

      const responseData = await response.json()
      console.log("Success response:", responseData)

      toast.success('Session created successfully')
      onSubmit?.(formData)
      onSessionCreated?.()
      onOpenChange(false)
    } catch (error) {
      console.error("Error creating session:", error)
      toast.error(error instanceof Error ? error.message : 'Failed to create session')
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
            <Input
              placeholder="Location"
              value={formData.location}
              onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
            />
            <Input
              placeholder="Description"
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
            <Input
              placeholder="Tags (comma separated)"
              value={formData.tags.join(', ')}
              onChange={e => setFormData(prev => ({ ...prev, tags: e.target.value.split(',').map(tag => tag.trim()) }))}
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
                {groups.map(g => <SelectItem key={g.id} value={g.id}>{g.name}</SelectItem>)}
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
            <Input
              type="date"
              value={newTimeSlot.date}
              onChange={e => handleTimeSlotChange('date', e.target.value)}
              placeholder="Select Date"
            />
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
