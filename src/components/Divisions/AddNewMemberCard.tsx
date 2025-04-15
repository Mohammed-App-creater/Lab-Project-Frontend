import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AddNewMemberCard() {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-[400px] max-w-[90vw]">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold">Add New Member</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Division" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="data-science">Data Science Division</SelectItem>
                <SelectItem value="development">Development Division</SelectItem>
                <SelectItem value="cpd">CPD Division</SelectItem>
                <SelectItem value="cyber">Cyber Division</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="group-1">Group 1</SelectItem>
                <SelectItem value="group-2">Group 2</SelectItem>
                <SelectItem value="group-3">Group 3</SelectItem>
                <SelectItem value="group-4">Group 4</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Input type="email" placeholder="Enter Email" />
          </div>

          <div className="flex items-center space-x-2">
            <Input type="text" placeholder="Random Password" readOnly className="flex-1" />
            <Button className="bg-blue-900 hover:bg-blue-800 text-white">Generate</Button>
          </div>

          <div className="space-y-2">
            <Input type="text" placeholder="Enter Generated Password" />
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline">Cancel</Button>
            <Button className="bg-blue-900 hover:bg-blue-800 text-white">Invite</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
