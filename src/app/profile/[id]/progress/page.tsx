"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ProfileSidebar } from "@/components/profile/profileSidebar"
import ProfileHeader from "@/components/profile/profileheader"
import SidebarCard from "@/components/global/sidebar/sidebar.card"
import Header from "@/components/global/header/header"

export default function ProgressPage() {
  const [isEditing, setIsEditing] = useState(false)
  const handleToggleEdit = () => setIsEditing(!isEditing)

  return (
    <div className="flex min-h-screen">
      <aside className="w-[250px] hidden md:block">
        <SidebarCard />
      </aside>

      <div className="flex flex-col flex-1">
        <header>
          <Header />
        </header>

        <main className="flex-1 overflow-y-auto p-4 w-[1030px]">
          <ProfileHeader onEdit={handleToggleEdit} user={undefined} />

          <div className="flex gap-6 mt-5">
            <ProfileSidebar activePage="progress" />

            <div className="flex-1">
              <div className="grid gap-6">
                <Card className="p-6 max-w-md mx-auto -ml-1">
                  <h2 className="text-xl font-semibold mb-6">Overall Attendance Progress</h2>

                  <div className="flex justify-center mb-8">
                    <div className="relative w-40 h-40">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle
                          className="text-blue-100 stroke-current"
                          strokeWidth="10"
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                        />
                        <circle
                          className="text-blue-900 stroke-current"
                          strokeWidth="10"
                          strokeLinecap="round"
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          strokeDasharray="251.2"
                          strokeDashoffset="62.8" 
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold">75%</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold">28%</p>
                      <p className="text-sm text-gray-500">Last week</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">56%</p>
                      <p className="text-sm text-gray-500">Last month</p>
                    </div>
                  </div>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <StatCard value="0" label="Heads up" percentage={0} color="blue-100" />
                  <StatCard value="3" label="Absent" percentage={25} color="red-300" />
                  <StatCard value="7" label="Present" percentage={75} color="green-500" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

interface StatCardProps {
  value: string
  label: string
  percentage: number
  color: string
}

function StatCard({ value, label, percentage, color }: StatCardProps) {
  return (
    <Card className="p-4 flex items-center">
      <div className="relative w-16 h-16 mr-4">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle className="text-gray-100 stroke-current" strokeWidth="10" cx="50" cy="50" r="40" fill="transparent" />
          <circle
            className={`text-${color} stroke-current`}
            strokeWidth="10"
            strokeLinecap="round"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            strokeDasharray="251.2"
            strokeDashoffset={251.2 * (1 - percentage / 100)}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold">{percentage}%</span>
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </Card>
  )
}
