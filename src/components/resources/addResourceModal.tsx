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
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <label htmlFor="resourceName" className="text-sm font-medium text-gray-700">
            Resource Name
          </label>
          <Input
            id="resourceName"
            placeholder="Enter resource name"
            value={resourceName}
            onChange={(e) => onResourceNameChange(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="resourceUrl" className="text-sm font-medium text-gray-700">
            Resource URL
          </label>
          <Input
            id="resourceUrl"
            placeholder="Enter resource URL"
            value={resourceUrl}
            onChange={(e) => onResourceUrlChange(e.target.value)}
            className="w-full"
          />
        </div>
      </div>
      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-6">
        <Button
          variant="outline"
          onClick={onClose}
          className="w-full sm:w-auto"
        >
          Cancel
        </Button>
        <Button
          variant="default"
          onClick={onSave}
          className="bg-blue-800 hover:bg-blue-700 text-white w-full sm:w-auto"
        >
          Add Resource
        </Button>
      </div>
    </Modal>
  )
}
