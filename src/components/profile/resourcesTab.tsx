"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ResourcesTabProps {
  onCancel: () => void
  onSave: () => void
}

export default function ResourcesTab({ onCancel, onSave }: ResourcesTabProps) {
  const [resources, setResources] = useState<{ name: string; link: string }[]>([])
  const [newResourceName, setNewResourceName] = useState("")
  const [newResourceLink, setNewResourceLink] = useState("")

  const handleAddResource = () => {
    if (newResourceName && newResourceLink) {
      setResources([...resources, { name: newResourceName, link: newResourceLink }])
      setNewResourceName("")
      setNewResourceLink("")
    }
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div>
          <label className="block text-sm text-gray-500 mb-1">Resource Name</label>
          <Input value={newResourceName} onChange={(e) => setNewResourceName(e.target.value)} />
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">Resource Link</label>
          <Input value={newResourceLink} onChange={(e) => setNewResourceLink(e.target.value)} />
        </div>
      </div>

      <div className="mb-6">
        <Button onClick={handleAddResource} className="bg-blue-800 hover:bg-blue-700 text-white" size="sm">
          Add
        </Button>
      </div>

      {resources.length > 0 && (
        <div className="border rounded-md mb-6">
          {resources.map((resource, index) => (
            <div key={index} className="p-3 border-b last:border-b-0 flex justify-between items-center">
              <div>
                <div className="font-medium">{resource.name}</div>
                <div className="text-sm text-gray-500">{resource.link}</div>
              </div>
              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button className="bg-blue-800 hover:bg-blue-700 text-white" onClick={onSave}>
          Save
        </Button>
      </div>
    </div>
  )
}
