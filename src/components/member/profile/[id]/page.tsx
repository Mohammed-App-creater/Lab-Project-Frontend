import { ProfileSidebar } from "../profile.sidebar"
import ProfileHeader from "../profile.header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, ClipboardList, FileText } from "lucide-react"

// This is a dynamic route that will handle all member profiles
export default function MemberProfilePage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the member data based on the ID
  // For now, we'll just display the same profile for all members

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <ProfileHeader />

      <div className="flex gap-5">
        <ProfileSidebar activePage="profile" />

        <div className="flex-1">
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
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                <FormField label="University ID" value="ugr/30123/15" />
                <FormField label="Instagram handle" value="@hena_man" />
                <FormField label="Linkedin Account" value="https://linkedin.com/henokassefa/profile" />
                <FormField label="Birth-Date" value="Mar 28, 2002" />
                <FormField label="Codeforce handle" value="https://codeforces/hena_bakos" />
                <FormField label="CV" value="https://github.com/Henabakos/Admin-edstelar" />
                <FormField label="Leetcode handle" value="https://leetcode/Hena_bakos" />
                <FormField label="Joining Date" value="July 10, 2023" />
                <FormField
                  label="Short Bio"
                  value="I am a full-stack developer and UI/UX designer with a strong background in Next.js, React, Tailwind CSS, Redux Toolkit, and ShadCN on the frontend, as well as Node.js, Express, Prisma, and databases like MongoDB & PostgreSQL on the backend. I have experience developing high-performance web applications, focusing on clean architecture, scalability, and modern UI/UX principles."
                />
              </div>
            </TabsContent>

            <TabsContent value="resources" className="mt-0">
              <div className="grid grid-cols-2 gap-x-8 gap-y-6 -mt-2">
                <div>
                  <p className="text-[#A2A1A8] mb-2">Resource Name</p>
                  <p className="mb-2">Data science & AI challenges.</p>
                  <p className="mb-2">Math-based programming problems.</p>
                  <p className="mb-2">Cybersecurity & hacking challenges.</p>
                  <p className="mb-2">Smart contract security challenges.</p>
                  <p className="mb-2">CP contests for beginners & intermediates.</p>
                </div>
                <div>
                  <p className="text-[#A2A1A8] mb-2">Link</p>
                  <p className="mb-2 flex items-center">
                    <a href="https://googlecodejam.com/challenges" className="text-blue-600 hover:underline">
                      https://googlecodejam.com/challenges
                    </a>
                    <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15 3H21V9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 14L21 3"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </p>
                  <p className="mb-2 flex items-center">
                    <a href="https://googlecodejam.com/challenges" className="text-blue-600 hover:underline">
                      https://googlecodejam.com/challenges
                    </a>
                    <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15 3H21V9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 14L21 3"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </p>
                  <p className="mb-2 flex items-center">
                    <a href="https://googlecodejam.com/challenges" className="text-blue-600 hover:underline">
                      https://googlecodejam.com/challenges
                    </a>
                    <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15 3H21V9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 14L21 3"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </p>
                  <p className="mb-2 flex items-center">
                    <a href="https://googlecodejam.com/challenges" className="text-blue-600 hover:underline">
                      https://googlecodejam.com/challenges
                    </a>
                    <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15 3H21V9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 14L21 3"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </p>
                  <p className="mb-2 flex items-center">
                    <a href="https://googlecodejam.com/challenges" className="text-blue-600 hover:underline">
                      https://googlecodejam.com/challenges
                    </a>
                    <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15 3H21V9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 14L21 3"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
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
