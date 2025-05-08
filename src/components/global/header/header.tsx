"use client"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { CiSearch, CiLogout, CiUser } from "react-icons/ci";
import { HiOutlineBell } from "react-icons/hi2";
import { IoChevronDownOutline } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link';
import { PublicUserDTO } from "@/types/user"
import Breadcrumb from "./Breadcrumb";
import { useState } from "react";

function Header() {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const userData: PublicUserDTO | null = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null;
  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
  }

  const Greeting = (): string => {
    const currentHour = new Date().getHours()
    if (currentHour < 12) {
      return "Good Morning"
    } else if (currentHour < 18) {
      return "Good Afternoon"
    } else {
      return "Good Evening"
    }
  }
  return (
    <header className="w-full bg-background transition-all duration-200">
      <div className="flex items-center justify-between py-4 px-4 md:px-8 min-h-full w-full">
        {/* Left: Logo/Breadcrumb */}
        <div className="flex items-center flex-shrink-0 w-auto">
          <Breadcrumb />
        </div>

        {/* Center: Search Bar (desktop only) */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="relative w-full max-w-1/2">
            <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-black" />
            <Input
              type="search"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 text-gray-300 rounded-md border border-gray-200"
            />
          </div>
        </div>

        {/* Right: Notification/Profile + Mobile Search Toggle */}
        <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
          {/* Mobile Search Toggle */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-gray-100 focus:outline-none"
            onClick={() => setShowMobileSearch(true)}
            aria-label="Open search"
          >
            <CiSearch className="h-6 w-6 text-black" />
          </button>

          <Button variant="outline" size="icon" className="relative p-2 md:p-3 h-10 w-10">
            <HiOutlineBell className="h-5 w-5 md:h-6 md:w-6" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center h-10 rounded-md border-gray-200 hover:border-gray-300 transition-colors px-2 md:px-3 min-w-[160px] justify-between"
              >
                <Avatar className="w-8 h-8 md:w-10 md:h-10 rounded-sm">
                  <AvatarImage src="profile.svg" alt={`${userData?.firstName ?? ''} ${userData?.lastName ?? ''}`} />
                  <AvatarFallback>HA</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-xs text-left ml-2 flex-1">
                  <span className="font-bold text-xs md:text-sm truncate">{userData?.firstName}</span>
                  <span className="text-muted-foreground front-light text-[10px] md:text-xs truncate">{userData?.role?.name ? userData.role.name : "Trainee"}</span>
                </div>
                <IoChevronDownOutline className="w-4 h-4 text-muted-foreground ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <Link href="/member/profile">
                <DropdownMenuItem>
                  <CiUser /> My Profile
                </DropdownMenuItem>
              </Link>
              <Link onClick={handleLogout} href="/login" >
                <DropdownMenuItem className="text-red-500">
                  <CiLogout className="text-red-500" /> Logout
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {showMobileSearch && (
        <div className="fixed inset-0 z-50 bg-white bg-opacity-95 flex items-start justify-center p-4 md:hidden">
          <div className="relative w-full max-w-md mt-8">
            <Input
              autoFocus
              type="search"
              placeholder="Search"
              className="w-full pl-10 pr-10 py-3 text-base rounded-md border border-gray-200 shadow-lg"
            />
            <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-200"
              onClick={() => setShowMobileSearch(false)}
              aria-label="Close search"
            >
              <span className="text-lg">✕</span>
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
