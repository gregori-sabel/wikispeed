import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react"

export interface WikiPage {
  title: string;
  link: string;
}

interface HistoryProps{
  startWiki: WikiPage;
  history: WikiPage[];
  endWiki: WikiPage;
}

export function History({ history, startWiki, endWiki }: HistoryProps){
  return(
    <Flex width='100%' justify='space-between' maxH='50px'>
      <Flex>
        <Box
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
          <Text 
            fontWeight='medium'
            fontSize={['12','16']}
            whiteSpace='nowrap'
          >
          {startWiki.title}
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
              borderRadius={5}
              paddingX='15px'
              ml={2}
              boxShadow='md'
              _hover={{            
                boxShadow:'inner',
                cursor:'pointer'
              }}
            >
              <Text 
                fontWeight='medium'
                fontSize={['12','16']}
                whiteSpace='nowrap'
              >
                {Block.title}
              </Text>
            </Box>
          ))}
        </Flex>
      }    
      <Flex>
        <Box
          borderRadius={5}
          paddingX='15px'
          ml={2}
          boxShadow='md'
          bg='yellow.300'
        >
          <Text 
            fontWeight='medium'
            fontSize={['12','16']}
            whiteSpace='nowrap'
          >
            {endWiki.title}
          </Text>
        </Box>
      </Flex>     
    </Flex>
  )
}