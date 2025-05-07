

"use client";

import Header from "@/components/global/header/header";
import SidebarCard from "@/components/global/sidebar/sidebar.card";
import ResourceManagement from "@/components/resources/resourceManagement";

export default function Page() {
  return (
    
      
      <div className="flex flex-col ">

        <div className="flex-1 overflow-y-auto">

          <div className="max-w-5xl mx-4 p-4 border border-[#A2A1A833] rounded-lg ">
            <ResourceManagement />
          </div>
        
      </div>
    </div>
  );
}
