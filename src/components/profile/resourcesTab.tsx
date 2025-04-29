
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ExternalLink, Trash2 } from "lucide-react"

interface ResourcesTabProps {
  onCancel: () => void
  onSave: () => void
}

export default function ResourcesTab({ onCancel, onSave }: ResourcesTabProps) {
  // Initialize with sample data
  const [resources, setResources] = useState<{ name: string; link: string }[]>([
    { name: "Data science & AI challenges.", link: "https://googlecodejam.com/challenges" },
    { name: "Math-based programming problems.", link: "https://googlecodejam.com/challenges" },
    { name: "Cybersecurity & hacking challenges.", link: "https://googlecodejam.com/challenges" },
    { name: "Smart contract security challenges.", link: "https://googlecodejam.com/challenges" },
    { name: "CP contests for beginners & intermediates.", link: "https://googlecodejam.com/challenges" },
  ])

  const [newResourceName, setNewResourceName] = useState("")
  const [newResourceLink, setNewResourceLink] = useState("")

  const handleAddResource = () => {
    if (newResourceName && newResourceLink) {
      setResources([...resources, { name: newResourceName, link: newResourceLink }])
      setNewResourceName("")
      setNewResourceLink("")
    }
  }

  const handleRemoveResource = (index: number) => {
    setResources(resources.filter((_, i) => i !== index))
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
              <div className="flex items-center gap-2">
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-red-600 p-0 h-8 w-8"
                  onClick={() => handleRemoveResource(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
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
