import { Box, Text, Flex, Heading } from "@chakra-ui/react";
import { FiUsers } from "react-icons/fi";
import { TiArrowSortedUp } from "react-icons/ti";

const DashboardState = () => {
  return (
    <Box
      bg="white"
      p={[4, 5, 6]}
      borderRadius="12px"
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.05)"
      w={["100%", "300px", "280px"]} 
      border="1px solid #EAECF0"
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        height="4px"
        bg="#EAECF0"
        borderTopRadius="12px"
      />

      <Flex alignItems="center" mb={2}>
        <Box bg="#00308710" p={2} borderRadius="8px" mr={3}>
          <FiUsers color="#003087" size="20px" />
        </Box>
        <Heading
          as="h3"
          fontSize={["14px", "15px", "16px"]}
          fontWeight="400"
          color="gray.700"
          lineHeight="24px"
        >
          Total Members
        </Heading>
      </Flex>

      <Flex justifyContent="space-between" alignItems="flex-end" mb={4}>
        <Heading
          as="h2"
          fontSize={["28px", "30px", "32px"]}
          fontWeight="700"
          color="#101828"
          lineHeight="40px"
        >
          162
        </Heading>

        <Flex
          alignItems="center"
          bg="green.50"
          px={2}
          py={1}
          borderRadius="16px"
        >
          <TiArrowSortedUp color="#12B76A" size="16px" />
          <Text
            ml={1}
            color="#12B76A"
            fontSize="14px"
            fontWeight="500"
            lineHeight="20px"
          >
            12%
          </Text>
        </Flex>
      </Flex>

      <Box borderTop="1px solid #EAECF0" mx={-6} mb={3} />

      <Text fontSize="12px" color="#667085" lineHeight="18px">
        Update: July 16, 2025
      </Text>
    </Box>
  );
};

export default DashboardState;
