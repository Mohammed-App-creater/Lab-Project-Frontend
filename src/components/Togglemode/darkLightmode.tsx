"use client"
import { Button, Card } from '@chakra-ui/react'
import { useTheme } from 'next-themes';
import React from 'react'
import {FiSun} from 'react-icons/fi';
import { GoMoon } from "react-icons/go";

export default function DarkLightmode() {
  const { theme, setTheme } = useTheme();

  return (
    <Card.Root 
  display={"flex"} 
  flexDirection={"row"} 
  gap={1} 
  marginTop={14} 
  p={0}
  bg={"gray.200"} 
  borderRadius={15} 
  overflow="hidden" 
>
  <Button 
    bgColor={"#003087"} 
    borderRadius={"l2"} 
    flex={1} 
    py={2}
    px={4}
    color="white"
    onClick={() => {setTheme('light')}}
  >
    <FiSun />Light
  </Button>
  <Button 
    bgColor={"#A2A1A8"} 
    borderRadius={"l2"}
    flex={1} 
    py={2} 
    px={4}
    color={"#16151C"}
    onClick={() => {setTheme('dark')}}
  >
    <GoMoon />Dark
  </Button>
</Card.Root> 
  )
}
