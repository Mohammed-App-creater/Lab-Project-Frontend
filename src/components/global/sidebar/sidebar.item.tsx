"use client"
import Link from 'next/link';
import { FiLayers,FiSettings,FiSun,FiUsers } from 'react-icons/fi';
import { MdOutlineDashboard } from 'react-icons/md';
import { LuCalendarCheck } from "react-icons/lu";
import { LuClock10 } from "react-icons/lu";
import { HiOutlineUsers } from "react-icons/hi2";
import { IoFolderOutline } from "react-icons/io5";
import { GoMoon } from "react-icons/go";
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

function SidebarItem() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div>
      <div className="mb-8">
        <Link href="/" className="flex items-center">
          <div className="text-blue-700 font-bold text-xl flex items-center">
            <img className='w-7 h-10' src="Vector.svg"/>
            <img className='w-7 h-10 -ml-3' src="Vector1.svg"/>
            <h1 className="hidden md:block text-2xl font-bold ml-4">CSEC ASTU</h1>
          </div>
        </Link>
      </div>

      <nav className="flex flex-col  gap-3 space-y-1">
        <Link 
          href="/dashboard" 
          className={`flex items-center px-3 py-2  rounded-r-lg hover:bg-[#0030870D] hover:text-blue-700 ${
            isActive('/dashboard') 
              ? 'text-blue-700 border-l-2 border-blue-700' 
              : 'text-gray-700 hover:border-l-4 hover:border-blue-700'
          }`}
        >
          <MdOutlineDashboard className="w-5 h-5 mr-3" />
          <p className='hidden md:block'>Dashboard</p>
        </Link>
        <Link
          href="/member"
          className={`flex items-center px-3 py-2 rounded-r-lg hover:bg-[#0030870D] hover:text-blue-700 ${
            isActive('/member') 
              ? 'text-blue-700 bg-[#0030870D] border-l-2 border-blue-700' 
              : 'text-gray-700 hover:border-l-4 hover:border-blue-700'
          }`}
        >
          <FiUsers className="w-5 h-5 mr-3" />
          All Members
        </Link>
        <Link 
          href="/alldivision" 
          className={`flex items-center px-3 py-2 rounded-r-lg hover:bg-[#0030870D] hover:text-blue-700 ${
            isActive('/alldivision') 
              ? 'text-blue-700 border-l-4 border-blue-700' 
              : 'text-gray-700 hover:border-l-4 hover:border-blue-700'
          }`}
        >
          <FiLayers className="w-5 h-5 mr-3" />
          All Divisions
        </Link>
        <Link 
          href="/attendance" 
          className={`flex items-center px-3 py-2 rounded-r-lg hover:bg-[#0030870D] hover:text-blue-700 ${
            isActive('/attendance') 
              ? 'text-blue-700 bg-blue-50 border-l-4 border-blue-700' 
              : 'text-gray-700 hover:border-l-4 hover:border-blue-700'
          }`}
        >
          <LuCalendarCheck className="w-5 h-5 mr-3" />
          Attendance
        </Link>
        <Link 
          href="/session" 
          className={`flex items-center px-3 py-2 rounded-r-lg hover:bg-[#0030870D] hover:text-blue-700 ${
            isActive('/sessions') 
              ? 'text-blue-700 bg-blue-50 border-l-4 border-blue-700' 
              : 'text-gray-700 hover:border-l-4 hover:border-blue-700'
          }`}
        >
          <LuClock10 className="w-5 h-5 mr-3" />
          Sessions & Events
        </Link>
        <Link 
          href="/resources" 
          className={`flex items-center px-3 py-2 rounded-r-lg hover:bg-[#0030870D] hover:text-blue-700 ${
            isActive('/resources') 
              ? 'text-blue-700 bg-blue-50 border-l-4 border-blue-700' 
              : 'text-gray-700 hover:border-l-4 hover:border-blue-700'
          }`}
        >
          <IoFolderOutline className="w-5 h-5 mr-3" />
          Resources
        </Link>
        <Link 
          href="/profile" 
          className={`flex items-center px-3 py-2 rounded-r-lg hover:bg-[#0030870D] hover:text-blue-700 ${
            isActive('/profile') 
              ? 'text-blue-700 bg-blue-50 border-l-4 border-blue-700' 
              : 'text-gray-700 hover:border-l-4 hover:border-blue-700'
          }`}
        >
          <HiOutlineUsers className="w-5 h-5 mr-3" />
          Profile
        </Link>
        <Link 
          href="/settings" 
          className={`flex items-center px-3 py-2 rounded-r-lg hover:bg-[#0030870D] hover:text-blue-700 ${
            isActive('/settings') 
              ? 'text-blue-700 bg-blue-50 border-l-4 border-blue-700' 
              : 'text-gray-700 hover:border-l-4 hover:border-blue-700'
          }`}
        >
          <FiSettings className="w-5 h-5 mr-3" />
          Settings
        </Link>
      </nav>
    </div>
  )
}

export default SidebarItem