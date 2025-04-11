import { Box, Text, ProgressCircle, ProgressLabel, SimpleGrid, Flex, AbsoluteCenter } from "@chakra-ui/react";
import { ProgressCircleNew } from "./progress-circle";

const StatCard = ({
  label,
  value,
  percentage,
  color,
}: {
  label: string;
  value: number | string;
  percentage: number;
  color: string;
}) => (
  <Flex
    direction="column"
    align="center"
    justify="center"
    p={4}
    borderRadius="xl"
    bg="white"
    boxShadow="sm"
  >
    {/* <ProgressCircle.Root
    >
      <ProgressCircle.ValueText fontSize="sm">{percentage}%</ProgressCircle.ValueText>
    </ProgressCircle.Root> */}
    <ProgressCircleNew value={55} />
    <Text fontWeight="bold" fontSize="lg" mt={2}>
      {value}
    </Text>
    <Text color="gray.500" fontSize="sm">
      {label}
    </Text>
  </Flex>
);

const AttendanceDashboard = () => {
  return (
    <Box p={6} bg="gray.50" minH="100vh">
      <Box
        bg="white"
        p={6}
        borderRadius="xl"
        boxShadow="md"
        maxW="sm"
        mb={8}
      >
        <Text fontWeight="bold" fontSize="md" mb={4} color="black" fontFamily={"heading"}>
          Overall Attendance Progress
        </Text>
        <Flex justify="center" align="center">
        <ProgressCircle.Root size={"xl"} value={75}  >
            <ProgressCircle.Track/>
            <ProgressCircle.Circle  >
              <ProgressCircle.Track />
              <ProgressCircle.Range />
            </ProgressCircle.Circle >
            <AbsoluteCenter>
              <ProgressCircle.ValueText color={"black"}/>
            </AbsoluteCenter>
          </ProgressCircle.Root>
          </Flex>
        <Flex justify="space-between" mt={6} px={2}>
          <Box textAlign="center">
            <Text fontWeight="bold" fontSize="lg" color="black">
              28%
            </Text>
            <Text fontSize="sm" color="gray.400">
              Last week
            </Text>
          </Box>
          <Box textAlign="center">
            <Text fontWeight="bold" fontSize="lg" color="black">
              56%
            </Text>
            <Text fontSize="sm" color="gray.400">
              Last month
            </Text>
          </Box>
        </Flex>
      </Box>

      
      {/* <SimpleGrid columns={[1, 3]} >
        <StatCard label="Heads up" value={0} percentage={0} color="blue.300"/> 
        <StatCard label="Absent" value={3} percentage={25} color="blue.600"/> 
        <StatCard label="Present" value={7} percentage={75} color="blue.800"/> 
      </SimpleGrid>
       */}
<Box display={"flex"} gap={0} height={"3%"}>
  <Box
        bg="white"
        p={6}
        boxShadow="md"
        maxW="sm"
        mb={8}
        // display={"flex"}
        // flexDirection={"column"}
      >
        <Flex justify="center" align="center">
        <ProgressCircle.Root size={"xl"} value={0}  >
            <ProgressCircle.Track/>
            <ProgressCircle.Circle  >
              <ProgressCircle.Track />
              <ProgressCircle.Range />
            </ProgressCircle.Circle >
            <AbsoluteCenter>
              <ProgressCircle.ValueText color={"black"}/>
            </AbsoluteCenter>
          </ProgressCircle.Root>
          </Flex>
        <Flex justify="space-between" mt={6} px={2}>
          <Box textAlign="center">
            <Text fontWeight="bold" fontSize="lg" color="black">
              28%
            </Text>
            <Text fontSize="sm" color="gray.400">
              Last week
            </Text>
          </Box>
          <Box textAlign="center">
            <Text fontWeight="bold" fontSize="lg" color="black">
              56%
            </Text>
            <Text fontSize="sm" color="gray.400">
              Last month
            </Text>
          </Box>
        </Flex>
      </Box>
      <Box
        bg="white"
        p={6}
        boxShadow="md"
        maxW="sm"
        mb={8}
      >
        <Flex justify="center" align="center">
        <ProgressCircle.Root size={"xl"} value={25}  >
            <ProgressCircle.Track/>
            <ProgressCircle.Circle  >
              <ProgressCircle.Track />
              <ProgressCircle.Range />
            </ProgressCircle.Circle >
            <AbsoluteCenter>
              <ProgressCircle.ValueText color={"black"}/>
            </AbsoluteCenter>
          </ProgressCircle.Root>
          </Flex>
        <Flex justify="space-between" mt={6} px={2}>
          <Box textAlign="center">
            <Text fontWeight="bold" fontSize="lg" color="black">
              28%
            </Text>
            <Text fontSize="sm" color="gray.400">
              Last week
            </Text>
          </Box>
          <Box textAlign="center">
            <Text fontWeight="bold" fontSize="lg" color="black">
              56%
            </Text>
            <Text fontSize="sm" color="gray.400">
              Last month
            </Text>
          </Box>
        </Flex>
      </Box>
      <Box
        bg="white"
        p={6}
        boxShadow="md"
        maxW="sm"
        mb={8}
      >
        <Flex justify="center" align="center">
        <ProgressCircle.Root size={"xl"} value={75}  >
            <ProgressCircle.Track/>
            <ProgressCircle.Circle  >
              <ProgressCircle.Track />
              <ProgressCircle.Range />
            </ProgressCircle.Circle >
            <AbsoluteCenter>
              <ProgressCircle.ValueText color={"black"}/>
            </AbsoluteCenter>
          </ProgressCircle.Root>
          </Flex>
        <Flex justify="space-between" mt={6} px={2}>
          <Box textAlign="center">
            <Text fontWeight="bold" fontSize="lg" color="black">
              28%
            </Text>
            <Text fontSize="sm" color="gray.400">
              Last week
            </Text>
          </Box>
          <Box textAlign="center">
            <Text fontWeight="bold" fontSize="lg" color="black">
              56%
            </Text>
            <Text fontSize="sm" color="gray.400">
              Last month
            </Text>
          </Box>
        </Flex>
      </Box>
      </Box>
    </Box>
    
  );
};

export default AttendanceDashboard;