"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FiLayers, FiSettings, FiUsers } from "react-icons/fi"
import { MdOutlineDashboard } from "react-icons/md"
import { LuCalendarCheck, LuClock10 } from "react-icons/lu"
import { HiOutlineUsers } from "react-icons/hi2"
import { IoFolderOutline } from "react-icons/io5"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

function SidebarItem() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }
  const {theme}=useTheme();
  console.log(theme);
  const menuItems = [
    {
      path: "/dashboard",
      icon: <MdOutlineDashboard className="w-5 h-5 mr-3 " />,
      label: "Dashboard",
    },
    {
      path: "/member",
      icon: <FiUsers className="w-5 h-5 mr-3" />,
      label: "All Members",
    },
    {
      path: "/alldivision",
      icon: <FiLayers className="w-5 h-5 mr-3" />,
      label: "All Divisions",
    },
    {
      path: "/attendance",
      icon: <LuCalendarCheck className="w-5 h-5 mr-3" />,
      label: "Attendance",
    },
    {
      path: "/sessions",
      icon: <LuClock10 className="w-5 h-5 mr-3" />,
      label: "Sessions & Events",
    },
    {
      path: "/resources",
      icon: <IoFolderOutline className="w-5 h-5 mr-3" />,
      label: "Resources",
    },
    {
      path: "/profile",
      icon: <HiOutlineUsers className="w-5 h-5 mr-3" />,
      label: "Profile",
    },
    {
      path: "/settings",
      icon: <FiSettings className="w-5 h-5 mr-3" />,
      label: "Settings",
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <Link href="/dashboard" className="flex items-center">
          <div className="font-bold text-xl flex items-center">
            <img className="text-[#003087] w-7 h-10 ml-4" src="/Vector.svg" alt="Logo part 1" />
            <img className="text-[#003087] w-7 h-10 -ml-4" src="/Vector1.svg" alt="Logo part 2" />
            <div className="-ml-2"><h1 className="hidden md:block text-[#110051] font-bold ml-4">CSEC ASTU</h1></div>
          
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 ">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={cn(
              "-mt-1 flex items-center px-3 py-2 rounded-r-lg hover:bg-[#0030870D] hover:text-blue-700",
              isActive(item.path)
                ? "text-[#003087] border-l-3 border-[#003087] bg-[#232d3f0d] font-semibold"
                : "text-[#16151C] hover:border-l-4 hover:border-blue-700 ",
            )}
          >
            {item.icon}
            <span className={cn("hidden",theme=='dark'?'text-gray-400':theme=='light'?'text-black':"","md:block")}>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default SidebarItem
