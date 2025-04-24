'use client'
import React, { useEffect, useState } from 'react'
import { GoMoon } from "react-icons/go";
import { Button } from '@/components/ui/button';
import { FiSun } from 'react-icons/fi';


export default function DarkLight() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme")
    if (storedTheme) {
      setTheme(storedTheme === "dark" ? "dark" : "light")
    } else {

      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      setTheme(prefersDark ? "dark" : "light")
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("theme", theme)
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <div className="pb-5 mt-15">  
         <div className="flex items-center justify-between">
            <Button onClick={()=>{setTheme("light")}} variant="default" size="sm" className="bg-blue-900 hover:bg-blue-800 h-10 w-25 px-3">
              <FiSun className="w-4 h-4 mr-2" />
              Light
            </Button>
            <Button onClick={()=>{setTheme("dark")}} variant="ghost" size="sm" className="h-10 w-25 px-3 bg-[#A2A1A80D]">
              <GoMoon className="w-4 h-6 mr-2" />
              Dark
            </Button>
          </div>
     </div>
  )
}


