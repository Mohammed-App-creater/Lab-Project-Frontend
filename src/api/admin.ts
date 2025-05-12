import api from '@/lib/axios';

type user = {
    id: string
    firstName: string
    middleName: string | null
    lastName: string
    profileImageUrl: string | null
    Divisions: {
      id: string
      name: string
    }
    Role: {
      id: string
      name: string
    }
  }

export const getHeades = async (token: string): Promise<user[]> => {
    try {
        const res = await api.post(
            'api/user/get-users-by-role',
            {
                role: 'DivisionHead', 
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return res.data as user[];
    } catch (error) {
        console.error('Error fetching headers:', error);
        throw error;
    }
}

export const createdHead = async (token: string, userId: string) => {
    try {
        const res = await api.post(
            'api/user/update-user-role',
            {
                roleId: 'cb3d6fdd-6b4e-4096-a88b-1d159367c0ef', 
                userId: userId
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return res.data;
    } catch (error) {
        console.error('Error creating head:', error);
        throw error;
    }
}