

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfileHeader() {
  return (
    <div className="relative w-full mb-5 overflow-hidden rounded-lg">
      <div className="h-40 bg-[#2c3e67] w-full"></div>

      <div className="absolute bottom-4 left-6 flex items-end gap-4">
        <Avatar className="h-20 w-20 border-4 border-white">
          <AvatarImage src="/profile.svg" alt="Henok Assefa" />
          <AvatarFallback>H A</AvatarFallback>
        </Avatar>

        <div className="mb-1 text-white">
          <h1 className="text-xl font-semibold">Henok Assefa</h1>
          <div className="flex flex-col gap-0.5">
            <p className="text-sm">Full-Stack Developer</p>
            <div className="flex items-center text-xs text-gray-200">
              <span>last seen 2h 30m ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
