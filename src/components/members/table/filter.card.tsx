"use client"
import {
    Box,
  Button,
  Card,
  Checkbox,
  For,
  HStack,
  Popover,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react"

import { useState } from "react"
import { FiFilter } from "react-icons/fi"

type FilterValues = {
  divisions: string[]
  status: string[]
}

const divisionsList = ["Design", "Development", "CPD"]
const statusList = ["On Campus", "Off Campus", "Withdrawn"]

const FilterComponent = ({ onApply }: { onApply: (filters: FilterValues) => void }) => {
  const [selectedDivisions, setSelectedDivisions] = useState<string[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string[]>([])

  const toggleValue = (value: string, list: string[], setList: (val: string[]) => void) => {
    if (list.includes(value)) {
      setList(list.filter((v) => v !== value))
    } else {
      setList([...list, value])
    }
  }

  const applyFilters = () => {
    onApply({
      divisions: selectedDivisions,
      status: selectedStatus,
    })
  }

  return (
    <Box p="3">
        <Popover.Root>
      <Popover.Trigger asChild>
        <Button size="sm" variant="outline" >
        {<FiFilter />}
          Filter
        </Button>
      </Popover.Trigger>

      <Portal>
        <Popover.Positioner>
          <Popover.Content p="4" w="250px">
            <Popover.Arrow />
            <Popover.Body>
              <Stack >
                <Box display={"flex"} flexDirection={"column"}>
                  <Text fontWeight="bold" mb="2">Division</Text>
                  <For each={divisionsList}>
                    {(division) => (
                      <Checkbox.Root
                      p={1}
                        key={division}
                        checked={selectedDivisions.includes(division)}
                        onCheckedChange={() => toggleValue(division, selectedDivisions, setSelectedDivisions)}
                      >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                        <Checkbox.Label>{division}</Checkbox.Label>
                      </Checkbox.Root>
                    )}
                  </For>
                </Box>

                <Box>
                  <Text fontWeight="bold" mb="2">Status</Text>
                  <For each={statusList}>
                    {(status) => (
                      <Checkbox.Root
                      p={1}
                        key={status}
                        checked={selectedStatus.includes(status)}
                        onCheckedChange={() => toggleValue(status, selectedStatus, setSelectedStatus)}
                      >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                        <Checkbox.Label>{status}</Checkbox.Label>
                      </Checkbox.Root>
                    )}
                  </For>
                </Box>

                <Button mt={3} bgColor="#003087" size="sm" onClick={applyFilters} width="full">
                  Apply Filters
                </Button>
              </Stack>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
    </Box>
  )
}

export default FilterComponent
