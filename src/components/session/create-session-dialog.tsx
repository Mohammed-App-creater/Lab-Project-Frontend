"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster, toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { addMonths, format } from "date-fns";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreateSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: SessionFormData) => void;
  onSessionCreated?: () => void;
}

export interface TimeSlot {
  date: string;
  startTime: string;
  endTime: string;
}

export interface SessionFormData {
  title: string;
  description: string;
  startMonth: string;
  endTMonth: string;
  location: string;
  creatorId: string;
  divisionId: string;
  tags: string[];
  timeSlotAndGroup: {
    groupIds: string[];
    timeSlots: TimeSlot[];
  };
}

// Custom Calendar component for grid layout and dark mode
function CustomCalendar({
  selected,
  onSelect,
  initialMonth,
}: {
  selected: Date | null;
  onSelect: (date: Date) => void;
  initialMonth?: Date;
}) {
  const [currentMonth, setCurrentMonth] = useState(
    initialMonth ? initialMonth.getMonth() : new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState(
    initialMonth ? initialMonth.getFullYear() : new Date().getFullYear()
  );

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between p-2 border-b dark:border-gray-700">
        <button
          onClick={prevMonth}
          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="font-medium text-gray-900 dark:text-gray-100">
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <button
          onClick={nextMonth}
          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 p-2">
        {weekdays.map((day) => (
          <div
            key={day}
            className="text-center text-xs text-gray-500 dark:text-gray-400 py-1">
            {day}
          </div>
        ))}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="text-center py-1 text-sm" />
        ))}
        {days.map((day) => {
          const currentDate = new Date(currentYear, currentMonth, day);
          const isSelected =
            selected && currentDate.toDateString() === selected.toDateString();
          const isToday =
            new Date().toDateString() === currentDate.toDateString();
          return (
            <div
              key={day}
              className={cn(
                "text-center py-1 text-sm cursor-pointer rounded-md transition-colors",
                isSelected &&
                  "bg-blue-600 text-white dark:bg-blue-400 dark:text-gray-900",
                isToday &&
                  !isSelected &&
                  "bg-gray-100 dark:bg-gray-700 text-blue-700 dark:text-blue-300",
                !isSelected &&
                  !isToday &&
                  "hover:bg-blue-100 dark:hover:bg-blue-800 hover:text-blue-700 dark:hover:text-blue-200"
              )}
              onClick={() => onSelect(currentDate)}>
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function CreateSessionDialog({
  open,
  onOpenChange,
  onSubmit,
  onSessionCreated,
}: CreateSessionDialogProps) {
  const [divisions, setDivisions] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const initialFormData: SessionFormData = {
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
      timeSlots: [],
    },
  };
  const [formData, setFormData] = useState<SessionFormData>(initialFormData);
  const [groups, setGroups] = useState<Array<{ id: string; name: string }>>([]);
  const [newTimeSlot, setNewTimeSlot] = useState<TimeSlot>({
    date: "",
    startTime: "",
    endTime: "",
  });
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const startCalendarRef = useRef<HTMLDivElement>(null);
  const endCalendarRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  // Fetch groups when division changes
  const fetchGroups = async (divisionId: string) => {
    try {
      if (!divisionId) return;
      const response = await fetch(
        `https://csec-lab-portal-backend.onrender.com/api/division/groups`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ divisionId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch groups");
      }

      const data = await response.json();
      setGroups(data.groups);
    } catch (error) {
      console.error("Error fetching groups:", error);
      toast.error("Failed to fetch groups");
    }
  };

  // Fetch divisions when component mounts
  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const response = await fetch(
          "https://csec-lab-portal-backend.onrender.com/api/division/divisions-id"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch divisions");
        }
        const data = await response.json();
        setDivisions(data);
        // Set default division if available
        if (data.length > 0) {
          setFormData((prev) => ({ ...prev, divisionId: data[0].id }));
        }
      } catch (error) {
        console.error("Error fetching divisions:", error);
      }
    };

    fetchDivisions();
  }, []);

  // Fetch groups when division changes
  useEffect(() => {
    fetchGroups(formData.divisionId);
  }, [divisions, formData.divisionId]);

  // Close calendar on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        showStartCalendar &&
        startCalendarRef.current &&
        !startCalendarRef.current.contains(event.target as Node)
      ) {
        setShowStartCalendar(false);
      }
      if (
        showEndCalendar &&
        endCalendarRef.current &&
        !endCalendarRef.current.contains(event.target as Node)
      ) {
        setShowEndCalendar(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showStartCalendar, showEndCalendar]);

  // Handlers for dropdowns
  const handleDivisionChange = async (id: string) => {
    setFormData((prev) => ({
      ...prev,
      divisionId: id,
      timeSlotAndGroup: { ...prev.timeSlotAndGroup, groupIds: [] },
    }));
    await fetchGroups(id);
  };

  const handleGroupChange = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      timeSlotAndGroup: { ...prev.timeSlotAndGroup, groupIds: [id] },
    }));
  };

  // Calendar pickers
  const handleStartDateSelect = (date: Date | undefined) => {
    if (!date) return;
    setFormData((prev) => ({ ...prev, startMonth: date.toISOString() }));
    setShowStartCalendar(false);
  };
  const handleEndDateSelect = (date: Date | undefined) => {
    if (!date) return;
    setFormData((prev) => ({ ...prev, endTMonth: date.toISOString() }));
    setShowEndCalendar(false);
  };

  // Time slot logic
  const handleTimeSlotChange = (field: keyof TimeSlot, value: string) => {
    setNewTimeSlot((prev) => ({ ...prev, [field]: value }));
  };
  const addTimeSlot = () => {
    if (!newTimeSlot.date || !newTimeSlot.startTime || !newTimeSlot.endTime) {
      toast.error(
        "Please fill in date, start time, and end time for the time slot."
      );
      console.warn("Attempted to add incomplete time slot:", newTimeSlot);
      return;
    }
    console.log("Adding time slot:", newTimeSlot);
    setFormData((prev) => ({
      ...prev,
      timeSlotAndGroup: {
        ...prev.timeSlotAndGroup,
        timeSlots: [...prev.timeSlotAndGroup.timeSlots, { ...newTimeSlot }],
      },
    }));
    setNewTimeSlot({ date: "", startTime: "", endTime: "" });
  };
  const removeTimeSlot = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      timeSlotAndGroup: {
        ...prev.timeSlotAndGroup,
        timeSlots: prev.timeSlotAndGroup.timeSlots.filter(
          (_, i) => i !== index
        ),
      },
    }));
  };

  // Submit handler (backend compatible)
  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (
        !formData.title ||
        !formData.description ||
        !formData.startMonth ||
        !formData.endTMonth ||
        !formData.location ||
        !formData.divisionId
      ) {
        toast.error("Please fill in all required fields");
        setLoading(false);
        return;
      }

      if (formData.timeSlotAndGroup.timeSlots.length === 0) {
        toast.error("Please add at least one time slot");
        setLoading(false);
        return;
      }

      if (formData.timeSlotAndGroup.groupIds.length === 0) {
        toast.error("Please select a group");
        setLoading(false);
        return;
      }

      // --- Silly error scan ---
      if (
        formData.timeSlotAndGroup.groupIds.some((id) => !id || id.length < 10)
      ) {
        console.warn(
          "Warning: Some groupIds are empty or too short:",
          formData.timeSlotAndGroup.groupIds
        );
      }
      if (formData.tags.length === 0) {
        console.warn("Warning: tags array is empty");
      }
      if (
        formData.timeSlotAndGroup.timeSlots.some(
          (slot) => !slot.date || !slot.startTime || !slot.endTime
        )
      ) {
        console.warn(
          "Warning: Some timeSlots are missing fields:",
          formData.timeSlotAndGroup.timeSlots
        );
      }
      // --- End silly error scan ---

      // Transform timeSlots to API format
      const transformedTimeSlots = formData.timeSlotAndGroup.timeSlots.map(
        (slot) => {
          // slot.date: yyyy-MM-dd, slot.startTime: HH:mm, slot.endTime: HH:mm
          // Compose ISO strings
          const dateISO = new Date(slot.date + "T00:00:00.000Z").toISOString();
          const startTimeISO = new Date(
            slot.date + "T" + slot.startTime + ":00.000Z"
          ).toISOString();
          const endTimeISO = new Date(
            slot.date + "T" + slot.endTime + ":00.000Z"
          ).toISOString();
          return {
            date: dateISO,
            startTime: startTimeISO,
            endTime: endTimeISO,
          };
        }
      );

      const formattedBody = {
        ...formData,
        timeSlotAndGroup: {
          ...formData.timeSlotAndGroup,
          timeSlots: transformedTimeSlots,
        },
      };

      // Log the formatted body before sending
      console.log(
        "Formatted session body to send:",
        JSON.stringify(formattedBody, null, 2)
      );

      const response = await fetch(
        "https://csec-lab-portal-backend.onrender.com/api/session/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formattedBody),
        }
      );

      if (!response.ok) {
        let errorMsg = "Failed to create session";
        try {
          const errorData = await response.json();
          errorMsg = errorData.message || JSON.stringify(errorData);
          console.error("Error response:", errorData);
        } catch (e) {
          errorMsg = await response.text();
          console.error("Error response (text):", errorMsg);
        }
        toast.error(errorMsg);
        setLoading(false);
        return;
      }

      const responseData = await response.json();
      console.log("Success response:", responseData);

      toast.success("Session created successfully");
      onSubmit?.(formData);
      onSessionCreated?.();
      onOpenChange(false);
      setFormData(initialFormData); // Reset form after submit
      setLoading(false);
    } catch (error) {
      console.error("Error creating session:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to create session"
      );
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
    setFormData(initialFormData); // Reset form after submit
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden w-full max-w-full sm:max-w-xl rounded-xl">
        <div className="p-4 sm:p-8 w-full max-w-full">
          <h2 className="text-lg font-semibold mb-4 sm:mb-6">
            Add New Session
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 w-full">
            <Input
              placeholder="Session Title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
            <Input
              placeholder="Location"
              value={formData.location}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, location: e.target.value }))
              }
            />
            <Input
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
            <Input
              placeholder="Tags (comma separated)"
              value={formData.tags.join(", ")}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  tags: e.target.value.split(",").map((tag) => tag.trim()),
                }))
              }
            />
            <Select
              value={formData.divisionId}
              onValueChange={handleDivisionChange}>
              <SelectTrigger>
                <SelectValue placeholder="Session Division" />
              </SelectTrigger>
              <SelectContent>
                {divisions.map((d) => (
                  <SelectItem key={d.id} value={d.id}>
                    {d.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* Dropdown for groups with tag display */}
            <div className="col-span-2">
              <label className="block mb-1 font-medium">Session Groups</label>
              <Select
                value=""
                onValueChange={(id) => {
                  if (!formData.timeSlotAndGroup.groupIds.includes(id)) {
                    setFormData((prev) => ({
                      ...prev,
                      timeSlotAndGroup: {
                        ...prev.timeSlotAndGroup,
                        groupIds: [...prev.timeSlotAndGroup.groupIds, id],
                      },
                    }));
                  }
                }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Group(s)" />
                </SelectTrigger>
                <SelectContent>
                  {groups
                    .filter(
                      (g) => !formData.timeSlotAndGroup.groupIds.includes(g.id)
                    )
                    .map((g) => (
                      <SelectItem key={g.id} value={g.id}>
                        {g.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              {/* Tags for selected groups */}
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.timeSlotAndGroup.groupIds.map((id) => {
                  const group = groups.find((g) => g.id === id);
                  if (!group) return null;
                  return (
                    <span
                      key={id}
                      className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                      {group.name}
                      <button
                        type="button"
                        className="ml-1 text-blue-600 hover:text-red-500 focus:outline-none"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            timeSlotAndGroup: {
                              ...prev.timeSlotAndGroup,
                              groupIds: prev.timeSlotAndGroup.groupIds.filter(
                                (gid) => gid !== id
                              ),
                            },
                          }));
                        }}>
                        ×
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="flex gap-2">
              {/* Start Month Label and Picker */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="start-month-input"
                  className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Start Month
                </label>
                <Popover
                  open={showStartCalendar}
                  onOpenChange={setShowStartCalendar}>
                  <PopoverTrigger asChild>
                    <Input
                      id="start-month-input"
                      value={
                        formData.startMonth
                          ? format(new Date(formData.startMonth), "MMMM")
                          : ""
                      }
                      placeholder={formData.startMonth ? "" : "Start Month"}
                      readOnly
                      className="cursor-pointer w-22 bg-white border-gray-200 hover:border-[#00346b] transition-colors duration-200"
                    />
                  </PopoverTrigger>
                  <PopoverContent
                    align="start"
                    className="w-[320px] p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl">
                    <CustomCalendar
                      selected={
                        formData.startMonth
                          ? new Date(formData.startMonth)
                          : null
                      }
                      onSelect={(date) => {
                        setFormData((prev) => ({
                          ...prev,
                          startMonth: date.toISOString(),
                        }));
                        setShowStartCalendar(false);
                      }}
                      initialMonth={
                        formData.startMonth
                          ? new Date(formData.startMonth)
                          : undefined
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>
              {/* End Month Label and Picker */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="end-month-input"
                  className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  End Month
                </label>
                <Popover
                  open={showEndCalendar}
                  onOpenChange={setShowEndCalendar}>
                  <PopoverTrigger asChild>
                    <Input
                      id="end-month-input"
                      value={
                        formData.endTMonth
                          ? format(new Date(formData.endTMonth), "MMMM")
                          : ""
                      }
                      placeholder={formData.endTMonth ? "" : "End Month"}
                      readOnly
                      className="cursor-pointer w-22 bg-white border-gray-200 hover:border-[#00346b] transition-colors duration-200"
                    />
                  </PopoverTrigger>
                  <PopoverContent
                    align="start"
                    className="w-[320px] p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl">
                    <CustomCalendar
                      selected={
                        formData.endTMonth ? new Date(formData.endTMonth) : null
                      }
                      onSelect={(date) => {
                        setFormData((prev) => ({
                          ...prev,
                          endTMonth: date.toISOString(),
                        }));
                        setShowEndCalendar(false);
                      }}
                      initialMonth={
                        formData.endTMonth
                          ? new Date(formData.endTMonth)
                          : undefined
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          {/* Time slot rows */}
          {formData.timeSlotAndGroup.timeSlots.map((slot, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 items-center mb-2 w-full">
              <Input value={slot.date} readOnly className="bg-gray-50" />
              <Input value={slot.startTime} readOnly className="bg-gray-50" />
              <Input value={slot.endTime} readOnly className="bg-gray-50" />
              <Button
                variant="outline"
                onClick={() => removeTimeSlot(idx)}
                className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">
                Remove
              </Button>
            </div>
          ))}
          {/* Add time slot row */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 items-end mb-4 w-full">
            <Input
              type="date"
              value={newTimeSlot.date}
              onChange={(e) => handleTimeSlotChange("date", e.target.value)}
              placeholder="Select Date"
            />
            <Input
              type="time"
              value={newTimeSlot.startTime}
              onChange={(e) =>
                handleTimeSlotChange("startTime", e.target.value)
              }
              placeholder="Start Time"
            />
            <Input
              type="time"
              value={newTimeSlot.endTime}
              onChange={(e) => handleTimeSlotChange("endTime", e.target.value)}
              placeholder="End Time"
            />
            <Button onClick={addTimeSlot} className="bg-[#00346b] text-white">
              Add
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4 sm:mt-6 w-full">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button
              className="bg-[#00346b] text-white w-full sm:w-auto"
              onClick={handleSubmit}
              disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
