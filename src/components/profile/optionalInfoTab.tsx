"use client"

import { useState } from "react"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface OptionalInfoTabProps {
  userData: any
  onCancel: () => void
  onSave: () => void
}

export default function OptionalInfoTab({ userData, onCancel, onSave }: OptionalInfoTabProps) {
  const [formData, setFormData] = useState(userData)

  const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }))
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-gray-500 mb-1">University ID</label>
          <Input value={formData.universityId} onChange={(e) => handleChange("universityId", e.target.value)} />
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">Instagram Handle</label>
          <Input
            value={formData.instagramHandle || ""}
            onChange={(e) => handleChange("instagramHandle", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">LinkedIn URL</label>
          <Input value={formData.linkedinUrl} onChange={(e) => handleChange("linkedinUrl", e.target.value)} />
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">Date of Birth</label>
          <div className="relative">
            <Input value={formData.dateOfBirth} onChange={(e) => handleChange("dateOfBirth", e.target.value)} />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Calendar className="h-4 w-4" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">Codeforces Handle</label>
          <Input value={formData.codeforces} onChange={(e) => handleChange("codeforces", e.target.value)} />
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">CV</label>
          <Input value={formData.cv} onChange={(e) => handleChange("cv", e.target.value)} />
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">Leetcode Handle</label>
          <Input value={formData.leetcode} onChange={(e) => handleChange("leetcode", e.target.value)} />
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">Joining Date</label>
          <div className="relative">
            <Input value={formData.joiningDate} onChange={(e) => handleChange("joiningDate", e.target.value)} />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Calendar className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm text-gray-500 mb-1">Short Bio</label>
        <Textarea value={formData.shortBio} onChange={(e) => handleChange("shortBio", e.target.value)} rows={4} />
      </div>

      <div className="flex justify-end mt-8 gap-3">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button className="bg-blue-800 hover:bg-blue-700 text-white" onClick={onSave}>
          Update
        </Button>
      </div>
    </div>
  )
}
