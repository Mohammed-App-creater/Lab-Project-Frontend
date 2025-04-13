import React from 'react'
import SidebarItem from './sidebar.item'
import { Card, CardContent } from "@/components/ui/card"
import DarkLight from './dark.light'


function SidebarCard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
        <Card className="w-60 bg-gray-100 p-4 hidden md:flex flex-col m-2">
      <SidebarItem />
      <DarkLight />
      </Card>
    </div>
    
  )
}
export default SidebarCard
