

export type AttendanceStatus = "present" | "absent" | "excused"

export type data = {
  id: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  gender: "Male" | "Female" | "Other";
  email: string;
  phone_number: string;
  telegramUserName: string | null;
  bio: string | null;
  berthDate: string | null;
  profileImageUrl: string | null;
  clubStatus: "Active" | "Inactive" | string; // Add other possible statuses if known
  specialty: string | null;
  cvUrl: string | null;
  lastSeen: string;
  roleId: string;
  Role: {
    id: string;
    name: string;
  };
  universityInfo: {
    currentYear: number;
    universityId: string;
    status: "onCampus" | "offCampus" | string; // Add other possible statuses if known
    expectedGraduationYear: number;
  };
};

export type Member = {
  data: data[]
  limit: string;
  page: string;
  total: string,
  totalPages: string,
}

export type Group = {
  id: string
  name: string
  members: Member
}

export type Session = {
  id: string
  title: string
  description: string
  date: string
  status: "ended" | "planned"
  groups: Group[]
  timeSlots: SessionTimeSlot[]
  tags: string[]
}

export type SessionTimeSlot = {
  id: string;
  sessionId: string | null;
  date: Date;
  startTime: Date;
  endTime: Date;
  status: 'Ended' | 'Planned' | 'Ongoing' | 'Cancelled';
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
export interface TeamMember {
  id: number
  name: string
  avatar: string
  division: string
  role: string
  initials: string
}