'use client'

import { ExternalLink } from 'lucide-react'
import { resourceLinks } from '@/types/user'

interface ResourcesViewProps {
  resources?: resourceLinks[]
}

export default function ResourcesView({ resources }: ResourcesViewProps) {
  if (!resources || resources.length === 0)
    return <p className="text-sm text-gray-500">No resources available.</p>

  return (
    <div className="w-full max-w-3xl">
      <div className="grid grid-cols-2 gap-x-20 mb-2">
        <p className="text-[#A2A1A8] mb-2">Resource Name</p>
        <p className="text-[#A2A1A8] mb-2">Link</p>
      </div>

      {resources.map((resource, index) => (
        <div key={index} className="grid grid-cols-2 gap-x-20 mb-3">
          <p className="truncate text-sm text-[#16151C] dark:text-white fontweight:300">
            {resource.resourceLinkName}
          </p>
          <a
            href={resource.resourceLinkUrl}
            className="flex items-center justify-between text-sm hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="truncate min-w-0 text-[#16151C] dark:text-white fontweight:300">
              {resource.resourceLinkUrl}
            </span>
            <ExternalLink className="h-[20px] w-[20px] text-black dark:text-white flex-shrink-0 ml-2" />
          </a>
        </div>
      ))}
    </div>
  )
}
