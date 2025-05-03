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

    <div className="mt-2.5 mb-4  w-full ">
      <div className="bg-[#0067FF99] rounded-xl p-6 flex justify-between relative overflow-hidden">
        <div className="flex flex-col px-4 gap-6 z-10">
          <h3 className="font-bold   text-2xl ">{title}</h3>
          <p className=" w-11/12 text-xl  text-wrap ">{description}</p>

          <Button variant="default" className="bg-blue-900 my-5  py-7  text-xl  hover:bg-blue-800 text-white" onClick={onAddToCalendar}>
            <CalendarPlus className="mr-2 " />
            Add to calendar
          </Button>
        </div>

        {showMembers && (
          <div className="absolute top-8  right-15  z-20">
            <Badge className="bg-[#F45B69] hover:bg-red-600 py-1 px-4 text-sm font-light text-white">{membersLabel}</Badge>
          </div>
        )}

        <div className="absolute right-40 bottom-10 z-0">
          <Image
            src="amico.svg"
            alt="Calendar illustration"
            width={180}
            height={180}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  )
}
