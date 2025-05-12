"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddNewSessionWithTimeSlotsProps {
  onClose?: () => void
  onSubmit?: (sessionData: { title: string; division: string; timeSlots: { day: string; startTime: string; endTime: string }[] }) => void
}

export function AddNewSessionWithTimeSlots({ onClose, onSubmit }: AddNewSessionWithTimeSlotsProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Add New Session</h2>

          <div className="space-y-4">
            <div>
              <Input value="Contest" className="w-full" />
            </div>
            <div>
              <Input value="CPD" className="w-full" readOnly />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <Select defaultValue="div-1">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Div 1" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="div-1">Div 1</SelectItem>
                    <SelectItem value="div-2">Div 2</SelectItem>
                    <SelectItem value="div-3">Div 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Input value="January" className="w-full" readOnly />
              </div>
              <div className="flex-1">
                <Input value="March" className="w-full" readOnly />
              </div>
            </div>

            {/* Time slot */}
            <div className="border rounded-md p-3">
              <div className="flex gap-4 mb-3">
                <div className="flex-1">
                  <Input value="Monday" className="w-full" readOnly />
                </div>
                <div className="flex-1">
                  <Input value="5:00 AM" className="w-full" readOnly />
                </div>
                <div className="flex-1">
                  <Input value="7:00 AM" className="w-full" readOnly />
                </div>
                <div className="flex-none">
                  <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">
                    Remove
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monday">Monday</SelectItem>
                      <SelectItem value="tuesday">Tuesday</SelectItem>
                      <SelectItem value="wednesday">Wednesday</SelectItem>
                      <SelectItem value="thursday">Thursday</SelectItem>
                      <SelectItem value="friday">Friday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Input placeholder="Start Time" className="w-full" />
                </div>
                <div className="flex-1">
                  <Input placeholder="End Time" className="w-full" />
                </div>
                <div className="flex-none">
                  <Button className="bg-blue-600 hover:bg-blue-700">Add</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between p-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => onSubmit && onSubmit({ title: "Contest", division: "CPD", timeSlots: [{ day: "Monday", startTime: "5:00 AM", endTime: "7:00 AM" }] })}>
            Create
          </Button>
        </div>
      </div>
    </div>
  )
}
