"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddNewSessionWithCalendarProps {
  onClose?: () => void
  onSubmit?: (sessionData: any) => void
}

export function AddNewSessionWithCalendar({ onClose, onSubmit }: AddNewSessionWithCalendarProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Add New Session</h2>

          <div className="space-y-4">
            <div>
              <Input placeholder="Session Title" className="w-full" />
            </div>
            <div>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Session Division" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dev">Dev Division</SelectItem>
                  <SelectItem value="cpd">CPD Division</SelectItem>
                  <SelectItem value="cyber">Cyber Division</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Session Group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="group-1">Group 1</SelectItem>
                    <SelectItem value="group-2">Group 2</SelectItem>
                    <SelectItem value="group-3">Group 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Input placeholder="Start Month" className="w-full" />
              </div>
              <div className="flex-1">
                <Input placeholder="End Month" className="w-full" />
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
            </div>
          </div>

          {/* Calendar */}
          <div className="mt-4 border rounded-md p-4">
            <div className="flex items-center justify-between mb-4">
              <button className="p-1 rounded-full hover:bg-gray-100">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <h3 className="font-medium">January</h3>
              <button className="p-1 rounded-full hover:bg-gray-100">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-2">
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
              <div>Sun</div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              <div className="text-gray-400 p-2">31</div>
              <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">1</div>
              <div className="p-2 bg-blue-100 text-blue-800 rounded-md cursor-pointer">2</div>
              <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">3</div>
              <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">4</div>
              <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">5</div>
              <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">6</div>
              <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">7</div>
              <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">8</div>
              <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">9</div>
              <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">10</div>
              <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">11</div>
              <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">12</div>
              <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">13</div>
              <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">14</div>
              <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">15</div>
              <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">16</div>
              <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">17</div>
              <div className="p-2 bg-blue-600 text-white rounded-md cursor-pointer">18</div>
              <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">19</div>
              <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">20</div>
              <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">21</div>
              <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">22</div>
              <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">23</div>
              <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">24</div>
              <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">25</div>
              <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">26</div>
              <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">27</div>
              <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">28</div>
              <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">29</div>
              <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">30</div>
              <div className="text-gray-400 p-2">1</div>
              <div className="text-gray-400 p-2">2</div>
              <div className="text-gray-400 p-2">3</div>
              <div className="text-gray-400 p-2">4</div>
            </div>
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
