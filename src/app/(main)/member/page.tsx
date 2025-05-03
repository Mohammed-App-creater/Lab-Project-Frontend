"use client"

// import AddNewMemberCard from "@/components/divisions/AddNewMemberCard"
import AddNewMember from "@/components/member/add.member.card"
import MemberTable from "@/components/member/member.table"
import { useState } from "react"

export default function MemberPage() {

  const [showForm, setShowForm] = useState(false)

  return (
    <div className="relative h-full ">
      {/* Apply blur when modal is open */}
      <div className={`${showForm ? "blur-sm pointer-events-none select-none   " : ""} `}>
        <MemberTable
          onAddMember={() => setShowForm(true)} userRole={"admin"}        />
      </div>

      {/* Modal Form */}
      {showForm &&<AddNewMember onCancel={() => setShowForm(false)} />}
    </div>
  )

}
