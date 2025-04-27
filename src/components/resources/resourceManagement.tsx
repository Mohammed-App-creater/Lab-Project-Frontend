"use client"

import { useState } from "react"
import DivisionCard from "@/components/resources/divisionCard"
import AddResourceModal from "@/components/resources/addResourceModal"

export interface Resource {
  name: string
  url: string
}

export interface Division {
  title: string
  description: string
  resources: Resource[]
}

export default function ResourceManagement() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [currentDivision, setCurrentDivision] = useState("")
  const [newResourceName, setNewResourceName] = useState("")
  const [newResourceUrl, setNewResourceUrl] = useState("")

  const [divisions, setDivisions] = useState<Division[]>([
    {
      title: "CPD",
      description: "Useful resources and progress sheet for the CPD division.",
      resources: [
        {
          name: "Codeforces Community Course",
          url: "https://codeforces.com/edu/course/3",
        },
        {
          name: "Roadmap To Master Data Structure",
          url: "https://workspace.google.com/products/sheets/",
        },
        {
          name: "Progress Sheet",
          url: "https://codeforces.com/edu/course/5",
        },
      ],
    },
    {
      title: "Dev Division",
      description: "Useful resources and progress sheet for the Dev division.",
      resources: [],
    },
  ])

  const handleAddResource = (division: string) => {
    setCurrentDivision(division)
    setShowAddModal(true)
  }

  const handleSaveResource = () => {
    if (!newResourceName || !newResourceUrl) return

    setDivisions(
      divisions.map((div) => {
        if (div.title === currentDivision) {
          return {
            ...div,
            resources: [...div.resources, { name: newResourceName, url: newResourceUrl }],
          }
        }
        return div
      }),
    )

    
    setNewResourceName("")
    setNewResourceUrl("")
    setShowAddModal(false)
  }

  return (
    <>
      {divisions.map((division, index) => (
        <DivisionCard
          key={index}
          title={division.title}
          description={division.description}
          resources={division.resources}
          onAddResource={handleAddResource}
        />
      ))}

      <AddResourceModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        resourceName={newResourceName}
        resourceUrl={newResourceUrl}
        onResourceNameChange={setNewResourceName}
        onResourceUrlChange={setNewResourceUrl}
        onSave={handleSaveResource}
      />
    </>
  )
}
