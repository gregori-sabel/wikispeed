import React from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react"

interface HeaderProps{
  onOpen(): void
}

export function Header({ onOpen }: HeaderProps){
  return(
    <Flex
      position='sticky'
      top='0'
      bg='white'
      boxShadow='md'
      py='3'
      px='5'
      align='center'
      justify='space-between'
    >
      <Flex w='300px' justify='start'>
      </Flex>
      <Flex w='300px' justify='center'>
        <Text fontWeight='bold' fontSize='xl' m='0' p='0' justifySelf='center'>WikiSpeed</Text>
      </Flex>
      <Flex w='300px' justify='end'>
        <Button onClick={onOpen} bg='gray.200'justifySelf='end'>Como Jogar</Button>
      </Flex>
    </Flex>

  )
}