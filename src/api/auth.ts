import api from '@/lib/axios';

export const validateToken = async (token: string): Promise<boolean> => {
    try {
        const res = await api.get(
            'api/user/validate-token',
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return res.status === 200;
    } catch {
        return false;
    }
    }

export const refreshToken = async (): Promise<string | null> => {
    try {
        const res = await api.get(
            'api/user/refresh-token',
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    
                },
            }
        );

        if (res.status === 200) {
            const data = res.data;
            localStorage.setItem('token', data.token);
            return data.token;
        }

        return null;
    } catch {
        return null;
    }
}