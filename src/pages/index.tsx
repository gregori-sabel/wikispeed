import { Text, Flex } from "@chakra-ui/react";
import React from "react";

export default function Base() {
  return (
    <>
    {/* make a fixed header */}
    <Text>Wikipeed</Text>
    <Flex
      w='100%'
      height='100%'
      justify='center'
      align='center'
      backgroundColor='brand.500'
    >
      <Text 
        fontSize='3xl'
        fontWeight='bold'
        _hover={{
          color:'red',
          cursor:'pointer'
        }}
      >Play</Text>
    </Flex>
    </>
  )
}
