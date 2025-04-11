import { Box, Button, Card ,CardBody,Image} from '@chakra-ui/react'
import React from 'react'

function Banner() {
  return (
    <Card.Root m="20px" bg="#0067FF99" h="249px" borderRadius={'l1'} position={"relative"} >
        <Box position={'relative'} display={"flex"} >
            <Image position={"absolute"} right="20" top="16" src='/amico.svg'/>
            <CardBody  padding={12}>
                <Card.Title mb="2" lineHeight={2} fontFamily={"body"}>Upcoming Event</Card.Title>
                <Card.Description width={"60%"}  color={"black"} fontFamily={"body"} >Cross-division knowledge-sharing</Card.Description>
                <Button bg="#001C5DCC"  width={'178px'} borderRadius={"l1"} lineHeight={2} mt={10} fontFamily={"body"}  >Add to Calender</Button>
            </CardBody>
        </Box>
        <Button bg="#F45B69"  height={"25px"}   borderRadius={"l2"} lineHeight={2} fontFamily={"body"} position={"absolute"} right={"19px"} top={"4"}  >Private</Button>
    </Card.Root>
  )
}

export default Banner
