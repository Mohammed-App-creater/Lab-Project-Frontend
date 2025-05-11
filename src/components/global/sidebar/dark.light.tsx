'use client'

import React from 'react';
import { GoMoon } from "react-icons/go";
import { FiSun } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

export default function DarkLight() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center justify-center gap-3 w-full px-3 py-4">
      {/* Light Button */}
      <Button
        onClick={() => setTheme("light")}
        variant="default"
        size="sm"
        className={`rounded-md flex-1 bg-blue-900 hover:bg-blue-800 dark:bg-white dark:hover:bg-blue-200 h-10 
          ${theme === 'light' ? 'ring-2 ring-blue-500' : ''}`}
      >
        <FiSun className="w-4 h-4 mr-0 min-[901px]:mr-2" />
        <span className="hidden min-[901px]:!flex">Light</span>
      </Button>

      {/* Dark Button */}
      <Button
        onClick={() => setTheme("dark")}
        variant="ghost"
        size="sm"
        className={`rounded-md flex-1 bg-[#A2A1A80D] h-10 hover:bg-[#A2A1A81A]
          ${theme === 'dark' ? 'ring-2 ring-blue-500' : ''}`}
      >
        <GoMoon className="w-4 h-4 mr-0 min-[901px]:mr-2" />
        <span className="hidden min-[901px]:!flex">Dark</span>
      </Button>
    </div>
  );
}
