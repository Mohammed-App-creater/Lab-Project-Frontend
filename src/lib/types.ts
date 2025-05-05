export type AttendanceStatus = "present" | "absent" | "excused"

export type Member = {
  id: string
  name: string
  role: string
  avatar: string
  attendance?: AttendanceStatus
}

export type Group = {
  id: string
  name: string
  members: Member[]
}

export type Session = {
  id: string
  title: string
  description: string
  date: string
  status: "ended" | "planned"
  groups: Group[]
}

export interface TeamMember {
  id: number
  name: string
  avatar: string
  division: string
  role: string
  initials: string
}

export interface Role {
  id: number
  name: string
  status: "Active" | "Inactive"
  permissions: string[]
}

export interface Rule {
  id: number
  name: string
  description: string
  threshold: number
}

export interface MemberRecord {
  id: number
  name: string
  avatar: string
  memberId: string
  division: string
  attendance: "Active" | "Needs Attention"
  year: string
  status: "On Campus" | "Off Campus" | "Withdrawn"
  initials: string
}
