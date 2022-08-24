import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react"

interface HistoryProps{
  history: string[]
}

export function History({ history }: HistoryProps){
  return(
    <Flex m={5} mb={0}>
      {history?.map(link => (
        <Box
          key={link}
          border='1px'
          borderRadius={5}
          paddingX='15px'
          ml={2}
          boxShadow='md'
          _hover={{            
            boxShadow:'inner',
            cursor:'pointer'
          }}
        >
          <Text fontWeight='medium'>
            {link}
          </Text>
        </Box>
      ))}
    </Flex>
  )
}