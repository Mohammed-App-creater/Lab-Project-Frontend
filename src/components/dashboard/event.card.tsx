"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarPlus } from "lucide-react"

interface EventCardProps {
  title?: string
  description?: string
  showMembers?: boolean
  membersLabel?: string
  onAddToCalendar?: () => void
}

export default function EventCard({
  title = "Upcoming Event",
  description = "Cross-division knowledge-sharing",
  showMembers = true,
  membersLabel = "Members",
  onAddToCalendar = () => console.log("Added to calendar"),
}: EventCardProps) {
  return (
    <div className="ml-3 w-[654px]">
      <div className="bg-[#0067FF99] rounded-xl p-5 flex justify-between relative overflow-hidden h-[230px]">
        <div className="space-y-4 z-10">
          <h3 className="font-medium text-lg text-[#16151C]">{title}</h3>
          <p className="text-[#16151C] font-normal">{description}</p>

          <Button variant="default" className="bg-[#003087] hover:bg-blue-800 text-[#FFFFFF] mt-8" onClick={onAddToCalendar}>
            Add to calendar
          </Button>
        </div>

        {showMembers && (
          <div className="absolute top-3 right-3 z-20">
            <Badge className="bg-[#F45B69] hover:bg-red-600 text-white w-[92px] h-[25px]">{membersLabel}</Badge>
          </div>
        )}

        <div className="absolute right-26 bottom-18 z-0">
          <Image
            src="amico.svg"
            alt="Calendar illustration"
            width={120}
            height={120}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  )
}
