"use client"

// import AddNewMemberCard from "@/components/divisions/AddNewMemberCard"
import AddNewMember from "@/components/member/add.member.card"
import MemberTable from "@/components/member/member.table"
import { useState } from "react"
import { useUserStore } from "@/store/userStore" // Assuming this is where userStore is defined

export default function MemberPage() {
  const { user} = useUserStore()
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="relative h-full ">
      {/* Apply blur when modal is open */}
      <div className={`${showForm ? "blur-sm pointer-events-none select-none   " : ""} `}>
        <MemberTable
          onAddMember={() => setShowForm(true)}
        />
      </div>

      {/* Modal Form */}
      {showForm && user?.Role?.name === "admin" && <AddNewMember onCancel={() => setShowForm(false)} />}
    </div>
  )

}
