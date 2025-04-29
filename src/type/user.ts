
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
