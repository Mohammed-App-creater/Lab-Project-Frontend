"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import ResourceCard from "@/components/resources/resourseCard"
import type { Resource } from "@/components/resources/resourceManagement"

interface DivisionCardProps {
  title: string
  description: string
  resources: Resource[]
  onAddResource: (division: string) => void
}

export default function DivisionCard({ title, description, resources, onAddResource }: DivisionCardProps) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="mb-8">
      <div className="flex flex-col space-y-2 mb-3">
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        <div className="flex justify-between items-center">
          <p className="text-sm text-[#A2A1A8]">{description}</p>
          <Button
            variant="default"
            size="sm"
            className="bg-blue-800 hover:bg-blue-700 text-white"
            onClick={() => onAddResource(title)}
          >
            <Plus className="h-4 w-4 mr-1" /> Add Resource
          </Button>
        </div>
      </div>

      <div className="border rounded-lg bg-card shadow-sm overflow-hidden">
        <div
          className="p-4 flex justify-between items-center cursor-pointer border-b hover:bg-accent/50 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h3 className="font-medium text-foreground">Resources({resources.length})</h3>
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </div>

        {isOpen && (
          <div className="divide-y divide-border">
            {resources.length > 0 ? (
              resources.map((resource, index) => <ResourceCard key={index} name={resource.name} url={resource.url} />)
            ) : (
              <div className="py-4 px-4 text-sm text-muted-foreground text-center">No resources added yet.</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
