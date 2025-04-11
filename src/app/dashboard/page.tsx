import React from 'react'
import { Box, Flex, Grid } from '@chakra-ui/react'
import Sidebar from 'components/Sidebar/Sidebar'
import Banner from 'components/Dashboard/upcoming.dashboard'
import DashboardState from 'components/dashboardState/DashboardState'

function page() {
  return (
    <Flex direction={"column"}>
      <Banner />
      <Grid templateColumns="repeat(2, 1fr)" gap={1} mt={5} ml={5}>
      <DashboardState />
      <DashboardState />
      <DashboardState />
      <DashboardState />
      </Grid>
    </Flex>
  )
}

export default page
