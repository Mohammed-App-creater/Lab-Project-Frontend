

"use client"

import { UserData } from "@/types/user"

function FormField({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1.5">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  )
}

export default function OptionalInfoView({ userData }: { userData: UserData }) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <FormField label="University ID" value={userData.universityId} />
        <FormField label="Instagram Handle" value={userData.instagramHandle || ""} />
        <FormField label="LinkedIn URL" value={userData.linkedinUrl} />
        <FormField label="Date of Birth" value={userData.dateOfBirth} />
        <FormField label="Codeforces Handle" value={userData.codeforces} />
        <FormField label="CV" value={userData.cv} />
        <FormField label="Leetcode Handle" value={userData.leetcode} />
        <FormField label="Joining Date" value={userData.joiningDate} />
      </div>

      <div className="mt-6">
        <p className="text-sm text-gray-500 mb-1.5">Short Bio</p>
        <p className="font-medium">{userData.shortBio}</p>
      </div>
    </div>
  )
}