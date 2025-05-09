"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface AddRoleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function AddRoleDialog({ open, onOpenChange }: AddRoleDialogProps) {
  const [permissionsOpen, setPermissionsOpen] = useState(false)

  const permissions = [
    "All",
    "Upload Resources",
    "Create A Division",
    "Schedule Sessions",
    "Mark Attendance",
    "Add Members",
    "Manage Members",
    "View All Division",
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Role</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Input placeholder="Role Name" />
          </div>
          <div className="grid gap-2">
            <div
              className="flex justify-between items-center border rounded-md p-3 cursor-pointer"
              onClick={() => setPermissionsOpen(!permissionsOpen)}
            >
              <span className="text-gray-500">Add Permission</span>
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`transform transition-transform ${permissionsOpen ? "rotate-180" : ""}`}
              >
                <path
                  d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            {permissionsOpen && (
              <div className="border rounded-md p-3 mt-1">
                <div className="space-y-2">
                  {permissions.map((permission) => (
                    <div key={permission} className="flex items-center space-x-2">
                      <Checkbox id={`permission-${permission}`} />
                      <Label htmlFor={`permission-${permission}`}>{permission}</Label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="grid gap-2">
            <p className="text-sm font-medium">Select Status</p>
            <RadioGroup defaultValue="active" className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="active" id="active" />
                <Label htmlFor="active">Active</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="inactive" id="inactive" />
                <Label htmlFor="inactive">Inactive</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="bg-blue-700 hover:bg-blue-800">Add Role</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
