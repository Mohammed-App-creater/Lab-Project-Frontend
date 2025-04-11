import React from 'react'
import { Input } from "@chakra-ui/react"
import { IoSearch } from "react-icons/io5"

function SearchInput() {
  return (
    <div className="relative w-[261px] mt-3">
      <Input 
        placeholder="Search"
        bg="white"
        h="50px"
        pl="40px" 
        borderRadius="md"
        _placeholder={{ color: 'gray.400' }}
      />
      <IoSearch 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#16151C]"
        size={18}
      />
    </div>
  )
}

export default SearchInput