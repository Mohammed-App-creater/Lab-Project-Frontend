// components/PageLoader.tsx
import React from 'react';

const PageLoader: React.FC = () => {
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