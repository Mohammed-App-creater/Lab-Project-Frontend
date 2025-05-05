'use client'

import { useSettingStore } from "@/Store/settingstore";
import { UserData } from "@/types/user"
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

interface RequiredInfoViewProps {
  userData: UserData
}

function FormField({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1.5">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  )
}

export default function RequiredInfoView({ userData }: RequiredInfoViewProps) {


  const setting = useSettingStore((state) => state.setting)
 
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
      <FormField label="First Name" value={userData.firstName} />
      <FormField label="Last Name" value={userData.lastName} />
      <FormField
        label="Mobile Number"
        value={
          setting?.phonePublic === false
            ? '••••••••'
            : userData.mobileNumber
        }
      />
      <FormField label="Email Address" value={userData.email} />
      <FormField label="Date of Birth" value={userData.dateOfBirth} />
      <FormField label="Github" value={userData.github} />
      <FormField label="Gender" value={userData.gender} />
      <FormField label="Telegram Handle" value={userData.telegramHandle} />
      <FormField label="Expected Graduation Year" value={userData.expectedGraduationYear} />
      <FormField label="Specialization" value={userData.specialization} />
      <FormField label="Department" value={userData.department} />
      <FormField label="Mentor" value={userData.mentor} />
    </div>
  )
}
