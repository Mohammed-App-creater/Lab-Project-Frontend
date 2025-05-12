import api from "@/lib/axios";
import { user, AttendanceRecord, HeadsUpMessage, AttendanceRecordDataResponse } from "../../types/user";

const API_BASE_URL = "https://csec-lab-portal-backend.onrender.com/api/user";

export const fetchUserProfile = async (userId: string): Promise<user> => {
  return await api
    .post(
      `api/user/userProfile`,
      {
        userId: userId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
    .then((res) => {
      return res.data as user;
    });
};


export const fetchAttendanceRatio = async (userId: string): Promise<AttendanceRecord> => {
  return await api
    .post(
      `api/attendance/user-attendance-summary`,
      {
        userId: userId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
    .then((res) => {
      return res.data as AttendanceRecord;
    });
}

export const fetchHeadsUpMessages = (userId: string) => {
  return api.post(
    "api/headsup/user-heads-up",
    { userId: userId },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  ).then((res) => res.data as { "headsUps": HeadsUpMessage[] })
}

export const fetchUserAttendance = async (userId: string): Promise<AttendanceRecordDataResponse> => {
  return await api
    .post(
      `api/attendance/user-all-attendance`,
      {
        userId: userId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
    .then((res) => {
      return res.data as AttendanceRecordDataResponse;
    });
};


export const updateUserProfile = async (userId: string, data: Partial<user>): Promise<user> => {
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

