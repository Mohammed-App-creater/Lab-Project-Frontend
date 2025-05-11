"use client";

import Link from 'next/link';
import { FiLayers, FiSettings, FiUsers } from 'react-icons/fi';
import { MdOutlineAdminPanelSettings, MdOutlineDashboard } from 'react-icons/md';
import { LuCalendarCheck, LuClock10 } from "react-icons/lu";
import { HiOutlineUsers } from "react-icons/hi2";
import { IoFolderOutline } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";
import Image from 'next/image';
import { useState } from 'react';

interface SidebarItemProps {
  onClose?: () => void;
}
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function SidebarItem({ onClose }: SidebarItemProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [loadingItem, setLoadingItem] = useState<string | null>(null);

  const isActive = (path: string) => pathname === path;

  const menuItems = [
    {
      href: "/dashboard",
      icon: <MdOutlineDashboard className="w-5 h-5" />,
      label: "Dashboard",
    },
    {
      href: "/member",
      icon: <FiUsers className="w-5 h-5" />,
      label: "All Members",
    },
    {
      href: "/alldivision",
      icon: <FiLayers className="w-5 h-5" />,
      label: "All Divisions",
    },
    {
      href: "/attendance",
      icon: <LuCalendarCheck className="w-5 h-5" />,
      label: "Attendance",
    },
    {
      href: "/session",
      icon: <LuClock10 className="w-5 h-5" />,
      label: "Sessions & Events",
    },
    {
      href: "/resources",
      icon: <IoFolderOutline className="w-5 h-5" />,
      label: "Resources",
    },
    {
      href: "/profile",
      icon: <HiOutlineUsers className="w-5 h-5" />,
      label: "Profile",
    },
    {
      href: "/administration",
      icon: <MdOutlineAdminPanelSettings className="w-5 h-5" />,
      label: "Administration",
    },
    {
      href: "/settings",
      icon: <FiSettings className="w-5 h-5" />,
      label: "Settings",
    },
  ];

  const handleClick = async (href: string) => {
    setLoadingItem(href);
    if (onClose) {
      onClose();
    }
    try {
      await router.push(href);
    } finally {
      setLoadingItem(null);
    }
  };

  return (
    <div className='flex flex-col justify-between h-full'>
      {/* Logo Section */}
      <div>
        <div className="mb-6">
          <Link href="/" className="flex items-center">
            <div className="text-blue-700 font-bold text-xl flex items-center">
              <Image className="w-7 h-10 -ml-3" width={20} height={20} src="/images/logo.jpg" alt="Logo Part 2" />
              <h1 className="font-bold ml-4">CSEC ASTU</h1>
            </div>
          </Link>
        </div>

        {/* Navigation Section */}
        <nav className="flex flex-col space-y-1">
          <TooltipProvider>
            {menuItems.map((item) => (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => handleClick(item.href)}
                    className={cn(
                      "w-full flex items-center px-3 py-2 transition-colors duration-200",
                      "hover:bg-[#0030870D] hover:text-blue-700 dark:hover:bg-blue-900/20",
                      isActive(item.href)
                        ? "text-blue-700 bg-[#0030870D] border-l-3 border-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                        : "text-gray-700 dark:text-gray-300"
                    )}
                  >
                    {loadingItem === item.href ? (
                      <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      item.icon
                    )}
                    <span className="ml-3 text-[15px] font-medium">{item.label}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" className="md:hidden">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </nav>
      </div>
    </div>
  );
}
export default SidebarItem;


