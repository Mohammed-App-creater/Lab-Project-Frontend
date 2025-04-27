"use client"

import { User, FileText, BookOpen } from "lucide-react"
import { TabType } from "@/app/profile/page"
interface ProfileTabsProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

export default function ProfileTabs({ activeTab, onTabChange }: ProfileTabsProps) {
  return (
    <div className="flex border-b">
      <button
        className={`flex items-center px-4 py-2 border-b-2 ${
          activeTab === "required"
            ? "border-blue-800 text-blue-800"
            : "border-transparent text-gray-600 hover:text-gray-800"
        }`}
        onClick={() => onTabChange("required")}
      >
        <User className="h-4 w-4 mr-2" />
        <span className="font-medium">Required Information</span>
      </button>

      <button
        className={`flex items-center px-4 py-2 border-b-2 ${
          activeTab === "optional"
            ? "border-blue-800 text-blue-800"
            : "border-transparent text-gray-600 hover:text-gray-800"
        }`}
        onClick={() => onTabChange("optional")}
      >
        <FileText className="h-4 w-4 mr-2" />
        <span className="font-medium">Optional Information</span>
      </button>

      <button
        className={`flex items-center px-4 py-2 border-b-2 ${
          activeTab === "resources"
            ? "border-blue-800 text-blue-800"
            : "border-transparent text-gray-600 hover:text-gray-800"
        }`}
        onClick={() => onTabChange("resources")}
      >
        <BookOpen className="h-4 w-4 mr-2" />
        <span className="font-medium">Resources</span>
      </button>
    </div>
  )
}
