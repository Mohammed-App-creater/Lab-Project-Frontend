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
import { PublicUserDTO } from "@/type/user"
import Breadcrumb from "./Breadcrumb";



function Header() {
  const userData: PublicUserDTO | null = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null;
  const handleLogout = () => {
   localStorage.removeItem("user")
   localStorage.removeItem("token") 
  }

  const Greeting = (): string =>{
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
    <header className="flex items-center justify-between py-4  w-full">
      <div>
      <Breadcrumb />
      </div>

      <div className="flex items-center gap-4">
        <div className="relative ">
          <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground" />

          <Input
            type="search"
            placeholder="Search"
            className="w-64 pl-15 pr-4 py-6 text-2xl rounded-sm  bg-slate-"
          />
        </div>

        <Button variant="outline" size="icon" className="relative p-6">
          <HiOutlineBell className="h-8 w-8" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center h-[45px] rounded-md border-[#34495E33] hover:border-gray-300 transition-colors"
            >
              <Avatar className=" w-[40px] h-[40px] rounded-sm">
                <AvatarImage src="profile.svg" alt={`${userData?.firstName ?? ''} ${userData?.lastName ?? ''}`} />
                <AvatarFallback>HA</AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-xs text-left">
                <span className="font-bold text-[16px]">{userData?.firstName}</span>
                <span className="text-muted-foreground front-light text-xs">{userData?.role?.name ? userData.role.name : "Trainee"}</span>
              </div>
              <IoChevronDownOutline className="w-4 h-4 text-[#16151C]" />
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
    </header>
  )
}

export default Header
