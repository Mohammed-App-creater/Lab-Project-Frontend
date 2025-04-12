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
    <div className="mt-2.5 max-w-md mx-auto">
      <div className="bg-[#0067FF99] rounded-xl p-5 flex justify-between relative overflow-hidden">
        <div className="space-y-4 z-10">
          <h3 className="font-medium text-lg text-blue-950">{title}</h3>
          <p className="text-blue-900 font-medium">{description}</p>

          <Button variant="default" className="bg-blue-900 hover:bg-blue-800 text-white" onClick={onAddToCalendar}>
            <CalendarPlus className="mr-2 h-4 w-4" />
            Add to calendar
          </Button>
        </div>

        {showMembers && (
          <div className="absolute top-3 right-3 z-20">
            <Badge className="bg-red-500 hover:bg-red-600 text-white">{membersLabel}</Badge>
          </div>
        )}

        <div className="absolute right-0 bottom-0 z-0">
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
