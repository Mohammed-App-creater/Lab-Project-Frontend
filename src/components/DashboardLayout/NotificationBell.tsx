import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { FiBell } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import SearchInput from 'components/SearchInput/SearchInput';


function NotificationBell() {
  return (
      <Flex direction="row" justify={"space-between"}  alignItems={"center"} gap={4} bg="white" mt={5} ml={5}>
        <Box mb={2}>
          <Text fontSize="xl" fontWeight="bold" color="black" fontFamily={"lexend"}>Hello Henok👋🏻</Text>
          <Text fontSize="sm" color="gray.400">Good Morning</Text>
        </Box>
        <Flex gap={4} >
          <Box flex={1}>
            <SearchInput />
          </Box>
          <Box 
            bg="gray.200" 
            width="50px" 
            height="50px" 
            display="flex" 
            alignItems="center" 
            justifyContent="center" 
            borderRadius="xl" 
            boxShadow="md"
          >
            <FiBell size={22} color="black" />
          </Box>
        </Flex>

        <Box width={"150px"}  borderRadius="xl" boxShadow="md" bg="white" display="flex" alignItems="center" justifyContent="center">
        <Flex direction="column" alignItems="center">
            {/* <img src='public/userImage.svg'/> */}
          <Text fontSize="xl" fontWeight="bold">Henok Assefa</Text>
          <Text color="gray.600">UI/UX DESIGNER</Text>
        </Flex></Box>
      </Flex>
  );
}

export default NotificationBell;