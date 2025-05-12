"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { user } from "@/types/user"
import { useQuery } from "@tanstack/react-query"



interface AddHeadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}


async function users() {
  const token = localStorage.getItem("token") || ""
  const res = await fetch("api/user/all-users?limit=300&page=1", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
  return res.json()
}

export default function AddHeadDialog({ open, onOpenChange }: AddHeadDialogProps) {
  const { data: headsData, isLoading: headsLoading } = useQuery({
    queryKey: ["heads"],
    queryFn: () => users(),
  })
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Head</DialogTitle>
        </DialogHeader>
          <div className="grid gap-2">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Person" />
              </SelectTrigger>
              <SelectContent>
                {headsLoading && <SelectItem value="loading">Loading...</SelectItem>}
                {headsData?.length === 0 && <SelectItem value="no-data">No Data</SelectItem>}
                { headsData && !headsLoading &&  headsData?.map((user: user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.firstName} {user.middleName} {user.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="bg-blue-700 hover:bg-blue-800">Assign</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
