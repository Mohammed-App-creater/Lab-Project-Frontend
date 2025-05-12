"use client"

import { Pencil } from "lucide-react"
import { Card } from "../ui/card"

interface ResourceCardProps {
  name: string
  url: string
}

export default function ResourceCard({ name, url }: ResourceCardProps) {
  return (
    <Card className="py-4 px-4 hover:bg-accent/50 transition-colors rounded-none">
      <div className="flex items-start gap-5">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${name} in new tab`}
          className="text-[#16151CCC] hover:text-foreground mt-1 flex-shrink-0 ml-8"
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
        <div className="min-w-0 flex-1 ">
          <div className="font-medium text-[#16151C]">{name}</div>
          <div className="text-sm text-[#A2A1A8] truncate">{url}</div>
        </div>
        <button
          type="button"
          aria-label={`Edit ${name}`}
          className="text-[#28303F] hover:text-foreground mt-1 flex-shrink-0"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            console.log(`Edit resource: ${name}`)
          }}
        >
          <Pencil className="h-4 w-4" />
        </button>
      </div>
    </Card>
  )
}

