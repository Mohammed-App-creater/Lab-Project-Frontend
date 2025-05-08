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
    <div className="mb-4 w-full">
      <div className="bg-[#0067FF99] rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row justify-between relative overflow-hidden">
        <div className="flex flex-col px-4 gap-4 sm:gap-6 z-10">
          <h3 className="font-bold text-xl sm:text-2xl ">{title}</h3>
          <p className="w-full sm:w-11/12 text-lg sm:text-xl text-wrap ">{description}</p>

          <Button variant="default" className="bg-blue-900 w-full sm:w-[178px] h-[40px] sm:h-[48px] py-2 sm:py-5 text-sm hover:bg-blue-800 text-white" onClick={onAddToCalendar}>
            <CalendarPlus className="mr-2" />
            Add to calendar
          </Button>
        </div>

        {showMembers && (
          <div className="absolute top-4 sm:top-8 right-4 sm:right-5 z-20">
            <Badge className="bg-[#F45B69] hover:bg-red-600 py-1 px-4 text-sm font-light text-white">{membersLabel}</Badge>
          </div>
        )}

        <div className="absolute right-[-10px] sm:right-[-5px] bottom-[-10px] sm:bottom-[-15px] z-0 overflow-hidden mr-22 mb-10">
          <Image
            src="amico.svg"
            alt="Calendar illustration"
            width={160}
            height={160}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  )
}