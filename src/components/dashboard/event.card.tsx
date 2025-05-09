// "use client"

// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { CalendarPlus } from "lucide-react"

// interface EventCardProps {
//   title?: string
//   description?: string
//   showMembers?: boolean
//   membersLabel?: string
//   onAddToCalendar?: () => void
// }

// export default function EventCard({
//   title = "Upcoming Event",
//   description = "Cross-division knowledge-sharing",
//   showMembers = true,
//   membersLabel = "Members",
//   onAddToCalendar = () => console.log("Added to calendar"),
// }: EventCardProps) {
//   return (
//     <div className="mt-2.5 mb-4  w-full ">
//       <div className="bg-[#0067FF99] rounded-xl p-6 flex justify-between relative overflow-hidden">
//         <div className="flex flex-col px-4 gap-6 z-10">
//           <h3 className="font-bold   text-2xl ">{title}</h3>
//           <p className=" w-11/12 text-xl  text-wrap ">{description}</p>

//           <Button variant="default" className="bg-blue-900 w-[178px] h-[48px] my-5 py-5 text-sm hover:bg-blue-800 text-white" onClick={onAddToCalendar}>
//             <CalendarPlus className="mr-2" />
//             Add to calendar
//           </Button>
//         </div>

//         {showMembers && (
//           <div className="absolute top-8  right-5  z-20">
//             <Badge className="bg-[#F45B69] hover:bg-red-600 py-1 px-4 text-sm font-light text-white">{membersLabel}</Badge>
//           </div>
//         )}

//         <div className="absolute right-26 bottom-15 z-0">
//           <Image
//             src="amico.svg"
//             alt="Calendar illustration"
//             width={150}
//             height={150}
//             className="object-contain"
//           />
//         </div>
//       </div>
//     </div>
//   )
// }


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
      <div className="relative rounded-xl bg-[#0067FF99] p-6">
        {/* Content Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1 space-y-3">
            <h3 className="text-xl font-bold md:text-2xl">{title}</h3>
            <p className="text-base text-muted-foreground">{description}</p>

            <Button
            
              variant="default"
              className="w-full md:w-auto"
              onClick={onAddToCalendar}
            >
              <CalendarPlus className="mr-2 h-4 w-4" />
              Add to calendar
            </Button>
          </div>

          {/* Badge */}
          {showMembers && (
            <div className="self-start md:self-auto">
              <Badge className="bg-primary hover:bg-primary/90">
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
              className="h-auto w-auto object-contain md:h-[180px] md:w-[180px]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}