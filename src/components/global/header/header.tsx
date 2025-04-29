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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link';

interface HeaderProps {
  user?: {
    name: string
    role: string
    avatar?: string
  }
}

function Header({ user = { name: "Henok Assefa", role: "UI/UX DESIGNER" } }: HeaderProps) {
  return (
    <header className="flex items-center justify-between py-4 px-6 w-[1030px]">
      <div>
        <h1 className="text-[#16151C] font-bold text-xl">Hello Henok👋🏻</h1>
        <p className="text-sm text-muted-foreground ">Good Morning</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 " />
          <Input
            type="search"
            placeholder="Search"
            className="w-64 pl-10 pr-4 py-2 rounded-sm bg-slate-"
          />
        </div>

        <Button variant="outline" size="icon" className="relative bg-[#34495E1A]">
          <HiOutlineBell className="h-5 w-5"/>
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center h-[45px] rounded-md border-[#34495E33] hover:border-gray-300 transition-colors"
            >
              <Avatar className=" w-[40px] h-[40px] rounded-sm">
                <AvatarImage src="image1.svg" alt="Henok Assefa" />
                <AvatarFallback>HA</AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-xs text-left">
                <span className="font-bold">{user.name}</span>
                <span className="text-muted-foreground">{user.role}</span>
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
            <Link href="/login">
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
