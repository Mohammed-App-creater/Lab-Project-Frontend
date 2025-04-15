import { Search, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Divisions() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input type="text" placeholder="Search" className="pl-8" />
        </div>
        <Button className="bg-blue-700 hover:bg-blue-800 text-white">
          <Plus className="mr-2 h-4 w-4" /> Add Division
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="overflow-hidden">
          <CardHeader className="pb-2 flex flex-row justify-between items-center">
            <CardTitle className="text-lg font-semibold">Data Science Division</CardTitle>
            <Button variant="link" className="text-blue-600 p-0 h-auto">
              View All
            </Button>
          </CardHeader>
          <CardContent className="text-sm text-gray-500 pb-2">10 Groups</CardContent>
          <div className="divide-y">
            {[1, 2, 3, 4].map((groupNum) => (
              <div
                key={`ds-group-${groupNum}`}
                className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
              >
                <div>
                  <div className="font-medium">Group {groupNum}</div>
                  <div className="text-sm text-gray-500">{groupNum === 2 ? 24 : 32} Members</div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            ))}
          </div>
        </Card>
        <Card className="overflow-hidden">
          <CardHeader className="pb-2 flex flex-row justify-between items-center">
            <CardTitle className="text-lg font-semibold">Development Division</CardTitle>
            <Button variant="link" className="text-blue-600 p-0 h-auto">
              View All
            </Button>
          </CardHeader>
          <CardContent className="text-sm text-gray-500 pb-2">10 Groups</CardContent>
          <div className="divide-y">
            {[1, 2, 3, 4].map((groupNum) => (
              <div
                key={`dev-group-${groupNum}`}
                className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
              >
                <div>
                  <div className="font-medium">Group {groupNum}</div>
                  <div className="text-sm text-gray-500">{groupNum === 3 ? 42 : groupNum === 2 ? 24 : 32} Members</div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            ))}
          </div>
        </Card>
        <Card className="overflow-hidden">
          <CardHeader className="pb-2 flex flex-row justify-between items-center">
            <CardTitle className="text-lg font-semibold">CPD Division</CardTitle>
            <Button variant="link" className="text-blue-600 p-0 h-auto">
              View All
            </Button>
          </CardHeader>
          <CardContent className="text-sm text-gray-500 pb-2">5 Groups</CardContent>
          <div className="divide-y">
            {[1, 2, 3, 4].map((groupNum) => (
              <div
                key={`cpd-group-${groupNum}`}
                className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
              >
                <div>
                  <div className="font-medium">Group {groupNum}</div>
                  <div className="text-sm text-gray-500">{groupNum === 2 ? 24 : 32} Members</div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            ))}
          </div>
        </Card>
        <Card className="overflow-hidden">
          <CardHeader className="pb-2 flex flex-row justify-between items-center">
            <CardTitle className="text-lg font-semibold">Cyber Division</CardTitle>
            <Button variant="link" className="text-blue-600 p-0 h-auto">
              View All
            </Button>
          </CardHeader>
          <CardContent className="text-sm text-gray-500 pb-2">10 Members</CardContent>
          <div className="divide-y">
            {[1, 2, 3, 4].map((groupNum) => (
              <div
                key={`cyber-group-${groupNum}`}
                className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
              >
                <div>
                  <div className="font-medium">Group {groupNum}</div>
                  <div className="text-sm text-gray-500">{groupNum === 2 ? 24 : 32} Members</div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
