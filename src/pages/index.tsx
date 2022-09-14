import React from "react";
import { useEffect, useState } from "react"

import { WikiPage } from "../components/WikiPage";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { HelpModal } from "../components/HelpModal";
import { SuccessModal } from "../components/SuccessModal";
import { api } from "../services/api";
import { RankingModal } from "../components/RankingModal";
import { LoginModal } from "../components/LoginModal";
import Cookies from 'js-cookie'

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
  const [ userName, setUserName] = useState('')
  const { isOpen: helpModalIsOpen, onOpen: helpModalOnOpen, onClose: helpModalOnClose } = useDisclosure()
  const { isOpen: successModalIsOpen, onOpen: successModalOnOpen, onClose: successModalOnClose } = useDisclosure()
  const { isOpen: rankingModalIsOpen, onOpen: rankingModalOnOpen, onClose: rankingModalOnClose } = useDisclosure()
  const { isOpen: loginModalIsOpen, onOpen: loginModalOnOpen, onClose: loginModalOnClose } = useDisclosure()
  const [ initialWikis, setInitialWikis ] = useState<InitialWikis>( {} as InitialWikis)

  function handleSetHistory(newHistoryBlock: WikiPage){
    setHistory([...history, newHistoryBlock])
    // console.log(history)
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
    
    // const {startWiki, endWiki} = {startWiki: 'Monte Gerizim', endWiki: 'faustao'}

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

  function handleSetUserName(name: string) {
    setUserName(name)
  }

  function getLoginName(){
    const name = Cookies.get('user-name')
    if(name){
      setUserName(name)
    } else {
      loginModalOnOpen()
    }

  }

  useEffect(() => {
    
    window.onbeforeunload = function() {
      return "";
    }      

    getDBWords()
    getLoginName()
    helpModalOnOpen()
  },[])

  return (
    <Box>
    { initialWikis.startWiki &&      
      <Box>
        <Header 
          objective={initialWikis.endWiki.cleanTitle}
          rankingModalOnOpen={rankingModalOnOpen} 
          helpModalOnOpen={helpModalOnOpen} 
        />
        
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
          onClose={helpModalOnClose} 
        />
        <LoginModal 
          isOpen={loginModalIsOpen} 
          onClose={loginModalOnClose}  
          handleSetUserName={handleSetUserName} 
          userName={userName}
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
