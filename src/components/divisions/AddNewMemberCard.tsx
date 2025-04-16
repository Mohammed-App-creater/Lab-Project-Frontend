"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AddNewMemberCard({ onCancel }: { onCancel: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-[400px] max-w-[90vw]">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold">Add New Member</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Division" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="data-science">Data Science Division</SelectItem>
                <SelectItem value="development">Development Division</SelectItem>
                <SelectItem value="cpd">CPD Division</SelectItem>
                <SelectItem value="cyber">Cyber Division</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="group-1">Group 1</SelectItem>
                <SelectItem value="group-2">Group 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Input placeholder="Full Name" />
          <Input placeholder="Member ID" />

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onCancel}>Cancel</Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Add</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
