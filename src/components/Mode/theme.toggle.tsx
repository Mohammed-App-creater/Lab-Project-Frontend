'use client'
import { Button } from '@chakra-ui/react';
import { useTheme } from 'next-themes';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
    <Button onClick={() => setTheme('light')}>light</Button>
    <Button onClick={() => setTheme('dark')}>dark</Button>
    </div>
  );
};

export default ThemeToggle;
