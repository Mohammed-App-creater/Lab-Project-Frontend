"use client";
import ProfileContent from "@/components/profile/profilecontent";
import { useProfileUIStore } from "@/store/membersStore";
import { use } from "react";

export default function MainContent({ params }: { params: Promise<{ profile: string }> }) {
  const Params = use(params);
  const userId = Params.profile;
  const { activeTab, setActiveTab, isEditing, toggleEditing } = useProfileUIStore();

  return (
    <ProfileContent
      activeTab={activeTab}
      onTabChange={setActiveTab}
      isEditing={isEditing}
      onToggleEdit={toggleEditing}
      userId={userId}
    />
  );
}

