"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProfileHeader from "@/components/profile/profileheader";
import { ProfileSidebar } from "@/components/profile/profileSidebar";
import ProfileContent from "@/components/profile/profilecontent";
import { User, TabType } from "@/types/user";
import { fetchUserProfile } from "@/api/user";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>("required");
  const [isEditing, setIsEditing] = useState(false);
  

  const userId = "355569f7-0930-4146-bfbf-b5644dc77427";

  const { data: user, isLoading, error } = useQuery<User>({
    queryKey: ['userProfile', userId],
    queryFn: () => fetchUserProfile(userId),
  });



  const handleTabChange = (tab: TabType) => setActiveTab(tab);
  const handleToggleEdit = () => setIsEditing(!isEditing);

  if (isLoading) return <div className="p-4">Loading user profile...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error.message}</div>;
  if (!user) return <div className="p-4">No user data found.</div>;

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col flex-1">
        <main className="flex-1 overflow-y-auto p-4  w-full mx-auto">
          <ProfileHeader onEdit={handleToggleEdit} user={user} />
          <div className="flex gap-6 mt-5">
            <ProfileSidebar activePage="profile" user={user} />

            <div className="flex-1">
              <ProfileContent
                activeTab={activeTab}
                onTabChange={handleTabChange}
                isEditing={isEditing}
                onToggleEdit={handleToggleEdit}
                userId={user.id}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

