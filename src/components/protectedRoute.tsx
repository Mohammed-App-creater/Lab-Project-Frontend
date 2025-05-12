'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { refreshToken, validateToken } from '@/api/auth'; // Adjust the import path as necessary
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token && (await validateToken(token))) {
        setIsAuthenticated(true);
      } else {
        const newToken = await refreshToken();
        if (newToken && (await validateToken(newToken))) {
          setIsAuthenticated(true);
        } else {
          router.push('/login');
        }
      }
    };

    checkAuth();

    // Set up background refresh every 5 minutes
    const interval = setInterval(async () => {
      const token = localStorage.getItem('token');
      if (!token || !(await validateToken(token))) {
        await refreshToken();
      }
    }, 10 * 60 * 1000); // 10 minutes

    return () => clearInterval(interval);
  }, [router]);

  if (isAuthenticated === null) return null; // Or a loading spinner

  return <>{children}</>;
};

export default ProtectedRoute;
