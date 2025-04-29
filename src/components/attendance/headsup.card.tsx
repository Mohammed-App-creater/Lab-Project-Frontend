"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

export function HeadsUp({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="p-6 pb-4">
          <h2 className="text-lg font-semibold">Heads Up</h2>
        </div>

        <div className="px-6 pb-6 space-y-4">
            <div>
                <Select>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="john-doe">John Doe</SelectItem>
                    <SelectItem value="jane-smith">Jane Smith</SelectItem>
                    <SelectItem value="bob-johnson">Bob Johnson</SelectItem>
                </SelectContent>
                </Select>
            </div>
          <div>
        <textarea id="message" name="message" rows={3} cols={40} placeholder="Enter a reason">
        </textarea>
          </div>
        </div>

        <div className="flex justify-between p-4 border-t">
          <Button variant="outline" className="rounded-md px-4" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-blue-900 hover:bg-blue-700 rounded-md px-4">
            Add Division
          </Button>
        </div>
      </div>
    </div>
  )
}
