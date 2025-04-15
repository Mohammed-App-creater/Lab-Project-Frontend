import type React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClipboardList, FileText, Info, User } from "lucide-react"
import ProfileHeader from "./profile.header"

export default function UserProfile() {
  return (
    <div className="p-2.5"> 
      <ProfileHeader />
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-56 h-fit bg-transparent rounded-2xl">
        <div className="flex flex-col h-fit">
          <div className="py-4">
            <div className="space-y-1  ">
              <SidebarItem icon={ <User className="h-5 w-5" />} label="Profile"  />
              <SidebarItem icon={<ClipboardList className="h-5 w-5" />} label="Attendance" />
              <SidebarItem icon={<FileText className="h-5 w-5" />} label="Progress" />
              <SidebarItem icon={<Info className="h-5 w-5" />} label="Heads up!" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6">
        <Card className="border-0 bg-transparent shadow-none">
          <Tabs defaultValue="required" className="w-full">
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

            <TabsContent value="required" className="mt-0 ml-5">
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                <FormField label="First Name" value="Henok" />
                <FormField label="Last Name" value="Assefa" />
                <FormField label="Mobile Number" value="(+251)-955-012-234" />
                <FormField label="Email Address" value="Henok@example.com" />
                <FormField label="Date of Birth" value="July 14, 1995" />
                <FormField label="Github" value="https://github.com/henabakos" />
                <FormField label="Gender" value="Male" />
                <FormField label="Telegram Handle" value="@henok_1" />
                <FormField label="Expected Graduation Year" value="2026" />
                <FormField label="Specialization" value="Full-stack development, UI/UX design" />
                <FormField label="Department" value="Computer Science And Engineering" />
                <FormField label="Mentor" value="Kiya Kebe" />
              </div>
            </TabsContent>

            <TabsContent value="optional" className="mt-0">
              <div className="text-center py-12 text-gray-500">Optional information section</div>
            </TabsContent>

            <TabsContent value="resources" className="mt-0">
              <div className="text-center py-12 text-gray-500">Resources section</div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
    </div>
  )
}

function SidebarItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <Button variant="ghost" className="w-full justify-start px-4 py-2 h-auto">
      <div className="flex items-center gap-2 text-gray-700">
        {icon}
        <span>{label}</span>
      </div>
    </Button>
  )
}

function FormField({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1.5">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  )
}
