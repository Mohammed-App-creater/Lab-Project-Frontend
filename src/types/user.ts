
export type user = {
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
    createdAt: string;
    updatedAt: string;
    Role: {
        id: string;
        name: string;
    };
    universityInfo: {
        currentYear: number;
        universityId: string;
        status: "onCampus" | "offCampus" | string; // Add other possible statuses if known
        expectedGraduationYear: number;
        major: string;
    };
    socialLinks: socialLinks[];
    resourceLinks: resourceLinks[];
};

export type socialLinks = {
    id: string;
    socialLinkName: string;
    socialLinkUrl: string;
    userId: string;
    DivisionId: string | null;
    createdAt: string;
    updatedAt: string;
};

export type resourceLinks = {
    id: string;
    resourceLinkName: string;
    resourceLinkUrl: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

export type AttendanceRecord = {
    statues: string;
    data: {
        attendanceRate: number;
        lastWeekAttendanceRate: number;
        lastMonthAttendanceRate: number;
        headsUp: number;
        present: number;
        absent: number;
        updateAt: string;
    };
};

export type AttendanceRecordData = {
    id: string;
    userId: string;
    sessionId: string | null;
    eventId: string;
    status: "PRESENT" | "ABSENT" | "EXCUSED" | string; // Add other possible statuses if known
    timestamp: string;
    headsUpId: string | null;
    createdAt: string;
    updatedAt: string;
};
export type AttendanceRecordDataResponse = {
    data: AttendanceRecordData[];
}
export interface HeadsUpMessage {
    id: string
    type: string
    body: string
    sentAt: string
  }