"use client";

import Link from 'next/link';
import { FiLayers, FiSettings, FiUsers } from 'react-icons/fi';
import { MdOutlineAdminPanelSettings, MdOutlineDashboard } from 'react-icons/md';
import { LuCalendarCheck, LuClock10 } from "react-icons/lu";
import { HiOutlineUsers } from "react-icons/hi2";
import { IoFolderOutline } from "react-icons/io5";
import { usePathname } from 'next/navigation';
import DarkLight from './dark.light';

function SidebarItem() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className='flex flex-col justify-between h-full'>
      {/* Logo Section */}
      <div>
      <div className="mb-3">
        <Link href="/" className="flex items-center">
          <div className="text-blue-700 font-bold text-xl flex items-center">
            <img className="w-7 h-10" src="Vector.svg" alt="Logo Part 1" />
            <img className="w-7 h-10 -ml-3" src="Vector1.svg" alt="Logo Part 2" />
            <h1 className="hidden md:block font-bold ml-4">CSEC ASTU</h1>
          </div>
        </Link>
      </div>

      {/* Navigation Section */}
      <nav className="flex flex-col space-y-1">
        <Link
          href="/dashboard"
          className={`flex items-center px-3 py-2 rounded-r-lg hover:bg-[#0030870D] hover:text-blue-700 ${
            isActive('/dashboard')
              ? 'text-blue-700 border-l-2 border-blue-700'
              : 'text-gray-700 hover:border-l-4 hover:border-blue-700'
          }`}
        >
          <MdOutlineDashboard className="w-5 h-5 md:mr-3" />
          <p className="hidden md:block font-[16px]">Dashboard</p>
        </Link>

        <Link
          href="/member"
          className={`flex items-center px-3 py-2 rounded-r-lg hover:bg-[#0030870D] hover:text-blue-700 ${
            isActive('/member')
              ? 'text-blue-700 bg-[#0030870D] border-l-2 border-blue-700'
              : 'text-gray-700 hover:border-l-4 hover:border-blue-700'
          }`}
        >
          <FiUsers className="w-5 h-5 md:mr-3" />
          <p className="hidden md:block text-[16px]">All Members</p>
        </Link>

        <Link
          href="/alldivision"
          className={`flex items-center px-3 py-2 rounded-r-lg hover:bg-[#0030870D] hover:text-blue-700 ${
            isActive('/alldivision')
              ? 'text-blue-700 border-l-4 border-blue-700'
              : 'text-gray-700 hover:border-l-4 hover:border-blue-700'
          }`}
        >
          <FiLayers className="w-5 h-5 md:mr-3" />
          <p className="hidden md:block text-[16px]">All Divisions</p>
        </Link>

        <Link
          href="/attendance"
          className={`flex items-center px-3 py-2 rounded-r-lg hover:bg-[#0030870D] hover:text-blue-700 ${
            isActive('/attendance')
              ? 'text-blue-700 bg-blue-50 border-l-4 border-blue-700'
              : 'text-gray-700 hover:border-l-4 hover:border-blue-700'
          }`}
        >
          <LuCalendarCheck className="w-5 h-5 md:mr-3" />
          <p className="hidden md:block">Attendance</p>
        </Link>

        <Link
          href="/session"
          className={`flex items-center px-3 py-2 rounded-r-lg hover:bg-[#0030870D] hover:text-blue-700 ${
            isActive('/sessions')
              ? 'text-blue-700 bg-blue-50 border-l-4 border-blue-700'
              : 'text-gray-700 hover:border-l-4 hover:border-blue-700'
          }`}
        >
          <LuClock10 className="w-5 h-5 md:mr-3" />
          <p className="hidden md:block">Sessions & Events</p>
        </Link>

        <Link
          href="/resources"
          className={`flex items-center px-3 py-2 rounded-r-lg hover:bg-[#0030870D] hover:text-blue-700 ${
            isActive('/resources')
              ? 'text-blue-700 bg-blue-50 border-l-4 border-blue-700'
              : 'text-gray-700 hover:border-l-4 hover:border-blue-700'
          }`}
        >
          <IoFolderOutline className="w-5 h-5 md:mr-3" />
          <p className="hidden md:block">Resources</p>
        </Link>

        <Link
          href="/profile"
          className={`flex items-center px-3 py-2 rounded-r-lg hover:bg-[#0030870D] hover:text-blue-700 ${
            isActive('/profile')
              ? 'text-blue-700 bg-blue-50 border-l-4 border-blue-700'
              : 'text-gray-700 hover:border-l-4 hover:border-blue-700'
          }`}
        >
          <HiOutlineUsers className="w-5 h-5 md:mr-3" />
          <p className="hidden md:block">Profile</p>
          </Link>
          <Link
            href="/administration"
            className={`flex items-center px-3 py-2 rounded-r-lg hover:bg-[#0030870D] hover:text-blue-700 ${
              isActive('/administration')
                ? 'text-blue-700 bg-blue-50 border-l-4 border-blue-700'
                : 'text-gray-700 hover:border-l-4 hover:border-blue-700'
            }`}
          >
            <MdOutlineAdminPanelSettings className="w-5 h-5 md:mr-3" />
            <p className="hidden md:block">Administration</p>
          </Link>
        <Link
          href="/settings"
          className={`flex items-center mb-1 px-3 py-2 rounded-r-lg hover:bg-[#0030870D] hover:text-blue-700 ${
            isActive('/settings')
              ? 'text-blue-700 bg-blue-50 border-l-4 border-blue-700'
              : 'text-gray-700 hover:border-l-4 hover:border-blue-700'
          }`}
        >
          <FiSettings className="w-5 h-5 md:mr-3" />
          <p className="hidden md:block">Settings</p>
        </Link>
      </nav>
    </div>
    <DarkLight />
    </div>
  );
}

export default SidebarItem;
