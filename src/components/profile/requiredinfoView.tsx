'use client'

import { useSettingStore } from "@/store/settingstore";
import { user } from "@/types/user"

interface RequiredInfoViewProps {
  userData: user
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
      <FormField label="First Name" value={userData?.firstName} />
      <FormField label="Last Name" value={userData?.lastName || "N/A"} />
      <FormField
      label="Mobile Number"
      value={
        setting?.phonePublic === false
        ? '••••••••'
        : userData?.phone_number ? userData?.phone_number : "N/A"
      }
      />
      <FormField label="Email Address" value={userData?.email || "N/A"} />
      <FormField label="Date of Birth" value={userData?.berthDate || "N/A"} />
      <FormField
      label="Github"
      value={
        userData?.socialLinks?.find(
        (socialLink) => socialLink?.socialLinkName === "github"
        )?.socialLinkUrl || "N/A"
      }
      />
      <FormField label="Gender" value={userData?.gender || "N/A"} />
      <FormField label="Telegram Handle" value={userData?.telegramUserName || "N/A"} />
      <FormField label="Expected Graduation Year" value={`${userData?.universityInfo?.expectedGraduationYear}` || "N/A"} />
      <FormField label="Specialization" value={userData?.specialty || "N/A"} />
      <FormField label="Department" value={userData?.universityInfo?.major || "N/A"} />
      <FormField label="Mentor" value={   "N/A"} />
    </div>
  )
}
