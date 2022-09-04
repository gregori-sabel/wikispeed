import React from "react";
import { Button, Flex, Text } from "@chakra-ui/react"
import { BsFillQuestionCircleFill, BsBarChartFill } from 'react-icons/bs'

interface HeaderProps{
  helpModalOnOpen(): void
  rankingModalOnOpen(): void
  objective: string
}

export function Header({ helpModalOnOpen, rankingModalOnOpen, objective }: HeaderProps){
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
      <strong>Objetivo do dia: <Text display='inline' color='red' >{objective}</Text></strong>
      </Flex>
      <Flex w='300px' justify='center'>
        <Text fontWeight='bold' fontSize='xl' m='0' p='0' justifySelf='center'>WikiSpeed</Text>
      </Flex>
      <Flex w='300px' justify='end' gap='3'>
        <Button 
          onClick={rankingModalOnOpen} 
          bg='white'
          justifySelf='end' 
          // boxShadow='md' 
          fontWeight='medium'
          color='black'
        > <BsBarChartFill  size='20px'/>  </Button>
        <Button 
          onClick={helpModalOnOpen} 
          bg='black'
          justifySelf='end' 
          // boxShadow='md' 
          fontWeight='medium'
          color='white'
          _hover={{
            opacity: .5
          }}
        > <BsFillQuestionCircleFill  size='20px'/> </Button>
      </Flex>
    </Flex>

  )
}