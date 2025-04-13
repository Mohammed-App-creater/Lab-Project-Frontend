import React from 'react'
import { GoMoon } from "react-icons/go";
import { Button } from '@/components/ui/button';
import { FiSun } from 'react-icons/fi';
function DarkLight() {
  return (

      <div className="pt-4 mt-18">
        <div className="flex items-center justify-between">
          <Button variant="default" size="sm" className="bg-blue-900 hover:bg-blue-800 h-10 w-25 px-3">
            <FiSun className="w-4 h-4 mr-2" />
            Light
          </Button>
          <Button variant="ghost" size="sm" className="h-10 w-25 px-3 bg-[#A2A1A80D]">
            <GoMoon className="w-4 h-6 mr-2" />
            Dark
          </Button>
        </div>
    </div>
  )
}

export default DarkLight