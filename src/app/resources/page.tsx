// "use client"

// import Header from "@/components/global/header/header"
// import SidebarCard from "@/components/global/sidebar/sidebar.card"
// import ResourceManagement from "@/components/resources/resourceManagement"

// export default function Page() {
//   return (
      
//     <div className="flex flex-col md:flex-row gap-2">
//       <SidebarCard />
//       <div className="flex-1">
//         <div className="flex items-center justify-between py-4 px-6 w-full">
//       <Header /></div></div>
//     <div className="container mx-auto py-8 px-4 max-w-5xl">
     
//       <ResourceManagement />
//     </div></div>
//   )
// }
"use client";

import Header from "@/components/global/header/header";
import SidebarCard from "@/components/global/sidebar/sidebar.card";
import ResourceManagement from "@/components/resources/resourceManagement";

export default function Page() {
  return (
    <div className="flex min-h-screen">
      <div className="w-[250px] hidden md:block ">
        <SidebarCard />
      </div>

      <div className="flex flex-col ">
        <div className="px-3 py-3">
          <Header />
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto p-6 border rounded-lg ">
            <ResourceManagement />
          </div>
        </div>
      </div>
    </div>
  );
}
