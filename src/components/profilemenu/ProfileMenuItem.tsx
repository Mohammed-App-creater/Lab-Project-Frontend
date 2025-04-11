'use client';

import React, { useState } from 'react';
import { Flex, Icon, Center, Text, Box } from "@chakra-ui/react";
import { CiUser } from "react-icons/ci";
import { LuCalendarCheck } from "react-icons/lu";
import { PiNotepadBold } from "react-icons/pi";
import { RiNewspaperLine } from "react-icons/ri";



const ProfileMenuItem = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const menuItems = [
    { icon: CiUser, text: "Profile", name: "profile" },
    { icon: LuCalendarCheck, text: "Attendance", name: "attendance" },
    { icon: RiNewspaperLine, text: "Progress", name: "progress" },
    { icon: PiNotepadBold, text: "Heads up!", name: "headsUp" }
  ];

  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName === activeItem ? null : itemName);
  };

  return (
    <Center width="100%" height="100vh">
      <Box 
        bg="white"
        p={0}
        width="280px"
        borderRadius="lg" 
        boxShadow="md" 
      >
        
        <Flex direction="column">
          {menuItems.map((item) => (
            <Flex
              key={item.name}
              align="center"
              p={3}
              mb={item.name === "headsUp" ? 0 : 4} 
              borderRadius="md"
              cursor="pointer"
              bg={activeItem === item.name ? "blue.500" : "transparent"}
              color={activeItem === item.name ? "white" : "black"}
              _hover={{
                bg: "#003087",
                color: "white",
                "& svg": { color: "white" },
              }}
              transition="all 0.2s ease"
              onClick={() => handleItemClick(item.name)}
            >
              <Icon 
                as={item.icon} 
                boxSize={item.name === "profile" ? "24px" : "20px"} 
                color={activeItem === item.name ? "white" : "black"} 
                mr={4} 
              />
              <Text 
                fontWeight={item.name === "profile" ? "bold" : "normal"}
                fontSize="md"
              >
                {item.text}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Box>
    </Center>
  );
};

export default ProfileMenuItem;