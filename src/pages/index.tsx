import React from "react";
import { useEffect, useState } from "react"

import { WikiPage } from "../components/WikiPage";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { HelpModal } from "../components/HelpModal";
import { SuccessModal } from "../components/SuccessModal";
import { api } from "../services/api";

export interface WikiPage {
  title: string;
  link: string;
}

interface StaticProps {
  startWiki: {
    title: string,
    link: string,
  },
  endWiki: {      
    title: string,
    link: string,
  }
}

interface InitialWikis{
  startWiki: {
    title: string;
    link: string;
  };
  endWiki: {
    title: string;
    link: string;
  };
}

export default function Home() {
  const [ history, setHistory ] = useState<WikiPage[]>([])
  const { isOpen: helpModalIsOpen, onOpen: helpModalOnOpen, onClose: helpModalOnClose } = useDisclosure()
  const { isOpen: successModalIsOpen, onOpen: successModalOnOpen, onClose: successModalOnClose } = useDisclosure()
  const [ initialWikis, setInitialWikis ] = useState<InitialWikis>( {} as InitialWikis)

  function handleSetHistory(historyBlock: WikiPage){
    setHistory([...history, historyBlock])
  }

  async function getDBWords() {


    const {startWiki, endWiki} = await api.get('api/games/123')
    .then(res => {
      return res.data
    })

    setInitialWikis({startWiki: 
      {title: startWiki, link: ''}, 
      endWiki: 
      {title: endWiki, link: ''},     
    })
    
  }

  useEffect(() => {

    getDBWords()
    helpModalOnOpen()
  },[])

  return (
    <Box>
      <title>Wikispeed</title>

    { initialWikis.startWiki?.title &&
      
      <Box>
        <Header onOpen={helpModalOnOpen} objective={initialWikis.endWiki.title}/>
        
        <Flex
          w='100%'
          flexDirection='column'
          justify='center'
          align='center'
          paddingX={['4','5','10']}
        >
          <Flex w='100%' maxW='1000px' mt='5'>
            {/* <History 
              history={history} 
              startWiki={initialWikis.startWiki} 
              endWiki={initialWikis.endWiki}
            /> */}
          </Flex>
          <Flex w='100%' maxW='1000px'>
            <WikiPage 
              startWiki={initialWikis.startWiki} 
              handleSetHistory={handleSetHistory} 
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
          startWiki={initialWikis.startWiki}
        />      
  
      </Box>
    }
      
    </Box>
    
  )
}
