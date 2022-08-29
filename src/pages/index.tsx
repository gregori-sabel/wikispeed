import { GetStaticProps } from 'next' 
import React from "react";
import { useEffect, useState } from "react"

import { WikiPage } from "../components/WikiPage";
import { History } from "../components/History";
import { Flex, useDisclosure } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { HelpModal } from "../components/HelpModal";
import { SuccessModal } from "../components/SuccessModal";
import { api } from "../services/api";

export interface WikiPage {
  title: string;
  link: string;
}

interface InitialWikis {
  startWiki: WikiPage;
  finalWiki: WikiPage;
}

interface InitialWikisSimple {
  initialWikis: {
  startWiki: string;
  finalWiki: string;}
}

export default function Home(props: InitialWikisSimple) {
  const [ history, setHistory ] = useState<WikiPage[]>([])
  const { isOpen: helpModalIsOpen, onOpen: helpModalOnOpen, onClose: helpModalOnClose } = useDisclosure()
  const { isOpen: successModalIsOpen, onOpen: successModalOnOpen, onClose: successModalOnClose } = useDisclosure()
  // const [ initialWikis, setInitialWikis ] = useState<InitialWikis>({} as InitialWikis)
  const initialWikis = {    
    startWiki: {
      title: props.initialWikis.startWiki,
      link: ''
    },
    finalWiki: {      
      title: props.initialWikis.finalWiki,
      link: ''
    }
  }

  console.log('1', props.initialWikis.startWiki)
  console.log('2', props.initialWikis.finalWiki)

  async function getInitialWikis(){
    const startWiki = await api.get('page/random/title')
      .then(res => res.data)
    const finalWiki = await api.get('page/random/title')
      .then(res => {        
        console.log('final wik ', res)
        return res.data        
      })

    // setInitialWikis({startWiki, finalWiki})
  }


  function handleSetHistory(historyBlock: WikiPage){
    setHistory([...history, historyBlock])
  }

  useEffect(() => {
    helpModalOnOpen()
    // getInitialWikis()
  },[])

  return (
    <div>
    { initialWikis.startWiki.title &&
      
        <>
        <Header onOpen={helpModalOnOpen}/>
        
        <Flex w='100%' flexDirection='column' justify='center' align='center' paddingX='10'>
          <Flex w='100%' maxW='1000px' mt='5'>
            <History 
              history={history} 
              startWiki={initialWikis.startWiki} 
              finalWiki={initialWikis.finalWiki}
              />
          </Flex>
          <Flex w='100%' maxW='1000px'>
            <WikiPage 
              startWiki={initialWikis.startWiki} 
              handleSetHistory={handleSetHistory} 
              openSuccessModal={successModalOnOpen} 
              successWiki={initialWikis.finalWiki}
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
  
      </>
    }
      
    </div>
    
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

    

  const initialWikis = {
    startWiki,
    finalWiki
  }

  return {
    props: {
      initialWikis
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}