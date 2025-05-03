// components/PageLoader.tsx
import React from 'react';

interface PageLoaderProps {
  fullPage: boolean;
}

const PageLoader: React.FC<PageLoaderProps> = ({ fullPage= true }) => {

  if (!fullPage) {
    return (
      <div className="flex w-full flex-col items-center justify-center  pt-10">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#0000003c] bg-opacity-50 flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-white">Loading...</p>
      </div>
    </div>
  );
};

export default PageLoader;