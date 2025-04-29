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
