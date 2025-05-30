"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface AddResourceModalProps {
  isOpen: boolean
  onClose: () => void
  resourceName: string
  resourceUrl: string
  onResourceNameChange: (value: string) => void
  onResourceUrlChange: (value: string) => void
  onSave: () => void
}

export default function AddResourceModal({
  isOpen,
  onClose,
  resourceName,
  resourceUrl,
  onResourceNameChange,
  onResourceUrlChange,
  onSave,
}: AddResourceModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Resource</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Input
              id="resource-name"
              placeholder="Resource Name"
              value={resourceName}
              onChange={(e) => onResourceNameChange(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Input
              id="resource-url"
              placeholder="Resource Link"
              value={resourceUrl}
              onChange={(e) => onResourceUrlChange(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="default" onClick={onSave} className="bg-[#0040a0] hover:bg-[#003080] text-white">
            Add Resource
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

