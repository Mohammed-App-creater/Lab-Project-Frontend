import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import type { Role } from "@/lib/types"

interface RolesViewProps {
  roles: Role[]
}

export default function RolesView({ roles }: RolesViewProps) {
  return (
    <div className="space-y-4">
      {roles.map((role) => (
        <div key={role.id} className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <Badge
                variant={role.status === "Active" ? "default" : "destructive"}
                className={`${
                  role.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                } hover:bg-opacity-80`}
              >
                {role.status}
              </Badge>
              <span className="font-medium">{role.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Pencil className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Permissions</p>
            <div className="flex flex-wrap gap-2">
              {role.permissions.map((permission) => (
                <Badge key={permission} variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                  {permission}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
