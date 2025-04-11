import { Text ,Button, Card } from '@chakra-ui/react'
import React from 'react'
import SidebarItem from './SidebarItem'
import darkLightmode from '../Togglemode/darkLightmode'
import DarkLightmode from '../Togglemode/darkLightmode'

function Sidebar() {
  return (
   <Card.Root w={"280px"} h={"600px"} p={5} bg={"gray.200"} margin={3} borderRadius={15}>
        <Card.Header p={5}>
                <div className="flex items-center mb-8">
                    <div className="flex ">
                        <img className='size-[30px]' src="vector1.svg"/>
                        <img className='size-[30px] relative right-4' src="vector2.svg"/>
                    </div>
                    <Text fontFamily={"heading"} fontWeight={600} color={"#110051"}>Logoipsum</Text>
            
                </div>
        </Card.Header>
        <SidebarItem />
        <DarkLightmode/>
  </Card.Root>
  )
}

export default Sidebar
