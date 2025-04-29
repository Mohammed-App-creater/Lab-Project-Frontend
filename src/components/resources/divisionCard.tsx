"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Plus } from 'lucide-react'
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
  const [isOpen, setIsOpen] = useState(title === "CPD")
  const showAddButton = title === "CPD"

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-gray-500 text-sm">{description}</p>
        </div>
        {showAddButton && (
          <Button 
            variant="default" 
            size="sm" 
            className="bg-blue-800 hover:bg-blue-700 text-white mt-2 sm:mt-0"
            onClick={() => onAddResource(title)}
          >
            <Plus className="h-4 w-4 mr-1" /> Add Resource
          </Button>
        )}
      </div>

      <div className="border rounded-lg bg-white shadow-sm">
        <div 
          className="p-4 flex justify-between items-center cursor-pointer border-b"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h3 className="font-medium">Resources({resources.length})</h3>
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>

        {isOpen && (
          <div>
            {resources.length > 0 ? (
              resources.map((resource, index) => (
                <ResourceCard key={index} name={resource.name} url={resource.url} />
              ))
            ) : (
              <div className="py-3 px-4 text-gray-500">No resources added yet.</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
