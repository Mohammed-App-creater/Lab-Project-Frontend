"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Filter, PlusCircle, Shield, LayoutList } from "lucide-react"
import { mockTeamMembers, mockRoles, mockRules,mockMemberRecords } from "@/lib/mock-data"
import AddRoleDialog from "./add-role-dialog"
import HeadsView from "./heads-view"
import RolesView from "./roles-view"
import RulesView from "./rules-view"
import AddHeadDialog from "./add-head-dialog"
import MembersView from "./members-view"


export default function TeamManagementUI() {
  const [activeTab, setActiveTab] = useState("heads")
  const [addHeadOpen, setAddHeadOpen] = useState(false)
  const [addRoleOpen, setAddRoleOpen] = useState(false)
  const [showMembers, setShowMembers] = useState(false)

  if (showMembers) {
    return <MembersView onBack={() => setShowMembers(false)} memberRecords={mockMemberRecords} />
  }

  return (
    <>
      <Card className="border shadow-sm">
        <CardContent className="p-0">
          <div className="flex items-center justify-between border-b p-4">
            <Tabs defaultValue="heads" className="w-auto" onValueChange={setActiveTab}>
              <TabsList className="grid w-auto grid-cols-3 bg-transparent h-auto p-0 gap-2">
                <TabsTrigger
                  value="heads"
                  className={`px-4 py-2 rounded-md data-[state=active]:bg-blue-700 data-[state=active]:text-white ${
                    activeTab === "heads" ? "bg-blue-700 text-white" : "bg-white text-black border"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <PlusCircle className="w-4 h-4" />
                    </div>
                    <span>Heads</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="roles"
                  className={`px-4 py-2 rounded-md data-[state=active]:bg-blue-700 data-[state=active]:text-white ${
                    activeTab === "roles" ? "bg-blue-700 text-white" : "bg-white text-black border"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <Shield className="w-4 h-4" />
                    </div>
                    <span>Roles</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="rules"
                  className={`px-4 py-2 rounded-md data-[state=active]:bg-blue-700 data-[state=active]:text-white ${
                    activeTab === "rules" ? "bg-blue-700 text-white" : "bg-white text-black border"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <LayoutList className="w-4 h-4" />
                    </div>
                    <span>Rules</span>
                  </div>
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex items-center gap-2">
              {activeTab === "heads" && (
                <Button className="bg-blue-700 hover:bg-blue-800" onClick={() => setAddHeadOpen(true)}>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add Head
                </Button>
              )}
              {activeTab === "roles" && (
                <Button className="bg-blue-700 hover:bg-blue-800" onClick={() => setAddRoleOpen(true)}>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add Role
                </Button>
              )}
              {activeTab !== "rules" && (
                <Button variant="outline" size="icon" className="border">
                  <Filter className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="p-4">
            {activeTab === "heads" && <HeadsView teamMembers={mockTeamMembers} />}
            {activeTab === "roles" && <RolesView roles={mockRoles} />}
            {activeTab === "rules" && <RulesView rules={mockRules} onViewMembers={() => setShowMembers(true)} />}
          </div>
        </CardContent>
      </Card>

      <AddHeadDialog open={addHeadOpen} onOpenChange={setAddHeadOpen} />
      <AddRoleDialog open={addRoleOpen} onOpenChange={setAddRoleOpen} />
    </>
  )
}
