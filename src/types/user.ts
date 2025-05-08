
export type PublicUserDTO = {
    id: string
    firstName: string
    lastName: string
    gender: 'Male' | 'Female' 
    email: string
    phone_number: string
    telegramUserName: string
    profileImageUrl: string | null
    bio?: string | null
    birthDate?: string | null
    clubStatus: 'Active' | 'Inactive' | 'Suspended'
    specialty?: string | null
    cvUrl?: string | null
    lastSeen: string
    role: {
        id: string
        name: string
        status: string
    }
}



export type TabType = "required" | "optional" | "resources";
export type SidebarTabType = "profile" | "attendance" | "progress" | "headsup";

export interface SocialLink {
  id: string;
  userId: string;
  socialLinkName: string;
  socialLinkUrl: string;
  updatedAt: string;
  platform: string;
  url: string;
}

export interface ResourceLink {
  id: string;
  userId: string;
  resourceLinkName: string;
  resourceLinkUrl: string;
  updatedAt: string;
}

export interface User {
  id: string;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  gender?: string;
  email?: string;
  phone_number?: string;
  telegramUserName?: string;
  bio?: string;
  berthDate?: string;
  profileImageUrl?: string;
  clubStatus?: string;
  specialty?: string;
  cvUrl?: string;
  lastSeen?: string;
  role?: string;
  createdAt?: string;
  socialLinks?: SocialLink[];
  resourceLinks?: ResourceLink[];
}

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  joinDate: string;
  profileImage: string;
  mobileNumber: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  expectedGraduationYear: string;
  department: string;
  github: string;
  telegramHandle: string;
  specialization: string;
  mentor: string;
  universityId: string;
  instagramHandle: string;
  linkedinUrl: string;
  codeforces: string;
  leetcode: string;
  cv: string;
  joiningDate: string;
  shortBio: string;
  resourceLinks: ResourceLink[];
}
export interface ResourceLink{
  id: string;
  userId: string;
  resourceLinkName: string;
  resourceLinkUrl: string;
  updatedAt: string;
}
export interface Resource {
  name: string;
  link: string;
}

export interface AttendanceRecord {
  date: string;
  session: string;
  startTime: string;
  endTime: string;
  status: "Present" | "Absent" | "Excused";
}

export interface HeadsUpMessage {
  id: number;
  date: Date;
  message: string;
  read: boolean;
}