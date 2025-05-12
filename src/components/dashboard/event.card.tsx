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
    <div className="w-full overflow-hidden">
      <div className="relative rounded-xl bg-[#0067FF99] p-4 sm:p-6">
        {/* Content Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1 space-y-2 sm:space-y-3">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold">{title}</h3>
            <p className="text-sm sm:text-base text-muted-foreground">{description}</p>

            <Button
              variant="default"
              className="w-full md:w-auto text-sm sm:text-base"
              onClick={onAddToCalendar}
            >
              <CalendarPlus className="mr-2 h-4 w-4" />
              Add to calendar
            </Button>
          </div>

          {/* Badge */}
          {showMembers && (
            <div className="self-start md:self-auto">
              <Badge className="bg-primary hover:bg-primary/90 text-xs sm:text-sm">
                {membersLabel}
              </Badge>
            </div>
          )}

          {/* Image */}
          <div className="relative mt-4 flex justify-center md:mt-0 md:justify-end">
            <Image
              src="amico.svg"
              alt="Calendar illustration"
              width={120}
              height={120}
              className="h-auto w-auto object-contain h-[120px] w-[120px] sm:h-[150px] sm:w-[150px] md:h-[180px] md:w-[180px]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}