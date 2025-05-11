"use client";
import ProfileContent from "@/components/profile/profilecontent";
import { useProfileUIStore } from "@/store/userprofileStore";

export default function MainContent() {
  const user = (localStorage.getItem("user")) 
    const userId = JSON.parse(user || '{"id": ""}').id || " ";
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

