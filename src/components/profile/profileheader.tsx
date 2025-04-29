"use client"

import { Edit2 } from "lucide-react"

interface ProfileHeaderProps {
  onEdit: () => void
}

export default function ProfileHeader({ onEdit }: ProfileHeaderProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      <div className="h-40 bg-blue-900 w-full relative">
        <button
          onClick={onEdit}
          className="absolute top-4 right-4 text-white hover:text-gray-200"
          aria-label="Edit Profile"
        >
          <Edit2 className="h-5 w-5" />
        </button>
      </div>

      <div className="absolute bottom-4 left-6 flex items-end gap-4">
        <div className="h-20 w-20 rounded-full overflow-hidden border-4 border-white">
          <img src="image1.svg?height=80&width=80" alt="Henok Assefa" className="h-full w-full object-cover" />
        </div>

        <div className="mb-1 text-white">
          <h1 className="text-xl font-semibold">Henok Assefa</h1>
          <div className="flex flex-col gap-0.5">
            <p className="text-sm">Full-Stack Developer</p>
            <div className="flex items-center text-xs text-gray-200">
              <span>Last seen 3h 35m ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
