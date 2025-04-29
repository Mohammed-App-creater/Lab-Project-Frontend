"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, ClipboardList, FileText, Edit2 } from "lucide-react"
import RequiredInfoTab from "@/components/profile/requiredInfoTab"
import OptionalInfoTab from "@/components/profile/optionalInfoTab"
import ResourcesTab from "@/components/profile/resourcesTab"
import RequiredInfoView from "@/components/profile/requiredinfoView"
import OptionalInfoView from "@/components/profile/optionalInfoview"
import ResourcesView from "@/components/profile/resourcesView"
import type { TabType } from "@/app/profile/page"

interface ProfileContentProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
  isEditing: boolean
  onToggleEdit: () => void
}

export default function ProfileContent({ activeTab, onTabChange, isEditing, onToggleEdit }: ProfileContentProps) {

  const userData = {
    firstName: "Henok",
    lastName: "Assefa",
    role: "Full-Stack Developer",
    joinDate: "Last Seen 3h 35m ago",
    profileImage: "/placeholder.svg?height=80&width=80",
    mobileNumber: "(+251)-955-012-234",
    email: "Henok@example.com",
    dateOfBirth: "July 14, 1995",
    gender: "Male",
    expectedGraduationYear: "2026",
    department: "Computer Science And Engineering",
    github: "https://github.com/henokakos",
    telegramHandle: "@henok_1",
    specialization: "Full-stack development, UI/UX design",
    mentor: "Kiya Kebe",
    universityId: "Ugr/23456/14",
    instagramHandle: "@hena_man",
    linkedinUrl: "https://linkedin.com/henokassefa/profile",
    codeforces: "https://codeforces.com/heno_kakos",
    leetcode: "https://leetcode.com/heno_kakos",
    cv: "https://github.com/henokakos/Admin-sidebar",
    joiningDate: "Mar 28, 2024",
    shortBio:
      "I am a full-stack developer with experience in React, Next.js, Node.js, Express, React, Tailwind CSS, Redux Toolkit, and Shadcn on the frontend, as well as Node.js, Express, Prisma, and databases like MongoDB & PostgreSQL on the backend. I have experience developing high-performance web applications, focusing on clean architecture, scalability, and modern UI/UX principles.",
  }

  if (!isEditing) {
    return (
      <div className="bg-white rounded-lg shadow p-6 relative">
        <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as TabType)} className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 mb-6">
            <TabsTrigger
              value="required"
              className="border-t-0 border-x-0 data-[state=active]:border-b-4 data-[state=active]:border-blue-900 data-[state=active]:text-blue-900 rounded-none pb-2 px-4"
            >
              <User className="h-5 w-5 mr-2" />
              Required Information
            </TabsTrigger>
            <TabsTrigger
              value="optional"
              className="border-t-0 border-x-0 data-[state=active]:border-b-4 data-[state=active]:border-blue-900 data-[state=active]:text-blue-900 rounded-none pb-2 px-4"
            >
              <ClipboardList className="h-5 w-5 mr-2" />
              Optional Information
            </TabsTrigger>
            <TabsTrigger
              value="resources"
              className="border-t-0 border-x-0 data-[state=active]:border-b-4 data-[state=active]:border-blue-900 data-[state=active]:text-blue-900 rounded-none pb-2 px-4"
            >
              <FileText className="h-5 w-5 mr-2" />
              Resources
            </TabsTrigger>
          </TabsList>

          <TabsContent value="required">
            <RequiredInfoView userData={userData} />
          </TabsContent>

          <TabsContent value="optional">
            <OptionalInfoView userData={userData} />
          </TabsContent>

          <TabsContent value="resources">
            <ResourcesView />
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as TabType)} className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 mb-6">
          <TabsTrigger
            value="required"
            className="border-t-0 border-x-0 data-[state=active]:border-b-4 data-[state=active]:border-blue-900 data-[state=active]:text-blue-900 rounded-none pb-2 px-4"
          >
            <User className="h-5 w-5 mr-2" />
            Required Information
          </TabsTrigger>
          <TabsTrigger
            value="optional"
            className="border-t-0 border-x-0 data-[state=active]:border-b-4 data-[state=active]:border-blue-900 data-[state=active]:text-blue-900 rounded-none pb-2 px-4"
          >
            <ClipboardList className="h-5 w-5 mr-2" />
            Optional Information
          </TabsTrigger>
          <TabsTrigger
            value="resources"
            className="border-t-0 border-x-0 data-[state=active]:border-b-4 data-[state=active]:border-blue-900 data-[state=active]:text-blue-900 rounded-none pb-2 px-4"
          >
            <FileText className="h-5 w-5 mr-2" />
            Resources
          </TabsTrigger>
        </TabsList>

        <TabsContent value="required">
          <RequiredInfoTab userData={userData} onCancel={onToggleEdit} onSave={onToggleEdit} />
        </TabsContent>

        <TabsContent value="optional">
          <OptionalInfoTab userData={userData} onCancel={onToggleEdit} onSave={onToggleEdit} />
        </TabsContent>

        <TabsContent value="resources">
          <ResourcesTab onCancel={onToggleEdit} onSave={onToggleEdit} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
