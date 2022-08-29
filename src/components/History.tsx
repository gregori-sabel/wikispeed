import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react"

export interface HistoryBlock {
  title: string;
  link: string;
}

interface HistoryProps{
  firstWiki: string;
  history: HistoryBlock[];
  lastWiki: string;
}

export function History({ history, firstWiki, lastWiki }: HistoryProps){
  return(
    <Flex width='100%' justify='space-between' maxH='50px'>
      <Flex>
        <Box
          border='1px'
          borderRadius={5}
          paddingX='15px'
          ml={2}
          boxShadow='md'
          bg='green.300'
          _hover={{            
            boxShadow:'inner',
            cursor:'pointer'
          }}
        >
          <Text fontWeight='medium'>
          {firstWiki}
          </Text>
        </Box>
      </Flex> 
      { history.length !== 0 &&
        <Flex 
          w='100%' 
          overflow='auto'
          sx={{
            '&::-webkit-scrollbar': {
              height: '10px',
              borderRadius: '2px',
              backgroundColor: `rgba(7, 7, 7, 0.205)`,
            },
            '&::-webkit-scrollbar-thumb': {
              borderRadius: '3px',
              backgroundColor: `rgba(19, 19, 19, 0.747)`,
            },
          }}
        >
          {history?.map(Block => (
            <Box
              key={Block.title}
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
              <Text fontWeight='medium' whiteSpace='nowrap'>
                {Block.link}
              </Text>
            </Box>
          ))}
        </Flex>
      }    
      <Flex>
        <Box
          border='1px'
          borderRadius={5}
          paddingX='15px'
          ml={2}
          boxShadow='md'
          bg='yellow.300'
        >
          <Text fontWeight='medium'>
            {lastWiki}
          </Text>
        </Box>
      </Flex>     
    </Flex>
  )
}