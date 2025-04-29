import React from 'react'
import SidebarItem from './sidebar.item'
import { Card, CardContent } from "@/components/ui/card"
import DarkLight from './dark.light'


function SidebarCard() {
  return (
    <div className="flex max-h-screen p-2.5 ">
        <Card className="w-60 p-4 md:flex flex-col m-1 bg-[#34495E0D]">
      <SidebarItem />
      <DarkLight />
      </Card>
    </div>
    
  )
}
export default SidebarCard
