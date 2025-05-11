"use client";
import { useProfileUIStore, useUserStore } from "@/store/membersStore";
import ProfileHeader from "@/components/profile/profileheader";

export default function Header() {
  const user = useUserStore((state) => state.user);
  const { toggleEditing } = useProfileUIStore();
  if (!user) return null;

  return (
    <ProfileHeader
      user={user}
      onEdit={() => {
        toggleEditing();
      }}
    />
  );
}
