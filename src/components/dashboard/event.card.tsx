"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarPlus } from 'lucide-react'

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
    <div className=" w-[100%] overflow-hidden  xl:mr-6">
  <div className="bg-[#0067FF99] rounded-xl p-4 sm:p-6 flex flex-col md:flex-row md:items-center md:justify-between relative overflow-hidden gap-4">
    
    {/* Content Section */}
    <div className="flex flex-col gap-3 sm:gap-6 w-full md:w-3/4 z-10">
      <h3 className="font-bold text-xl sm:text-2xl">{title}</h3>
      <p className="text-base sm:text-lg">{description}</p>

      <Button
        variant="default"
        className="bg-blue-900 py-3 px-4 text-sm sm:text-base hover:bg-blue-800 text-white w-full sm:w-fit"
        onClick={onAddToCalendar}
      >
        <CalendarPlus className="mr-2" />
        Add to calendar
      </Button>
    </div>

    {/* Badge */}
    {showMembers && (
      <div className="self-start md:self-auto z-20">
        <Badge className="bg-[#F45B69] hover:bg-red-600 py-1 px-3 text-xs sm:text-sm font-light text-white">
          {membersLabel}
        </Badge>
      </div>
    )}

    {/* Image */}
    <div className="relative flex justify-center md:justify-end w-full md:w-auto mt-4 md:mt-0">
      <Image
        src="amico.svg"
        alt="Calendar illustration"
        width={120}
        height={120}
        className="object-contain md:w-[180px] md:h-[180px]"
      />
    </div>
  </div>
</div>

  )
}
