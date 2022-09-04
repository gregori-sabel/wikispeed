import React from "react";
import { useEffect, useState } from "react"

import { WikiPage } from "../components/WikiPage";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { HelpModal } from "../components/HelpModal";
import { SuccessModal } from "../components/SuccessModal";
import { api } from "../services/api";
import { RankingModal } from "../components/RankingModal";

export interface WikiPage {
  cleanTitle: string;
  linkName: string;
}

interface InitialWikis{
  startWiki: WikiPage
  endWiki: WikiPage
}

export default function Home() {
  const [ history, setHistory ] = useState<WikiPage[]>([])
  const { isOpen: helpModalIsOpen, onOpen: helpModalOnOpen, onClose: helpModalOnClose } = useDisclosure()
  const { isOpen: successModalIsOpen, onOpen: successModalOnOpen, onClose: successModalOnClose } = useDisclosure()
  const { isOpen: rankingModalIsOpen, onOpen: rankingModalOnOpen, onClose: rankingModalOnClose } = useDisclosure()
  const [ initialWikis, setInitialWikis ] = useState<InitialWikis>( {} as InitialWikis)

  function handleSetHistory(newHistoryBlock: WikiPage){
    setHistory([...history, newHistoryBlock])
    console.log(history)
  }

  function getCleanTitle(text: string){
    return decodeURI(
      text
        .replaceAll('_', ' ')
        .replaceAll('#', ' - ')
    )
  }

  async function getDBWords() {

    const {startWiki, endWiki} = await api.get('api/games')
    .then(res => {
      return res.data
    })
    // console.log('startWiki',startWiki)
    // console.log('endWiki', endWiki)
    // const {startWiki, endWiki} = {startWiki: 'madeira', endWiki: 'faustao'}


    setHistory([{
      cleanTitle: getCleanTitle(startWiki), 
      linkName: startWiki
    }])    

    setInitialWikis({
      startWiki:{
        cleanTitle: getCleanTitle(startWiki), 
        linkName: startWiki
      }, 
      endWiki: {
        cleanTitle: getCleanTitle(endWiki), 
        linkName: startWiki
      },     
    })
    
  }

  useEffect(() => {
    getDBWords()
    helpModalOnOpen()
  },[])

  return (
    <Box>
    { initialWikis.startWiki &&      
      <Box>
        <Header helpModalOnOpen={helpModalOnOpen} rankingModalOnOpen={rankingModalOnOpen} objective={initialWikis.endWiki.cleanTitle}/>
        
        <Flex
          w='100%'
          flexDirection='column'
          justify='center'
          align='center'
          paddingX={['4','5','10']}
        >
          <Flex w='100%' maxW='1000px'>
            <WikiPage 
              startWiki={initialWikis.startWiki} 
              handleSetHistory={handleSetHistory} 
              history={history} 
              openSuccessModal={successModalOnOpen} 
              successWiki={initialWikis.endWiki}
            />
          </Flex>
        </Flex>
        
        <HelpModal 
          isOpen={helpModalIsOpen} 
          onOpen={helpModalOnOpen}  
          onClose={helpModalOnClose}  
        />
        <SuccessModal 
          isOpen={successModalIsOpen} 
          onClose={successModalOnClose}
          history={history}  
        />      
        <RankingModal 
          isOpen={rankingModalIsOpen} 
          onClose={rankingModalOnClose}
        />      
  
      </Box>
    }      
    </Box>
    
  )
}
