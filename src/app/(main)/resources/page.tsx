"use client";

import Header from "@/components/global/header/header";
import SidebarCard from "@/components/global/sidebar/sidebar.card";
import ResourceManagement from "@/components/resources/resourceManagement";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 overflow-y-auto">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-[#A2A1A833] dark:border-gray-700 p-4 sm:p-6 lg:p-8 shadow-sm dark:shadow-gray-900/20">
            <ResourceManagement />
          </div>
        </div>
      </div>
    </div>
  );
}
