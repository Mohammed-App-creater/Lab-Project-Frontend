"use client"

import { useState } from "react"
import ProfileHeader from "@/components/profile/profileheader"
import { ProfileSidebar } from "@/components/profile/profileSidebar"
import ProfileContent from "@/components/profile/profilecontent"
import SidebarCard from "@/components/global/sidebar/sidebar.card"
import Header from "@/components/global/header/header"

export type TabType = "required" | "optional" | "resources"
export type SidebarTabType = "profile" | "attendance" | "progress" | "headsup"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>("required")
  const [isEditing, setIsEditing] = useState(false)

  const handleTabChange = (tab: TabType) => setActiveTab(tab)
  const handleToggleEdit = () => setIsEditing(!isEditing)

  return (
    <div className="flex min-h-screen">
      <div className="w-[250px] hidden md:block">
        <SidebarCard />
      </div>

      <div className="flex flex-col flex-1 ">
        <header>
          <Header />
        </header>

        <main className="flex-1 overflow-y-auto p-4 w-[1030px]">
          <ProfileHeader onEdit={handleToggleEdit} />

          <div className="flex gap-6 mt-5">
            <ProfileSidebar activePage="profile" />

            <div className="flex-1">
              <ProfileContent
                activeTab={activeTab}
                onTabChange={handleTabChange}
                isEditing={isEditing}
                onToggleEdit={handleToggleEdit}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
