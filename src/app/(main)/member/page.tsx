"use client"
// import AddNewMemberCard from "@/components/divisions/AddNewMemberCard"
import AddNewMember from "@/components/member/add.member.card"
import MemberTable from "@/components/member/member.table"
import { useState } from "react"


export default function MemberPage() {

  const [showForm, setShowForm] = useState(false)
  const userRole = (["VicePresident", "President", "SuperAdmin", "DivisionHead", "Coordinator", "Member", "Admin"].includes(localStorage.getItem("userRole")!)
    ? localStorage.getItem("userRole")
    : "Member") as "VicePresident" | "President" | "SuperAdmin" | "DivisionHead" | "Coordinator" | "Member" | "Admin";
  return (
    <div className="w-full min-h-screen">
      {/* Apply blur when modal is open */}
      <div className={`${showForm ? "blur-sm pointer-events-none select-none" : ""}`}>
        <MemberTable
          onAddMember={() => setShowForm(true)} userRole={userRole} />
      </div>

      {/* Modal Form */}
      {showForm &&<AddNewMember onCancel={() => setShowForm(false)} />}
    </div>
  )
}
