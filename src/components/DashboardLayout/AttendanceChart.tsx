"use client";
import { Box, Flex, Text } from "@chakra-ui/react";
import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", thisYear: 10, lastYear: 5 },
  { month: "Feb", thisYear: 8, lastYear: 15 },
  { month: "Mar", thisYear: 15, lastYear: 50 },
  { month: "Apr", thisYear: 40, lastYear: 10 },
  { month: "May", thisYear: 60, lastYear: 30 },
  { month: "Jun", thisYear: 45, lastYear: 60 },
  { month: "Jul", thisYear: 55, lastYear: 90 },
];

const AttendanceOverview = () => {
  return (
    <Box
      bg="white"
      borderRadius="16px"
      borderWidth="2px"
      borderColor="gray.200"
      p="28px 56px 28px 46px"
      w="720px"
      h="360px"
      mx="auto"
      position="relative"
    >
      <Flex justify="space-between" mb="13px" alignItems={"center"}>
        <Text
          fontWeight="bold"
          color={"blue.700"}
          fontFamily="Lexend"
          fontSize="15px"
          lineHeight="18px"
          letterSpacing="0%"
          _hover={{
            color: "blue.700", 
            cursor: "pointer", 
            textDecoration: "underline", 
            textDecorationColor: "blue.700", 
          }}
        >
          Attendance Overview
        </Text>
        <Flex gap="18px" align="center">
          <Text
            color="gray.400"
            fontFamily="Lexend"
            fontWeight="regular"
            fontSize="14px"
            lineHeight="20px"
          >
            Total Members
          </Text>

          <Text
            color="gray.400"
            fontFamily="Lexend"
            fontWeight="regular"
            fontSize="14px"
            lineHeight="20px"
          >
            Total Event
          </Text>

          <Box
            h="24px"
            borderLeft="2px solid #D3D3D3"
            mx="8px"
          />

          <Flex align="center">
            <Box w="9px" h="9px" bg="gray.700" borderRadius="full" mr="5px" />
            <Text
              color="gray.600"
              fontFamily="Lexend"
              fontWeight="regular"
              fontSize="14px"
              lineHeight="20px"
            >
              This year
            </Text>
          </Flex>
          <Flex align="center">
            <Box w="9px" h="9px" bg="blue.700" borderRadius="full" mr="5px" />
            <Text
              color="gray.600"
              fontFamily="Lexend"
              fontWeight="regular"
              fontSize="14px"
              lineHeight="20px"
            >
              Last year
            </Text>
          </Flex>
        </Flex>
      </Flex>


      <Flex h="260px">
        <Flex
          direction="column"
          justify="space-between"
          mr="10px"
          h="100%"
          py="10px"
        >
          {["100%", "50%", "10%", "0"].map((val) => (
            <Text key={val} fontSize="sm" color="gray.400">
              {val}
            </Text>
          ))}
        </Flex>

        <Box flex={1} position="relative">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorThisYear" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4A5565" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#4A5568" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke="#CBD5E0"
                strokeDasharray="1 5"
                horizontal={true}
                vertical={false}
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#718096", fontSize: 13 }}
                tickMargin={12}
                tickFormatter={(value) => value.slice(0, 3)}
                interval={0}
              />

              <YAxis hide domain={[0, 100]} />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="thisYear"
                stroke="#4A5568"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorThisYear)"
              />

              <Line
                type="monotone"
                dataKey="lastYear"
                stroke="#000000"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={{ fill: "#3182CE", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </Flex>
    </Box>
  );
};

export default AttendanceOverview;
