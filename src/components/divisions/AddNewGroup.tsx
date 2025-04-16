import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function AddGroupDialog() {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-[350px] bg-white shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Add New Group</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input type="text" placeholder="Group Name" className="h-10" />
        </CardContent>
        <CardFooter className="flex justify-between pt-2 pb-6">
          <Button type="button" variant="outline" className="w-24">
            Cancel
          </Button>
          <Button type="button" className="bg-blue-900 hover:bg-blue-800 w-24">
            Add Group
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
