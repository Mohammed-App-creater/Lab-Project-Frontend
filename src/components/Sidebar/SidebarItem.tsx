import React from 'react'
import {
    FiLayers,
    FiSettings,
    FiSun,
    FiUsers
  } from 'react-icons/fi';
  import { MdOutlineDashboard } from 'react-icons/md';
  import { LuCalendarCheck } from "react-icons/lu";
  import { LuClock10 } from "react-icons/lu";
  import { HiOutlineUsers } from "react-icons/hi2";
  import { IoFolderOutline } from "react-icons/io5";
  import { LuSettings2 } from "react-icons/lu";
  import { GoMoon } from "react-icons/go";
  import { Button, Link } from "@chakra-ui/react";

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: <MdOutlineDashboard /> },
    { name: 'All Members', href: '/members', icon: <FiUsers /> },
    { name: 'All Divisions', href: '/divisions', icon: <FiLayers /> },
    { name: 'Attendances', href: '/attendances', icon: <LuCalendarCheck /> },
    { name: 'Seasons & Events', href: '/events', icon: <LuClock10 /> },
    { name: 'Resources', href: '/resources', icon: <IoFolderOutline /> },
    { name: 'Profile', href: '/profile', icon: <HiOutlineUsers /> },
    { name: 'Administration', href: '/admin', icon: <LuSettings2 /> },
    { name: 'Settings', href: '/settings', icon: <FiSettings /> },
  ];
  
function SidebarItem() {
  return (
    <div className="w-full"> 
      <div className="flex flex-col gap-4 mt-3">
      </div>
      <div className="flex-1">
        <nav>
          <ul className="space-y-1 w-full">
            {navItems.map((item) => (
              <li key={item.href} className="w-full">
                <Button 
                  width="full"
                  justifyContent="flex-start"
                  pl={4}
                  py={4}
                  borderLeft="2px solid transparent"
                  borderRadius="none"
                  variant="ghost" 
                  fontFamily="body"
                  _hover={{
                    bg: '#0030870D',
                    color: '#003087',
                    borderLeft: '2px solid #003087'
                  }}
                >
                {item.icon}
                  {item.name}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default SidebarItem