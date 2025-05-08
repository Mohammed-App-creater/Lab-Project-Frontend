"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { CiSearch, CiLogout, CiUser } from "react-icons/ci"
import { HiOutlineBell } from "react-icons/hi2"
import { IoChevronDownOutline } from "react-icons/io5"
import { Menu } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import type { PublicUserDTO } from "@/type/user"
import { useIsMobile } from "@/components/ui/use-mobile"

interface HeaderProps {
  onMenuClick?: () => void
}

function Header({ onMenuClick }: HeaderProps) {
  const isMobile = useIsMobile()
  const userData: PublicUserDTO | null = typeof window !== 'undefined' && localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
  }

  const Greeting = (): string => {
    const currentHour = new Date().getHours()
    if (currentHour < 12) return "Good Morning"
    if (currentHour < 18) return "Good Afternoon"
    return "Good Evening"
  }

  return (
    <header className="w-full">
      <div className="container mx-auto px-8 py-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Left - Menu button and Greeting */}
          <div className="flex items-center gap-3">
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={onMenuClick} className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            )}
            <div>
              <h1 className="text-xl font-semibold">Hello {userData?.firstName} 👋🏻</h1>
              <p className="text-sm text-muted-foreground">{Greeting()}</p>
            </div>
          </div>

          {/* Right - Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            {/* Search */}
            <div className="relative w-full sm:w-auto md:w-64">
              <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search" 
                className="w-full pl-10 pr-4 py-2 text-sm bg-background/50" 
              />
            </div>

            <div className="flex items-center gap-2">
              {/* Bell Icon */}
              <Button variant="outline" size="icon" className="relative p-2">
                <HiOutlineBell className="h-6 w-6" />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
              </Button>

              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2 h-[50px] px-3">
                    <Avatar className="w-8 h-8 rounded-sm">
                      <AvatarImage src="profile.svg" alt={`${userData?.firstName ?? ""} ${userData?.lastName ?? ""}`} />
                      <AvatarFallback>HA</AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:flex flex-col text-left text-xs">
                      <span className="font-semibold text-sm">{userData?.firstName}</span>
                      <span className="text-muted-foreground">{userData?.role?.name ?? "Trainee"}</span>
                    </div>
                    <IoChevronDownOutline className="w-4 h-4 text-muted-foreground hidden sm:block" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <Link href="/member/profile">
                    <DropdownMenuItem>
                      <CiUser className="mr-2" /> My Profile
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/login" onClick={handleLogout}>
                    <DropdownMenuItem className="text-red-500">
                      <CiLogout className="text-red-500 mr-2" /> Logout
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
