"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ResourceCard from "@/components/resources/resourseCard";
import type { Resource } from "@/components/resources/resourceManagement";

interface DivisionCardProps {
  title: string;
  description: string;
  resources: Resource[];
  onAddResource: (division: string) => void;
}

export default function DivisionCard({
  title,
  description,
  resources,
  onAddResource,
}: DivisionCardProps) {
  const [isOpen, setIsOpen] = useState(title === "CPD");
  const showAddButton = title === "CPD";

  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-3">
        <div className="space-y-1">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            {title}
          </h2>
          <p className="text-sm text-gray-500 max-w-2xl">{description}</p>
        </div>
        {showAddButton && (
          <Button
            variant="default"
            size="sm"
            className="bg-blue-800 hover:bg-blue-700 text-white w-full sm:w-auto"
            onClick={() => onAddResource(title)}>
            <Plus className="h-4 w-4 mr-1" /> Add Resource
          </Button>
        )}
      </div>

      <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
        <div
          className="p-3 sm:p-4 flex justify-between items-center cursor-pointer border-b hover:bg-gray-50 transition-colors"
          onClick={() => setIsOpen(!isOpen)}>
          <h3 className="font-medium text-gray-900 dark:text-white">
            Resources({resources.length})
          </h3>
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          )}
        </div>

        {isOpen && (
          <div className="divide-y divide-gray-100">
            {resources.length > 0 ? (
              resources.map((resource, index) => (
                <ResourceCard
                  key={index}
                  name={resource.name}
                  url={resource.url}
                />
              ))
            ) : (
              <div className="py-4 px-4 text-sm text-gray-500 text-center dark:text-gray-400">
                No resources added yet.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
