// components/LoadingSpinner.tsx
'use client';

import { useEffect, useState } from 'react';

export const LoadingSpinner = ({ fullPage = true }: { fullPage?: boolean }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 99) {
          clearInterval(interval);
          return 99;
        }
        return prev < 90 ?  prev + 10 : prev + 1;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${fullPage ? 'fixed inset-0' : 'w-full'} flex flex-col items-center justify-center bg-white dark:bg-gray-900 z-50`}>
      <div className="relative w-20 h-20 mb-4">
        {/* Main spinner */}
        <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
        
        {/* Optional inner circle */}
        <div className="absolute inset-4 rounded-full border-2 border-blue-300 opacity-70"></div>
      </div>
      
      {/* Progress text */}
      <span className="text-gray-700 dark:text-gray-300 font-medium mb-2">
        {progress}%
      </span>
      
      {/* Progress bar (optional) */}
      <div className="w-48 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      {/* Loading text */}
      <p className="mt-4 text-gray-500 dark:text-gray-400">
        Loading your experience...
      </p>
    </div>
  );
};