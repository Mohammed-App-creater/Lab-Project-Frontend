'use client'

import React from 'react';
import { GoMoon } from "react-icons/go";
import { FiSun } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

export default function DarkLight() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-2">
      {/* Light Button */}
      <Button
        onClick={() => setTheme("light")}
        variant="default"
        size="icon"
        className="bg-blue-900 hover:bg-blue-800 dark:bg-white dark:hover:bg-blue-200 h-10 w-10 md:w-auto md:px-3"
      >
        <FiSun className="w-4 h-4" />
        <span className="hidden md:inline ml-2">Light</span>
      </Button>

      {/* Dark Button */}
      <Button
        onClick={() => setTheme("dark")}
        variant="ghost"
        size="icon"
        className="bg-[#A2A1A80D] h-10 w-10 md:w-auto md:px-3"
      >
        <GoMoon className="w-4 h-4" />
        <span className="hidden md:inline ml-2">Dark</span>
      </Button>
    </div>
  );
}
