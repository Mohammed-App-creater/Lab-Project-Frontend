"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddHeadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function AddHeadDialog({ open, onOpenChange }: AddHeadDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Head</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vice-president">Vice President</SelectItem>
                <SelectItem value="head">Head</SelectItem>
                <SelectItem value="president">President</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Division" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cpd">CPD</SelectItem>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="cyber">Cyber</SelectItem>
                <SelectItem value="data-science">Data Science</SelectItem>
                <SelectItem value="all">All</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Person" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="person1">Darlene Robertson</SelectItem>
                <SelectItem value="person2">Floyd Miles</SelectItem>
                <SelectItem value="person3">Dianne Russell</SelectItem>
                <SelectItem value="person4">Cody Fisher</SelectItem>
                <SelectItem value="person5">Jacob Jones</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="bg-blue-700 hover:bg-blue-800">Assign</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
