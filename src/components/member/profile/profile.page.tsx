import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, ClipboardList, FileText } from "lucide-react"
import { ProfileSidebar } from "./profile.sidebar";

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen ">
      <ProfileSidebar activePage="profile" />

      <div className="flex-1 p-6">
        <Card className="border-0 shadow-none">
          <Tabs defaultValue="required" className="w-full">
            <TabsList className="w-full  justify-start border-b rounded-none bg-transparent h-auto p-0 mb-6">
              <TabsTrigger
                value="required"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-900 data-[state=active]:text-blue-900 rounded-none pb-2 px-4"
              >
                <User className="h-5 w-5 mr-2" />
                Required Information
              </TabsTrigger>
              <TabsTrigger
                value="optional"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-900 data-[state=active]:text-blue-900 rounded-none pb-2 px-4"
              >
                <ClipboardList className="h-5 w-5 mr-2" />
                Optional Information
              </TabsTrigger>
              <TabsTrigger
                value="resources"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-900 data-[state=active]:text-blue-900 rounded-none pb-2 px-4"
              >
                <FileText className="h-5 w-5 mr-2" />
                Resources
              </TabsTrigger>
            </TabsList>

            <TabsContent value="required" className="mt-0">
              <div className="grid grid-cols-2    gap-x-8 gap-y-6">
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
