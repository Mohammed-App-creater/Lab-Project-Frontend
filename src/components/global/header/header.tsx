"use client"
import React from 'react'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CiSearch } from "react-icons/ci";
import { HiOutlineBell } from "react-icons/hi2";
import { IoChevronDownOutline } from "react-icons/io5";
import { Input } from "@/components/ui/input";


function Header() {
  return (
    <div>
       <main className="flex-1">
        <header className="bg-white p-4 flex items-center gap-73 ">
          <div>
            <h1 className="text-xl font-semibold">Hello Henok👋🏻</h1>
            <div className="flex items-center text-sm text-gray-400">
              <h3>Good Morning</h3>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search"
                className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-200"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <CiSearch className="w-5 h-5 text-black" />
              </div>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <HiOutlineBell  className="w-5 h-5 text-gray-600 bg-gray-300" />
            </Button>
            <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 p-2 rounded-md border border-gray-200 hover:border-gray-300 transition-colors">
              <Avatar className="w-8 h-8">
                  <AvatarImage src="assets/profileImage.svg" alt="Henok Assefa" />
                  <AvatarFallback>HA</AvatarFallback>
              </Avatar>
            <div className="flex flex-col text-xs text-left">
                 <span className="font-bold">Henok Assefa</span>
                 <span className="text-gray-500">UI/UX DESIGNER</span>
            </div>
                 <IoChevronDownOutline className="w-4 h-4 text-gray-400" />
            </button>
            </div>
          </div>
        </header>
        </main>
    </div>
  )
}

export default Header
