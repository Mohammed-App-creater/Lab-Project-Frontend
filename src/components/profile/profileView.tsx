
"use client"

import { useState } from "react"
import { User, Calendar, Clock, FileText, BookOpen, Edit, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { TabType } from "@/app/profile/page"

interface ProfileViewProps {
  userData: any
  onEdit: () => void
}

export default function ProfileView({ userData, onEdit }: ProfileViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>("required")

  const resources = [
    { name: "Data science & AI challenges.", link: "https://googlecodejam.com/challenges" },
    { name: "Math-based programming problems.", link: "https://googlecodejam.com/challenges" },
    { name: "Cybersecurity & hacking challenges.", link: "https://googlecodejam.com/challenges" },
    { name: "Smart contract security challenges.", link: "https://googlecodejam.com/challenges" },
    { name: "CP contests for beginners & intermediates.", link: "https://googlecodejam.com/challenges" },
  ]

 
  const attendance = [
    { date: "July 01, 2023", session: "Contest", startTime: "08:02 AM", endTime: "09:02 AM", status: "Present" },
    { date: "July 02, 2023", session: "Contest", startTime: "08:02 AM", endTime: "09:20 AM", status: "Present" },
    { date: "July 03, 2023", session: "Contest", startTime: "08:02 AM", endTime: "09:05 AM", status: "Present" },
    { date: "July 04, 2023", session: "Contest", startTime: "08:02 AM", endTime: "08:35 AM", status: "Absent" },
    { date: "July 05, 2023", session: "Contest", startTime: "08:02 AM", endTime: "08:30 AM", status: "Absent" },
    { date: "July 06, 2023", session: "Contest", startTime: "08:02 AM", endTime: "09:02 AM", status: "Excused" },
    { date: "July 07, 2023", session: "Contest", startTime: "08:02 AM", endTime: "09:15 AM", status: "Present" },
    { date: "July 08, 2023", session: "Contest", startTime: "08:02 AM", endTime: "08:23 AM", status: "Absent" },
    { date: "July 09, 2023", session: "Contest", startTime: "08:02 AM", endTime: "09:02 AM", status: "Present" },
  ]

 
  const optionalInfo = {
    universityId: "Ugr/23456/14",
    instagramHandle: "@hena_man",
    linkedinAccount: "https://linkedin.com/henokassefa/profile",
    birthDate: "Mar 28, 2002",
    codeforces: "https://codeforces/hena_bakos",
    cv: "https://github.com/Henabakos/Admin-sidebar",
    leetcode: "https://leetcode/Hena_bakos",
    joiningDate: "July 10, 2023",
    shortBio:
      "I am a full-stack developer and UI/UX designer with a strong background in Next.js, React, Tailwind CSS, Redux Toolkit, and ShadCN on the frontend, as well as Node.js, Express, Prisma, and databases like MongoDB & PostgreSQL on the backend. I have experience developing high-performance web applications, focusing on clean architecture, scalability, and modern UI/UX principles.",
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Present":
        return "bg-green-100 text-green-800"
      case "Absent":
        return "bg-red-100 text-red-800"
      case "Excused":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div>
      <div className="bg-blue-800 h-40 relative overflow-hidden -ml-20 pt-5">
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at 70% 30%, rgba(37, 99, 235, 0.7) 0%, rgba(30, 64, 175, 0.2) 50%)",
            backdropFilter: "blur(60px)",
          }}
        />

        <div className="absolute top-4 right-4 z-10">
          <Button onClick={onEdit} variant="ghost" size="sm" className="text-white hover:bg-blue-700">
            <Edit className="h-5 w-5" />
          </Button>
        </div>

        <div className="container mx-auto px-4 pt-6 pb-0 max-w-4xl relative z-10">
          <div className="flex items-center">
            <div className="absolute bottom-0 transform translate-y-1/2 rounded-full overflow-hidden h-24 w-24 border-4 border-white">
              <img
                src="/image1.svg"
                alt={`${userData.firstName} ${userData.lastName}`}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="text-white ml-28">
              <h1 className="text-2xl font-bold">
                {userData.firstName} {userData.lastName}
              </h1>
              <p className="text-sm opacity-90">{userData.role}</p>
              <p className="text-xs opacity-75">Last Seen 3h 35m ago</p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 pt-16 pb-6 max-w-4xl">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-48 flex-shrink-0">
            <div className="bg-white rounded-md shadow-sm overflow-hidden">
              <button
                className={`w-full text-left px-4 py-3 font-medium flex items-center ${activeTab === "profile" || activeTab === "required" ? "bg-blue-800 text-white" : "text-gray-700 hover:bg-gray-50"}`}
                onClick={() => setActiveTab("required")}
              >
                <User className="h-5 w-5 mr-3" />
                Profile
              </button>
              <button
                className={`w-full text-left px-4 py-3 font-medium flex items-center ${activeTab === "attendance" ? "bg-blue-800 text-white" : "text-gray-700 hover:bg-gray-50"}`}
                onClick={() => setActiveTab("attendance")}
              >
                <Calendar className="h-5 w-5 mr-3" />
                Attendance
              </button>
              <button
                className={`w-full text-left px-4 py-3 font-medium flex items-center ${activeTab === "progress" ? "bg-blue-800 text-white" : "text-gray-700 hover:bg-gray-50"}`}
                onClick={() => setActiveTab("progress")}
              >
                <Clock className="h-5 w-5 mr-3" />
                Progress
              </button>
              <button
                className={`w-full text-left px-4 py-3 font-medium flex items-center ${activeTab === "headsup" ? "bg-blue-800 text-white" : "text-gray-700 hover:bg-gray-50"}`}
                onClick={() => setActiveTab("headsup")}
              >
                <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Heads up!
              </button>
            </div>
          </div>

          <div className="flex-grow">
            {activeTab === "required" ||
            activeTab === "optional" ||
            activeTab === "resources" ||
            activeTab === "profile" ? (
              <div className="flex border-b mb-6 ">
                <button
                  className={`flex items-center px-4 py-2 border-b-2 ${activeTab === "required" ? "border-blue-800 text-blue-800" : "border-transparent text-gray-600"}`}
                  onClick={() => setActiveTab("required")}
                >
                  <User className="h-4 w-4 mr-2" />
                  <span className="font-medium">Required Information</span>
                </button>
                <button
                  className={`flex items-center px-4 py-2 border-b-2 ${activeTab === "optional" ? "border-blue-800 text-blue-800" : "border-transparent text-gray-600"}`}
                  onClick={() => setActiveTab("optional")}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  <span className="font-medium">Optional Information</span>
                </button>
                <button
                  className={`flex items-center px-4 py-2 border-b-2 ${activeTab === "resources" ? "border-blue-800 text-blue-800" : "border-transparent text-gray-600"}`}
                  onClick={() => setActiveTab("resources")}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  <span className="font-medium">Resources</span>
                </button>
              </div>
            ) : null}

            {activeTab === "required" && (
              <div className="bg-white p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <p className="text-sm text-gray-500">First Name</p>
                    <p className="font-medium">{userData.firstName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Name</p>
                    <p className="font-medium">{userData.lastName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Mobile Number</p>
                    <p className="font-medium">{userData.mobileNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-medium">{userData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="font-medium">{userData.dateOfBirth}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">GitHub</p>
                    <p className="font-medium">{userData.github}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="font-medium">{userData.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Telegram Handle</p>
                    <p className="font-medium">{userData.telegramHandle}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Expected Graduation Year</p>
                    <p className="font-medium">{userData.expectedGraduationYear}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Specialization</p>
                    <p className="font-medium">{userData.specialization}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Department</p>
                    <p className="font-medium">{userData.department}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Mentor</p>
                    <p className="font-medium">{userData.mentor}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "optional" && (
              <div className="bg-white p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <p className="text-sm text-gray-500">University ID</p>
                    <p className="font-medium">{optionalInfo.universityId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Instagram Handle</p>
                    <p className="font-medium">{optionalInfo.instagramHandle}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">LinkedIn Account</p>
                    <p className="font-medium">{optionalInfo.linkedinAccount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Birth Date</p>
                    <p className="font-medium">{optionalInfo.birthDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Codeforces Handle</p>
                    <p className="font-medium">{optionalInfo.codeforces}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">CV</p>
                    <p className="font-medium">{optionalInfo.cv}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Leetcode Handle</p>
                    <p className="font-medium">{optionalInfo.leetcode}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Joining Date</p>
                    <p className="font-medium">{optionalInfo.joiningDate}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-sm text-gray-500">Short Bio</p>
                  <p className="text-sm mt-2">{optionalInfo.shortBio}</p>
                </div>
              </div>
            )}

            {activeTab === "resources" && (
              <div className="bg-white p-6">
                <div className="space-y-4">
                  {resources.map((resource, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center pb-3 last:border-b-0 last:pb-0"
                    >
                      <div>
                        <p className="font-medium">{resource.name}</p>
                        <p className="text-sm text-gray-500">{resource.link}</p>
                      </div>
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-800 hover:text-blue-600"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "attendance" && (
              <div className="bg-white rounded-md shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Session
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Start Time
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          End Time
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {attendance.map((record, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.session}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.startTime}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.endTime}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(record.status)}`}
                            >
                              {record.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "progress" && (
              <div className="bg-white rounded-md shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Progress</h2>
                <p className="text-gray-600">Progress information will be displayed here.</p>
              </div>
            )}

            {activeTab === "headsup" && (
              <div className="bg-white rounded-md shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Heads Up!</h2>
                <p className="text-gray-600">Important notifications and announcements will be displayed here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
