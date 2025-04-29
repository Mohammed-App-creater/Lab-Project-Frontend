"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Modal } from "@/components/ui/modal"   
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
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Resource">
      <div className="grid gap-4 py-4">
        <Input
          placeholder="Resource Name"
          value={resourceName}
          onChange={(e) => onResourceNameChange(e.target.value)}
          className="mb-2"
        />
        <Input placeholder="Resource Link" value={resourceUrl} onChange={(e) => onResourceUrlChange(e.target.value)} />
      </div>
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="default" onClick={onSave} className="bg-blue-800 hover:bg-blue-700 text-white">
          Add Resource
        </Button>
      </div>
    </Modal>
  )
}
