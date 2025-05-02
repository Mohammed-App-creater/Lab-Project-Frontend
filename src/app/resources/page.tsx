

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
          <div className="max-w-5xl mx-4 p-6 border rounded-lg ">
            <ResourceManagement />
          </div>
        </div>
      </div>
    </div>
  );
}
