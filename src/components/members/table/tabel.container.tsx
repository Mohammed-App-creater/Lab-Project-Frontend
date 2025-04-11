import { Card } from '@chakra-ui/react'
import React from 'react'
import MemberList from './member.list.table'

function TableContainer() {
  return (
    <Card.Root m="25px" margin={{lg:"10px"}} >
        <MemberList />
  </Card.Root>
  )
}

export default TableContainer