"use client"
import React from 'react';
import {
  Table,
  Badge,
  IconButton,
  Flex,
  Select,
  Box,
  Text,
  Button,
  createListCollection,
  Portal,
  Avatar,
} from '@chakra-ui/react';
import { CiEdit } from "react-icons/ci";
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Member {
  name: string;
  id: string;
  division: string;
  attendance: 'Active' | 'Needs Attention' | 'Inactive';
  year: string;
  status: 'On Campus' | 'Off Campus' | 'Withdrawn';
}

const getStatusBadge = (status: Member['status']) => {
  const colorMap: Record<Member['status'], string> = {
    'On Campus': 'green',
    'Off Campus': 'purple',
    'Withdrawn': 'blue',
  };
  return <Badge borderRadius={"4px"} colorScheme={colorMap[status]} colorPalette={colorMap[status]}>{status}</Badge>;
};

const getAttendanceBadge = (attendance: Member['attendance']) => {
  const colorMap: Record<Member['attendance'], string> = {
    'Active': 'green',
    'Needs Attention':   'yellow',
    'Inactive': 'red',
  };
  return <Badge borderRadius={"4px"} colorScheme={colorMap[attendance]} colorPalette={colorMap[attendance]}>{attendance}</Badge>;
};

const MemberList: React.FC = () => {
  const members: Member[] = [
    {
      name: 'Darlene Robertson',
      id: 'UGR/25605/14',
      division: 'Design',
      attendance: 'Active',
      year: '4th',
      status: 'On Campus',
    },
    {
      name: 'Floyd Miles',
      id: 'UGR/25605/14',
      division: 'Developement',
      attendance: 'Active',
      year: '5th',
      status: 'Off Campus',
    },
    {
      name: 'Cody Fisher',
      id: 'UGR/25605/14',
      division: 'CPD',
      attendance: 'Needs Attention',
      year: '3rd',
      status: 'Withdrawn',
    },
    {
        name: 'Floyd Miles',
        id: 'UGR/25605/14',
        division: 'Developement',
        attendance: 'Active',
        year: '5th',
        status: 'Off Campus',
      },
      {
        name: 'Cody Fisher',
        id: 'UGR/25605/14',
        division: 'CPD',
        attendance: 'Needs Attention',
        year: '3rd',
        status: 'Withdrawn',
      },

  ];

  const frameworks = createListCollection({
    items: [
      { label: "5", value: "react" },
      { label: "10", value: "vue" },
      { label: "15", value: "angular" },
      { label: "20", value: "svelte" },
    ],
  })

  return (
    <Box p={4}>
        <Table.Root size="sm">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader  color="gray.500">Member Name</Table.ColumnHeader>
              <Table.ColumnHeader  color="gray.500">Member ID</Table.ColumnHeader>
              <Table.ColumnHeader color="gray.500">Division</Table.ColumnHeader>
              <Table.ColumnHeader color="gray.500">Attendance</Table.ColumnHeader>
              <Table.ColumnHeader color="gray.500">Year</Table.ColumnHeader>
              <Table.ColumnHeader color="gray.500">Status</Table.ColumnHeader>
              <Table.ColumnHeader color="gray.500">Action</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {members.map((member, index) => (
              <Table.Row key={index}>
                <Table.Cell>
                <Flex gap="2" alignItems="center">
                <Avatar.Root size={"sm"}>
                    <Avatar.Fallback name="Segun Adebayo" />
                    <Avatar.Image src="Ellipse.svg" /></Avatar.Root>
                    <Text fontSize={["10px", "10px", "10px", "15px"]}>Darlene Robertson</Text>
                </Flex>
                </Table.Cell>
                <Table.Cell>{member.id}</Table.Cell>
                <Table.Cell>{member.division}</Table.Cell>
                <Table.Cell>{getAttendanceBadge(member.attendance)}</Table.Cell>
                <Table.Cell>{member.year}</Table.Cell>
                <Table.Cell>{getStatusBadge(member.status)}</Table.Cell>
                <Table.Cell>
                  <Flex gap={2}>
                    <IconButton variant="ghost" aria-label="Edit" size="sm"><CiEdit /></IconButton>
                    <IconButton variant="ghost" aria-label="Delete" size="sm" colorScheme="red" >{<DeleteIcon />}</IconButton>
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>

      <Flex mt={4} justify="space-between" align="center">
        <Select.Root collection={frameworks} size="sm" width="200px">
        <Select.HiddenSelect />
        <Flex gap="2" alignItems="center">
        <Select.Label>Showing</Select.Label>
        <Select.Control h="35px" >
          <Select.Trigger width="76px" borderRadius="10px">
            <Select.ValueText placeholder="10" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        </Flex>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {frameworks.items.map((framework) => (
                <Select.Item item={framework} key={framework.value}>
                  {framework.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>

      <Text display={{ base: 'none', md: 'block' }} color={"gray.400"} fontSize={{ md: 'sm', lg: 'sm' }}>Showing 1 to 10 out of 60 records</Text>

          <Flex align="center" gap={2}>
            <IconButton variant="ghost" aria-label="Previous" size="sm">{<FaChevronLeft />}</IconButton>
            <Button  size="sm" variant="ghost" colorScheme="blue">1</Button>
            <Button size="sm" variant="ghost" >2</Button>
            <Button size="sm" variant="ghost" >3</Button>
            <Button size="sm" variant="ghost" >4</Button>
            <IconButton variant="ghost" aria-label="Next" size="sm" > {<FaChevronRight />}</IconButton>
          </Flex>
      </Flex>
    </Box>
  );
};

export default MemberList;
