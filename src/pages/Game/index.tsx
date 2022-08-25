import React from "react";
import { useEffect, useState } from "react"

import { WikiPage } from "../../components/WikiPage";
import { History } from "../../components/History";
import { Text, Flex, Modal, useDisclosure, ModalOverlay, ModalContent, ModalBody, ModalHeader, ModalCloseButton, ModalFooter, Button } from "@chakra-ui/react";
import { Header } from "../../components/Header";

export default function Game() {
  const [ history, setHistory ] = useState<string[]>([])
  const { isOpen, onOpen, onClose } = useDisclosure()

  function handleSetHistory(newLink:string){
    setHistory([...history, newLink])
  }

  useEffect(() => {
    onOpen()
  },[])

  return (
    <div>
      <Header onOpen={onOpen}/>

      <Flex w='100%' flexDirection='column' justify='center' align='center' paddingX='10'>
        <Flex w='100%' maxW='1000px' mt='5'>
          <History history={history} firstWiki={'Potato'} lastWiki={'Neptune'}/>
        </Flex>
        <Flex w='100%' maxW='1000px'>
          <WikiPage handleSetHistory={handleSetHistory} />
        </Flex>
      </Flex>

      
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Como Jogar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text lineHeight='1'>
              Sabe como o wikipedia é cheio de 
              <Text color='blue.700' display='inline-block'>&nbsp;links&nbsp;</Text> 
              no meio do texto?
            </Text>
            <Text >
              Então, o objetivo aqui é começar em uma página da wikipedia aleatoria e chegar em uma outra página apenas clicando nos links.
            </Text>
            <br />
            <Text fontWeight='medium'>
              Um novo WIKISPEED vai ser liberado cada dia!
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>
              Começar
            </Button>
            {/* <Button variant='ghost'>Outra ação</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
