// app/api/user/users/[userId]/settings/route.ts
import { NextResponse } from 'next/server';

// Type for settings data
type SettingsData = {
  authUpdateCalendar: boolean;
  phonePublic: boolean;
  theme: string;
};

// Mock database (replace with real database calls)
let userSettings: Record<string, SettingsData> = {
  '192de509-4940-4af1-a407-fed9b417b5fe': {
    authUpdateCalendar: true,
    phonePublic: false,
    theme: 'LIGHT'
  }
};

// GET handler - Fetch user settings
export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  
  // Validate userId exists
  if (!userSettings[userId]) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(userSettings[userId]);
}

// PATCH handler - Update user settings
export async function PATCH(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  const updateData = await request.json();

  // Validate userId exists
  if (!userSettings[userId]) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    );
  }

  // Update settings
  userSettings[userId] = {
    ...userSettings[userId],
    ...updateData
  };

  return NextResponse.json({
    success: true,
    settings: userSettings[userId]
  });
}