"use client"

import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"

interface RequiredInfoTabProps {
  formData: any
  onChange: (field: string, value: string) => void
  onCancel: () => void
  onSave: () => void
}

export default function RequiredInfoTab({ formData, onChange, onCancel, onSave }: RequiredInfoTabProps) {
  return (
    <div>
      <div className="mb-6 flex justify-center">
        <div className="relative">
          <img
            src={formData.profileImage || "/image1.svg"}
            alt="Profile"
            className="h-20 w-20 rounded-md object-cover"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-gray-500 mb-1">First Name</label>
          <Input value={formData.firstName} onChange={(e) => onChange("firstName", e.target.value)} />
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">Last Name</label>
          <Input value={formData.lastName} onChange={(e) => onChange("lastName", e.target.value)} />
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">Mobile Number</label>
          <Input value={formData.mobileNumber} onChange={(e) => onChange("mobileNumber", e.target.value)} />
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">Email</label>
          <Input value={formData.email} onChange={(e) => onChange("email", e.target.value)} />
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">Date of Birth</label>
          <div className="relative">
            <Input value={formData.dateOfBirth} onChange={(e) => onChange("dateOfBirth", e.target.value)} />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Calendar className="h-4 w-4" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">Github</label>
          <Input value={formData.github} onChange={(e) => onChange("github", e.target.value)} />
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">Gender</label>
          <div className="relative">
            <Select
              value={formData.gender}
              onChange={(e) => onChange("gender", e.target.value)}
              options={[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
                { value: "Other", label: "Other" },
              ]}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">Telegram Handle</label>
          <Input value={formData.telegramHandle} onChange={(e) => onChange("telegramHandle", e.target.value)} />
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">Expected Graduation Year</label>
          <Input
            value={formData.expectedGraduationYear}
            onChange={(e) => onChange("expectedGraduationYear", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">Specialization</label>
          <Input value={formData.specialization} onChange={(e) => onChange("specialization", e.target.value)} />
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">Department</label>
          <Input value={formData.department} onChange={(e) => onChange("department", e.target.value)} />
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">Mentor</label>
          <Input value={formData.mentor} onChange={(e) => onChange("mentor", e.target.value)} />
        </div>
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
