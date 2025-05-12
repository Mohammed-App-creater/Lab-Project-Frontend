"use client"

import ResourceManagement from "@/components/resources/resourceManagement"

export default function Page() {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-background rounded-lg shadow-sm border border-border">
            <ResourceManagement />
          </div>
        </div>
      </div>
    </div>
  )
}
