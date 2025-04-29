"use client"

import { useState } from "react"
import MemberTable from "@/components/member/member.table"

export default function MembersPage() {
  // You can determine user role based on authentication in a real app
  const userRole = "admin" // or "manager" or "viewer"
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">All Members</h1>
          <p className="text-sm text-gray-500">Manage your team members</p>
        </div>
      </div>
      
      <MemberTable userRole={userRole} />
    </div>
  )
}
