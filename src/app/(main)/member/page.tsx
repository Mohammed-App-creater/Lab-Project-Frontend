"use client"


// import AddNewMemberCard from "@/components/divisions/AddNewMemberCard"
import AddNewMember from "@/components/member/add.member.card"
import MemberTable from "@/components/member/member.table"

import { useState } from "react"
import MemberTable from "@/components/member/member.table"

export default function MemberPage() {

  const [showForm, setShowForm] = useState(false)

  return (
    <div className="w-full min-h-screen p-4 md:p-6">
      {/* Apply blur when modal is open */}
      <div className={`${showForm ? "blur-sm pointer-events-none select-none" : ""}`}>
        <MemberTable
          onAddMember={() => setShowForm(true)} userRole={"admin"}        />
      </div>

      {/* Modal Form */}
      {showForm &&<AddNewMember onCancel={() => setShowForm(false)} />}
    </div>
  )
}
