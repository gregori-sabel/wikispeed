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
      fontSize={['sm', 'md']}
    >
      <Flex w='300px' justify='start' fontSize={['sm', 'md']} flexWrap='wrap-reverse'>
        <strong>Objetivo: <Text color='red'>{objective}</Text></strong>
      </Flex>
      <Flex w='300px' justify='center'>
        <Text fontWeight='bold' fontSize={['md','xl']} m='0' p='0' justifySelf='center'>WikiSpeed</Text>
      </Flex>
      <Flex w='300px' justify='end' gap='3'>
        <Button 
          onClick={rankingModalOnOpen} 
          bg='white'
          justifySelf='end' 
          fontWeight='medium'
          color='black'
          size={['sm','md']}
          fontSize={['15px','20px']}
        > <BsBarChartFill />  </Button>
        <Button 
          onClick={helpModalOnOpen} 
          bg='black'
          justifySelf='end' 
          fontWeight='medium'
          color='white'
          _hover={{
            opacity: .5
          }}
          size={['sm','md']}
          fontSize={['15px','20px']}
        > <BsFillQuestionCircleFill /> </Button>
      </Flex>
    </Flex>

  )
}