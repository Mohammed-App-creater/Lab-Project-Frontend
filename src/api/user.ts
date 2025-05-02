import { User, UserData } from "@/types/user";

const API_BASE_URL = "https://csec-lab-portal-backend.onrender.com/api/user";

export const fetchUserProfile = async (userId: string): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/userProfile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }

  return response.json();
};

export const updateUserProfile = async (userId: string, data: Partial<UserData>): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/updateProfile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, ...data }),
  });

  if (!response.ok) {
    throw new Error("Failed to update user profile");
  }

  return response.json();
};

export const mapUserToUserData = (user: User): UserData => ({
  id: user.id || "",
  firstName: user.firstName,
  lastName: user.lastName,
  role: user.clubStatus || "Member",
  joinDate: user.createdAt || "",
  profileImage: user.profileImageUrl || "",
  mobileNumber: user.phone_number || "",
  email: user.email || "",
  dateOfBirth: user.berthDate || "",
  gender: user.gender || "",
  expectedGraduationYear: "",
  department: "",
  github: user.socialLinks?.find((l) => l.socialLinkName === "GitHub")?.socialLinkUrl || "",
  telegramHandle: user.telegramUserName || "",
  specialization: user.specialty || "",
  mentor: "",
  universityId: "",
  instagramHandle: user.socialLinks?.find((l) => l.socialLinkName === "Instagram")?.socialLinkUrl || "",
  linkedinUrl: user.socialLinks?.find((l) => l.socialLinkName === "LinkedIn")?.socialLinkUrl || "",
  codeforces: user.socialLinks?.find((l) => l.socialLinkName === "Codeforces")?.socialLinkUrl || "",
  leetcode: user.socialLinks?.find((l) => l.socialLinkName === "Leetcode")?.socialLinkUrl || "",
  cv: user.cvUrl || "",
  joiningDate: user.createdAt || "",
  shortBio: user.bio || "",
  resourceLinks: user.resourceLinks || [],
});