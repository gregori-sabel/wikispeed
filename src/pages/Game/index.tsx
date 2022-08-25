import React from "react";
import { useEffect, useState } from "react"

import { WikiPage } from "../../components/WikiPage/index";
import { History } from "../../components/History/index";
import { Text, Flex, Modal, useDisclosure, ModalOverlay, ModalContent, ModalBody, ModalHeader, ModalCloseButton, ModalFooter, Button } from "@chakra-ui/react";

export default function Game() {
  const [ history, setHistory ] = useState(['Potato'])
  const { isOpen, onOpen, onClose } = useDisclosure()

  function handleSetHistory(newLink:string){
    console.log(newLink)
    setHistory([...history, newLink])
  }

  useEffect(() => {
    // onOpen()
  },[])

  return (
    <div>
      <Flex bg='gray.100' py='3' px='5' align='center' justify='space-between'>
        <Flex w='300px' justify='start'>

        </Flex>
        <Flex w='300px' justify='center'>
          <Text fontWeight='bold' fontSize='xl' m='0' p='0' justifySelf='center'>WikiSpeed</Text>
        </Flex>
        <Flex w='300px' justify='end'>
          <Button onClick={onOpen} bg='gray.200'justifySelf='end'>Como Jogar</Button>
        </Flex>
      </Flex>

      <Flex w='100%' flexDirection='column' justify='center' align='center' paddingX='10'>
        <Flex w='100%' maxW='1000px' mt='5'>
          <History history={history}/>
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
