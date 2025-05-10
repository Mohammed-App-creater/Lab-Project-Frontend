// import type React from "react"
// import type { Metadata } from "next"
// import SidebarCard from "@/components/global/sidebar/sidebar.card"
// import Header from "@/components/global/header/header"
// import { Toaster } from "@/components/ui/toaster"
// import DarkLight from "@/components/global/sidebar/dark.light"

// export const metadata: Metadata = {
//   title: "CSEC ASTU Portal",
//   description: "Computer Science and Engineering Club at Adama Science and Technology University",
// }

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <>
//       <div className="min-h-screen flex relative">
//         <div className="min-h-screen">
//           <div className="fixed top-0 left-0 z-40">
//             <SidebarCard />
//           </div>

//           <div className="ml-64">
//             <div>
//               <Header />
//             </div>

//             <div>{children}</div>
//           </div>
//         </div>
//       </div>
//       <Toaster />
//     </>
//   )
// }
