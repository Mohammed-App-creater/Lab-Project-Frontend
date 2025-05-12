"use client";

import { Edit2 } from "lucide-react";
import { user } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileHeaderProps {
  onEdit: () => void;
  user: user;
}

export default function ProfileHeader({ onEdit, user}: ProfileHeaderProps) {
  const Id = localStorage.getItem("userId") || "";
  const fullName = `${user.firstName} ${user.middleName ?? ""} ${user.lastName}`
    .replace(/\s+/g, " ")
    .trim();
  const specialty = user.specialty ?? "No specialty";
  const profileImage = user.profileImageUrl ?? "/default-avatar.svg";

  const lastSeen = user.lastSeen 
    ? (() => {
        const lastSeenDate = new Date(user.lastSeen);
        const now = new Date();
        const diffInHours = Math.abs(now.getTime() - lastSeenDate.getTime()) / (1000 * 60 * 60);
        if (diffInHours > 23) {
          const daysAgo = Math.floor(diffInHours / 24);
          return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
        }
        return lastSeenDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      })()
    : "Last seen unknown";

  return (
    <div className="relative w-full ">
      <div className="py-34 bg-blue-900 w-full relative rounded-t-3xl">
      {(user.id === Id) && (
        <button
          onClick={onEdit}
          className="absolute top-4 right-4 text-white hover:text-gray-200"
          aria-label="Edit Profile"
        >
          <Edit2 className="h-4 w-5" />
        </button>
      )}
      </div>

      <div className="absolute -bottom-8 left-16 flex items-center gap-12">
          <Avatar className="h-30 w-30 ">
            <AvatarImage
              className="w-full h-full"
              src={profileImage}
              alt={fullName}
            />
            <AvatarFallback className="w-full h-full  text-6xl">
              {fullName? fullName.charAt(0) : "?"}
            </AvatarFallback>
          </Avatar>

        <div className="mb-8">
          <h1 className="text-2xl text-white font-bold">{fullName}</h1>
          <div className="flex flex-row gap-8 ">
            <p className="text-sm text-white">{specialty}</p>
            <div className="flex items-center text-sm text-[#AEAEAECC]">
              Last Seen<span>{lastSeen}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
