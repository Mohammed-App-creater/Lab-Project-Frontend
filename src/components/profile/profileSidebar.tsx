"use client";

import { Button } from "@/components/ui/button";
import { Calendar, BarChart2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { user } from "../../../types/user";

interface SidebarProps {
  user: user;
}

export function ProfileSidebar({ user }: SidebarProps) {
  const params = useParams();
  const memberId = params?.id || user.id;
  const currentPath = usePathname();
  const condition = currentPath?.includes("/member/");
  const route = !condition ? currentPath : "/member/";
  const activePage =
    currentPath?.split("/").pop() === memberId
      ? "profile"
      : currentPath?.split("/").pop() || "profile";

  const navItems = condition
    ? [
        {
          icon: <Calendar className="h-5 w-5 mr-2" />,
          label: "Profile",
          href: `${route}${condition ? `/${memberId}` : ""}`,
          id: "profile",
        },
        {
          icon: <Calendar className="h-5 w-5 mr-2" />,
          label: "Attendance",
          href: `${route}${condition ? `/${memberId}` : ""}/attendance`,
          id: "attendance",
        },
        {
          icon: <BarChart2 className="h-5 w-5 mr-2" />,
          label: "Progress",
          href: `${route}${condition ? `/${memberId}` : ""}/progress`,
          id: "progress",
        },
        {
          icon: <AlertCircle className="h-5 w-5 mr-2" />,
          label: "Heads up!",
          href: `${route}${condition ? `/${memberId}` : ""}/headsup`,
          id: "headsup",
        },
      ]
    : [
        {
          icon: <Calendar className="h-5 w-5 mr-2" />,
          label: "Profile",
          href: `/profile`,
          id: "profile",
        },
        {
          icon: <Calendar className="h-5 w-5 mr-2" />,
          label: "Attendance",
          href: `/profile/attendance`,
          id: "attendance",
        },
        {
          icon: <BarChart2 className="h-5 w-5 mr-2" />,
          label: "Progress",
          href: `/profile/progress`,
          id: "progress",
        },
        {
          icon: <AlertCircle className="h-5 w-5 mr-2" />,
          label: "Heads up!",
          href: `/profile/headsup`,
          id: "headsup",
        },
      ];

  return (
    <div className="w-56 h-fit rounded-2xl border-1 border-[#A2A1A833] mt-6">
      <div className="flex flex-col h-full">
        <div>
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link href={item.href} key={item.id}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start px-4 py-2 h-auto",
                    activePage === item.id &&
                      "bg-blue-900 text-white hover:bg-blue-800 hover:text-white"
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
  );
}
