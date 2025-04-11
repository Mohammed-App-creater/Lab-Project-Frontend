import { Button, Card } from '@chakra-ui/react'
import React from 'react'
import {FiSun} from 'react-icons/fi';
import { GoMoon } from "react-icons/go";

export default function DarkLightmode() {
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
  >
    <FiSun />Light
  </Button>
  <Button 
    bgColor={"#A2A1A8"} 
    borderRadius={"l2"}
    flex={1} 
    py={2} // Vertical padding
    px={4} // Horizontal padding
    color={"#16151C"}
  >
    <GoMoon />Dark
  </Button>
</Card.Root> 
  )
}
