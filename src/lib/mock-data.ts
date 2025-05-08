import type { Rule, MemberRecord, TeamMember, Role } from "./types"


export const mockTeamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Darlene Robertson",
    avatar: "/placeholder.svg?height=40&width=40",
    division: "CPD",
    role: "Head",
    initials: "DR",
  },
  {
    id: 2,
    name: "Floyd Miles",
    avatar: "/placeholder.svg?height=40&width=40",
    division: "Development",
    role: "Head",
    initials: "FM",
  },
  {
    id: 3,
    name: "Dianne Russell",
    avatar: "/placeholder.svg?height=40&width=40",
    division: "Cyber",
    role: "Head",
    initials: "DR",
  },
  {
    id: 4,
    name: "Cody Fisher",
    avatar: "/placeholder.svg?height=40&width=40",
    division: "Data Science",
    role: "Head",
    initials: "CF",
  },
  {
    id: 5,
    name: "Jacob Jones",
    avatar: "/placeholder.svg?height=40&width=40",
    division: "All",
    role: "Vice President",
    initials: "JJ",
  },
]

export const mockRoles: Role[] = [
  {
    id: 1,
    name: "Vice President",
    status: "Active",
    permissions: ["Add Members", "Manage Members", "Schedule Sessions", "Create A Division"],
  },
  {
    id: 2,
    name: "Dev Head",
    status: "Active",
    permissions: ["Upload Resources", "Manage Members", "Schedule Sessions", "Mark Attendance"],
  },
  {
    id: 3,
    name: "CBD President",
    status: "Inactive",
    permissions: ["Schedule Sessions", "View All Division"],
  },
]

export const mockRules: Rule[] = [
  {
    id: 1,
    name: "Max Absences",
    description: "Members exceeding this are flagged for review",
    threshold: 4,
  },
  {
    id: 2,
    name: "Warning After",
    description: "Members receive a warning notification after this many absences",
    threshold: 3,
  },
  {
    id: 3,
    name: "Suspend After",
    description: "Member's access suspended",
    threshold: 5,
  },
  {
    id: 4,
    name: "Fire After",
    description: "Member removed from division but can rejoin later",
    threshold: 7,
  },
  {
    id: 5,
    name: "Permanent Restriction",
    description: "Member banned permanently",
    threshold: 0,
  },
]

// Create base member records
const baseMemberRecords: MemberRecord[] = [
  {
    id: 1,
    name: "Darlene Robertson",
    avatar: "/placeholder.svg?height=40&width=40",
    memberId: "UGR/25605/14",
    division: "Design",
    attendance: "Active",
    year: "4th",
    status: "On Campus",
    initials: "DR",
  },
  {
    id: 2,
    name: "Floyd Miles",
    avatar: "/placeholder.svg?height=40&width=40",
    memberId: "UGR/25605/14",
    division: "Development",
    attendance: "Active",
    year: "5th",
    status: "Off Campus",
    initials: "FM",
  },
]

// Generate multiple Cody Fisher entries
const codyFisherEntries = Array(10)
  .fill(null)
  .map((_, index) => ({
    id: 3 + index,
    name: "Cody Fisher",
    avatar: "/placeholder.svg?height=40&width=40",
    memberId: "UGR/25605/14",
    division: "CPD",
    attendance: "Needs Attention" as const,
    year: "3rd",
    status: "Withdrawn" as const,
    initials: "CF",
  }))

export const mockMemberRecords: MemberRecord[] = [...baseMemberRecords, ...codyFisherEntries]