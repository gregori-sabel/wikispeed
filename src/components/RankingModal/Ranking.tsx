import { Box, Flex, Text } from '@chakra-ui/react'
import Cookie from 'js-cookie';
import React from 'react'

interface RankingData {
  ranking: {
    userId: string;
    userName: string;
    historic: string[]
  }[]
}

export function Ranking({ ranking }: RankingData) {

  const userId = Cookie.get('user-id')

  const formattedRanking = ranking.map( rank => {
    if(rank?.userName){
      console.log('replace', rank?.userName)
  
      const cleanUserName = rank?.userName.replace(/^./, rank.userName[0].toUpperCase())
  
      return {
        userId: rank.userId,
        userName: cleanUserName,
        historic: rank.historic
      }
    }
  })
  console.log(formattedRanking)

  const sortedRanking = formattedRanking.sort((a,b) => {
    return a.historic.length - b.historic.length
  })    

  return(
    <Box 
      // flexDir='column' 
      h='500px' 
      bg='blue.100' 
      overflowX='hidden' 
      overflowY='scroll' 
      borderRadius='10px' 
      scrollSnapStop='initial'
    >
      { sortedRanking.length > 0 && 
        sortedRanking.map(user => (
          <Flex 
            align='center' 
            _even={{ bg:userId == user.userId ? 'yellow.100' : '' }}   
            bg={userId == user.userId ? 'yellow.100' : ''}         
          >
            <Text 
              m='0' 
              py='5px'
              px='15px' 
              fontWeight='bold' 
              fontSize='lg'
              borderRadius='0px 10px 10px 0px'
              bg={userId == user.userId ? 'yellow.300' : 'blue.300'}
            >{user.historic.length}</Text>
            <Text m='0' pl='10px' fontWeight='bold'>{user.userName}</Text>
          </Flex>
        ))
      }
    </Box>
  )
}