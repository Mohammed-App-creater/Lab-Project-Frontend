// providers/RouterProgress.tsx
'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from './loading';

export function RouterProgress() {
  const [isLoading, setIsLoading] = useState(false);
  const [, setProgress] = useState(0);
  const pathname = usePathname();
  const [previousPathname, setPreviousPathname] = useState<string | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleStart = () => {
      setIsLoading(true);
      setProgress(0);
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(timer);
            return 90;
          }
          return prev + 10;
        });
      }, 100);
    };

    const handleComplete = () => {
      clearInterval(timer);
      setProgress(100);
      setTimeout(() => setIsLoading(false), 300);
    };

    if (previousPathname !== pathname) {
      handleStart();
      setPreviousPathname(pathname);
      handleComplete();
    }

    return () => {
      clearInterval(timer);
    };
  }, [pathname, previousPathname]);

  if (!isLoading) return null;

  return <LoadingSpinner fullPage={true} />;
}