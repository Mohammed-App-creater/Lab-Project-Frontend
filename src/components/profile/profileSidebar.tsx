"use client"

import { Button } from "@/components/ui/button"
import { User, Calendar, BarChart2, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useParams } from "next/navigation"
import type { SidebarTabType } from "@/app/profile/page"

interface SidebarProps {
  activePage: SidebarTabType
}

export function ProfileSidebar({ activePage }: SidebarProps) {
  const params = useParams()
  const memberId = params?.id || "1" 

  const navItems = [
    {
      icon: <User className="h-5 w-5 mr-2" />,
      label: "Profile",
      href: `/profile/${memberId}`,
      id: "profile" as SidebarTabType,
    },
    {
      icon: <Calendar className="h-5 w-5 mr-2" />,
      label: "Attendance",
      href: `/profile/${memberId}/attendance`,
      id: "attendance" as SidebarTabType,
    },
    {
      icon: <BarChart2 className="h-5 w-5 mr-2" />,
      label: "Progress",
      href: `/profile/${memberId}/progress`,
      id: "progress" as SidebarTabType,
    },
    {
      icon: <AlertCircle className="h-5 w-5 mr-2" />,
      label: "Heads up!",
      href: `/profile/${memberId}/headsup`,
      id: "headsup" as SidebarTabType,
    },
  ]

  return (
    <div className="w-56 h-fit rounded-2xl">
      <div className="flex flex-col h-full">
        <div className="py-4">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link href={item.href} key={item.id}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start px-4 py-2 h-auto",
                    activePage === item.id && "bg-blue-900 text-white hover:bg-blue-800 hover:text-white",
                  )}
                >
                  <div className="flex items-center">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
