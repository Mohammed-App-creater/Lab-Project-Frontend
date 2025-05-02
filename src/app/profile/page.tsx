"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ProfileHeader from "@/components/profile/profileheader";
import { ProfileSidebar } from "@/components/profile/profileSidebar";
import ProfileContent from "@/components/profile/profilecontent";
import SidebarCard from "@/components/global/sidebar/sidebar.card";
import Header from "@/components/global/header/header";
import { User, TabType } from "@/types/user";
import { fetchUserProfile, mapUserToUserData } from "@/api/user";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>("required");
  const [isEditing, setIsEditing] = useState(false);
  

  const userId = "192de509-4940-4af1-a407-fed9b417b51e";
  const queryClient = useQueryClient();

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
      <div className="w-[250px] hidden md:block">
        <SidebarCard />
      </div>

      <div className="flex flex-col flex-1">
        <header>
          <Header />
        </header>

        <main className="flex-1 overflow-y-auto p-4 w-[1030px]">
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

