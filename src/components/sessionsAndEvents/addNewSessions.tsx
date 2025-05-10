"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddNewSessionModalProps {
  onClose?: () => void
  onSubmit?: (sessionData: any) => void
}

export function AddNewSessionModal({ onClose, onSubmit }: AddNewSessionModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Add New Session</h2>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Session Title</label>
              <Input placeholder="Enter session title" className="w-full" />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Session Division</label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select division" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dev">Dev Division</SelectItem>
                  <SelectItem value="cpd">CPD Division</SelectItem>
                  <SelectItem value="cyber">Cyber Division</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Session Group</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="group-1">Group 1</SelectItem>
                    <SelectItem value="group-2">Group 2</SelectItem>
                    <SelectItem value="group-3">Group 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Start Month</label>
                <Input placeholder="Start month" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">End Month</label>
                <Input placeholder="End month" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Select Day</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Day" />
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
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Start Time</label>
                <Input placeholder="Start time" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">End Time</label>
                <Input placeholder="End time" />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button variant="outline" className="mr-2 bg-blue-600 hover:bg-blue-700 text-white">
              Add
            </Button>
          </div>
        </div>

        <div className="flex justify-between p-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => onSubmit && onSubmit({})}>
            Create
          </Button>
        </div>
      </div>
    </div>
  )
} 