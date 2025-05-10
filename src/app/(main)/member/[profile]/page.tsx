"use client";
import { useState } from "react";
import ProfileHeader from "@/components/profile/profileheader";
import { ProfileSidebar } from "@/components/profile/profileSidebar";
import ProfileContent from "@/components/profile/profilecontent";
import { fetchUserProfile } from "@/api/user";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "@/components/global/login/loading";
import { use } from "react";

export default function ProfilePage({
  params,
}: {
  params: Promise<{ profile: string }>;
}) {
  const resolvedParams = use(params);
  const { profile } = resolvedParams;
  const [activeTab, setActiveTab] = useState("required");
  const [isEditing, setIsEditing] = useState(false);
  const {
    data: user,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUserProfile(profile),
  });

  if (isLoading) {
    return <LoadingSpinner fullPage={true} />;
  }
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-500">User not found</p>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-500">
          Error fetching user data {String(error)}
        </p>
      </div>
    );
  }

  const handleTabChange = (tab: string) => setActiveTab(tab);
  const handleToggleEdit = () => setIsEditing(!isEditing);

  if (isLoading) return <div className="p-4">Loading user profile...</div>;
  if (error)
    return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!user) return <div className="p-4">No user data found.</div>;

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col flex-1">
        <main className="flex-1 overflow-y-auto p-4  w-full mx-auto">
          <ProfileHeader onEdit={handleToggleEdit} user={user}  />
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

