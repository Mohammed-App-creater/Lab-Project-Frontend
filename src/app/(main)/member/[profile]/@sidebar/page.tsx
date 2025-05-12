"use client";
import { ProfileSidebar } from "@/components/profile/profileSidebar";
import { useUserStore } from "@/store/membersStore";

export default function Sidebar() {
  const user = useUserStore((state) => state.user);
  if (!user) return null;
  return <ProfileSidebar user={user} />;
}
