"use client";
import Link from "next/link";
import { FiLayers, FiSettings, FiUsers } from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";
import { LuCalendarCheck } from "react-icons/lu";
import { LuClock10 } from "react-icons/lu";
import { HiOutlineUsers } from "react-icons/hi2";
import { IoFolderOutline } from "react-icons/io5";
import { GoMoon } from "react-icons/go";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { HiAdjustments } from "react-icons/hi";

interface SidebarItemProps {
  onClose?: () => void;
}

function SidebarItem({ onClose }: SidebarItemProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const handleClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div>
      <div className="mb-4 sm:mb-8 p-4">
        <Link href="/" className="flex items-center" onClick={handleClick}>
          <div className="text-blue-900 font-bold text-xl flex items-center">
            <img className="w-7 h-10" src="Vector.svg" />
            <img className="w-7 h-10 -ml-3" src="Vector1.svg" />
            <h1 className="text-2xl font-bold ml-4">
              CSEC ASTU
            </h1>
          </div>
        </Link>
      </div>

      <nav className="flex flex-col gap-2">
        <Link
          href="/dashboard"
          className={`flex items-center px-4 py-3 rounded-r-lg hover:bg-[#0030870D] hover:text-blue-700 ${isActive("/dashboard")
            ? "text-blue-700 border-l-2 border-blue-700"
            : "text-gray-700 hover:border-l-4 hover:border-blue-700"
            }`}
          onClick={handleClick}
        >
          <MdOutlineDashboard className="w-5 h-5 mr-3" />
          <span>Dashboard</span>
        </Link>
        <Link
          href="/member"
          className={`flex items-center px-4 py-3 rounded-r-lg hover:bg-[#0030870D] hover:text-blue-700 ${isActive("/member")
            ? "text-blue-700 bg-[#0030870D] border-l-2 border-blue-700"
            : "text-gray-700 hover:border-l-4 hover:border-blue-700"
            }`}
          onClick={handleClick}
        >
          <FiUsers className="w-5 h-5 mr-3" />
          <span>All Members</span>
        </Link>
        <Link
          href="/alldivision"
          className={`flex items-center px-4 py-3 rounded-r-lg hover:bg-[#0030870D] hover:text-blue-700 ${isActive("/alldivision")
            ? "text-blue-700 border-l-4 border-blue-700"
            : "text-gray-700 hover:border-l-4 hover:border-blue-700"
            }`}
          onClick={handleClick}
        >
          <FiLayers className="w-5 h-5 mr-3" />
          <span>All Divisions</span>
        </Link>
        <Link
          href="/attendance"
          className={`flex items-center px-4 py-3 rounded-r-lg hover:bg-[#0030870D] hover:text-blue-700 ${isActive("/attendance")
            ? "text-blue-700 bg-blue-50 border-l-4 border-blue-700"
            : "text-gray-700 hover:border-l-4 hover:border-blue-700"
            }`}
          onClick={handleClick}
        >
          <LuCalendarCheck className="w-5 h-5 mr-3" />
          <span>Attendance</span>
        </Link>
        <Link
          href="/session"
          className={`flex items-center px-4 py-3 rounded-r-lg hover:bg-[#0030870D] hover:text-blue-700 ${isActive("/sessions")
            ? "text-blue-700 bg-blue-50 border-l-4 border-blue-700"
            : "text-gray-700 hover:border-l-4 hover:border-blue-700"
            }`}
          onClick={handleClick}
        >
          <LuClock10 className="w-5 h-5 mr-3" />
          <span>Sessions & Events</span>
        </Link>
        <Link
          href="/resources"
          className={`flex items-center px-4 py-3 rounded-r-lg hover:bg-[#0030870D] hover:text-blue-700 ${isActive("/resources")
            ? "text-blue-700 bg-blue-50 border-l-4 border-blue-700"
            : "text-gray-700 hover:border-l-4 hover:border-blue-700"
            }`}
          onClick={handleClick}
        >
          <IoFolderOutline className="w-5 h-5 mr-3" />
          <span>Resources</span>
        </Link>
        <Link
          href="/profile"
          className={`flex items-center px-4 py-3 rounded-r-lg hover:bg-[#0030870D] hover:text-blue-700 ${isActive("/profile")
            ? "text-blue-700 bg-blue-50 border-l-4 border-blue-700"
            : "text-gray-700 hover:border-l-4 hover:border-blue-700"
            }`}
          onClick={handleClick}
        >
          <HiOutlineUsers className="w-5 h-5 mr-3" />
          <span>Profile</span>
        </Link>

        <Link
          href="/administration"
          className={`flex items-center px-4 py-3 rounded-r-lg hover:bg-[#0030870D] hover:text-blue-700 ${isActive("/profile")
            ? "text-blue-700 bg-blue-50 border-l-4 border-blue-700"
            : "text-gray-700 hover:border-l-4 hover:border-blue-700"
            }`}
          onClick={handleClick}
        >
          <HiAdjustments className="w-5 h-5 mr-3" />
          <span>Administration</span>
        </Link>

        <Link
          href="/settings"
          className={`flex items-center px-4 py-3 rounded-r-lg hover:bg-[#0030870D] hover:text-blue-700 ${isActive("/settings")
            ? "text-blue-700 bg-blue-50 border-l-4 border-blue-700"
            : "text-gray-700 hover:border-l-4 hover:border-blue-700"
            }`}
          onClick={handleClick}
        >
          <FiSettings className="w-5 h-5 mr-3" />
          <span>Settings</span>
        </Link>
      </nav>
    </div>
  );
}
export default SidebarItem;

