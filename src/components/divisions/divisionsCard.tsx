"use client"

import { useState } from "react"
import { Search, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AddNewDivisionUI } from "./AddNewDivision"


export default function Divisions() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="space-y-2 ml-3 inset-shadow-2xs shadow-xl p-3 rounded-2xl">
      <div className="container mx-auto p-2">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input type="text" placeholder="Search" className="pl-8" />
          </div>
          <Button
            onClick={() => setShowModal(true)}
            className="bg-blue-700 hover:bg-blue-800 text-white"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Division
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "Data Science Division", key: "ds", groups: 10 },
            { title: "Development Division", key: "dev", groups: 10 },
            { title: "CPD Division", key: "cpd", groups: 5 },
            { title: "Cyber Division", key: "cyber", groups: 10 }
          ].map((division) => (
            <Card className="overflow-hidden" key={division.key}>
              <CardHeader className="pb-2 flex flex-row justify-between items-center">
                <CardTitle className="text-lg font-semibold">{division.title}</CardTitle>
                <Button variant="link" className="text-blue-600 p-0 h-auto">View All</Button>
              </CardHeader>
              <CardContent className="text-sm text-gray-500 pb-2">
                {division.groups} Groups
              </CardContent>
              <div className="divide-y">
                {[1, 2, 3, 4].map((groupNum) => (
                  <div
                    key={`${division.key}-group-${groupNum}`}
                    className="flex items-center justify-between p-4 hover:bg-[#0036870d] cursor-pointer"
                  >
                    <div>
                      <div className="font-medium">Group {groupNum}</div>
                      <div className="text-sm text-gray-500">
                        {
                          division.key === "dev" && groupNum === 3 ? 42 :
                          groupNum === 2 ? 24 : 32
                        } Members
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Show Modal */}
      {showModal && <AddNewDivisionUI onClose={() => setShowModal(false)} />}
    </div>
  )
}
