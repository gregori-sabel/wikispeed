import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react"
import { WikiPage } from "../pages";

interface HistoryProps{
  history: WikiPage[];
  handleReturnLink: (wikiPage: WikiPage) => void
}

export function HistoryWiki({ history, handleReturnLink }: HistoryProps){
  return(
    <>
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
              onClick={() => handleReturnLink(Block)}
              key={Block.cleanTitle}
              borderRadius={5}
              paddingX='15px'
              // ml={2}
              // boxShadow='base'
              // bg='blue.100'
              color= 'blue.600'
              fontWeight='normal'
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
                {Block.cleanTitle}
              </Text>
            </Box>
          ))}
        </Flex>
      }    
    </>
  )
}