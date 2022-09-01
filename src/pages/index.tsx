import { GetStaticProps } from 'next' 
import React from "react";
import { useEffect, useState } from "react"

import { WikiPage } from "../components/WikiPage";
import { History } from "../components/History";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { HelpModal } from "../components/HelpModal";
import { SuccessModal } from "../components/SuccessModal";
import { wikiApi, api } from "../services/api";

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
        <Header onOpen={helpModalOnOpen} objective={props.endWiki.title}/>
        
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
              startWiki={props.startWiki} 
              endWiki={props.endWiki}
            /> */}
          </Flex>
          <Flex w='100%' maxW='1000px'>
            <WikiPage 
              startWiki={props.startWiki} 
              handleSetHistory={handleSetHistory} 
              openSuccessModal={successModalOnOpen} 
              successWiki={props.endWiki}
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

  function cleanTitle(title: string) {
    const pageCleanTitle = decodeURI(
      title
        .replaceAll('_', ' ')
        .replaceAll('#', ' - ')
    )
    
    return pageCleanTitle
  }

  const today = new Date().getDate()
  console.log(today)

  

  // const {startWiki, endWiki} = await api.get('http://localhost:3000/api/games/123')
  //   .then(res => {
  //     console.log(res.data)
  //     return res.data
  //   })
    
    
  return {
    props: {
      startWiki: {
        // title: cleanTitle(startWiki),
        title: 'batata',
        link: ''
      },
      endWiki: {      
        // title: cleanTitle(endWiki),
        title: 'porta',
        link: ''
      }
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}