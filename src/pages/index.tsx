import { GetStaticProps } from 'next' 
import React from "react";
import { useEffect, useState } from "react"

import { WikiPage } from "../components/WikiPage";
import { History } from "../components/History";
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
  finalWiki: {      
    title: string,
    link: string,
  }
}

export default function Home(props: StaticProps) {
  const [ history, setHistory ] = useState<WikiPage[]>([])
  const { isOpen: helpModalIsOpen, onOpen: helpModalOnOpen, onClose: helpModalOnClose } = useDisclosure()
  const { isOpen: successModalIsOpen, onOpen: successModalOnOpen, onClose: successModalOnClose } = useDisclosure()


  function handleSetHistory(historyBlock: WikiPage){
    setHistory([...history, historyBlock])
  }

  useEffect(() => {
    helpModalOnOpen()
  },[])

  return (
    <Box>
      <title>Wikispeed</title>

    { props.startWiki.title &&
      
      <Box>
        <Header onOpen={helpModalOnOpen}/>
        
        <Flex w='100%' flexDirection='column' justify='center' align='center' paddingX='10'>
          <Flex w='100%' maxW='1000px' mt='5'>
            <History 
              history={history} 
              startWiki={props.startWiki} 
              finalWiki={props.finalWiki}
            />
          </Flex>
          <Flex w='100%' maxW='1000px'>
            <WikiPage 
              startWiki={props.startWiki} 
              handleSetHistory={handleSetHistory} 
              openSuccessModal={successModalOnOpen} 
              successWiki={props.finalWiki}
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
          startWiki={props.startWiki}
        />      
  
      </Box>
    }
      
    </Box>
    
  )
}


export const getStaticProps: GetStaticProps = async () => {

  const startWiki = await api.get('page/random/title')
    .then(res => {        
      // console.log('initial wiki', res.data.items[0].title)
      return res.data.items[0].title
    })
  const finalWiki = await api.get('page/random/title')
    .then(res => {        
      // console.log('final wiki', res.data.items[0].title)
      return res.data.items[0].title
    })

  return {
    props: {
      startWiki: {
        title: startWiki,
        link: ''
      },
      finalWiki: {      
        title: finalWiki,
        link: ''
      }
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}