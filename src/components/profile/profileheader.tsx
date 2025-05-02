

"use client"

import { Edit2 } from "lucide-react"
import { User } from "@/types/user"

interface ProfileHeaderProps {
  onEdit: () => void
  user: User
}

export default function ProfileHeader({ onEdit, user }: ProfileHeaderProps) {
  const fullName = `${user.firstName} ${user.middleName ?? ""} ${user.lastName}`.replace(/\s+/g, ' ').trim()
  const specialty = user.specialty ?? "No specialty"
  const profileImage = user.profileImageUrl ?? "/default-avatar.svg"
  const lastSeen = user.lastSeen
    ? new Date(user.lastSeen).toLocaleString()
    : "Last seen unknown"

  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      <div className="h-40 bg-blue-900 w-full relative">
        <button
          onClick={onEdit}
          className="absolute top-4 right-4 text-white hover:text-gray-200"
          aria-label="Edit Profile"
        >
          <Edit2 className="h-4 w-5" />
        </button>
      </div>

      <div className="absolute bottom-2 left-6 flex items-end gap-4">
        <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-white">
          <img
            src={profileImage}
            alt={fullName}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="mb-1 text-white">
          <h1 className="text-xl font-bold">{fullName}</h1>
          <div className="flex flex-row gap-3">
            <p className="text-xs">{specialty}</p>
            <div className="flex items-center text-xs text-[#AEAEAECC]">
              <span>{lastSeen}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}