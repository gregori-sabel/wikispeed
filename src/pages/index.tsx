import React from "react";
import { useEffect, useState } from "react"

import { WikiPage } from "../components/WikiPage";
import { History } from "../components/History";
import { Flex, useDisclosure } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { HelpModal } from "../components/HelpModal";
import { SuccessModal } from "../components/SuccessModal";

export default function Home() {
  const [ history, setHistory ] = useState<string[]>([])
  const { isOpen: helpModalIsOpen, onOpen: helpModalOnOpen, onClose: helpModalOnClose } = useDisclosure()
  const { isOpen: successModalIsOpen, onOpen: successModalOnOpen, onClose: successModalOnClose } = useDisclosure()
  const firstWiki = 'Potato'
  const lastWiki = 'Fungi'

  function handleSetHistory(newLink:string){
    setHistory([...history, newLink])
  }

  useEffect(() => {
    helpModalOnOpen()
  },[])

  return (
    <div>
      <Header onOpen={helpModalOnOpen}/>

      <Flex w='100%' flexDirection='column' justify='center' align='center' paddingX='10'>
        <Flex w='100%' maxW='1000px' mt='5'>
          <History history={history} firstWiki={firstWiki} lastWiki={lastWiki}/>
        </Flex>
        <Flex w='100%' maxW='1000px'>
          <WikiPage handleSetHistory={handleSetHistory} openSuccessModal={successModalOnOpen} successWiki={lastWiki}/>
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
        firstWiki={firstWiki}
      />

      

    </div>
  )
}
