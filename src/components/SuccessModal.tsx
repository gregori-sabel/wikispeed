import React, { useState } from "react";
import { 
  Text, 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalBody, 
  ModalHeader, 
  ModalCloseButton, 
  ModalFooter, 
  Button, 
  Flex
} from "@chakra-ui/react";
import { HistoryBlock } from "../components/History";

interface SuccessModalProps {
  isOpen: boolean;
  onClose(): void;
  history: HistoryBlock[];
  firstWiki: string;
}

export function SuccessModal({ isOpen, onClose, history, firstWiki }: SuccessModalProps) {
  const [ shareMessage, setShareMessage ] = useState('Share');
  const [ buttonColor, setButtonColor ] = useState('green.400');

  function handleShareResults(){
    setShareMessage('Copied!')
    setButtonColor('gray.100')

    const historyNames = history.map(historyBLock => historyBLock.title)
    console.log(historyNames)

    const postMessage = firstWiki + ' - ' + historyNames.reduce( (acc, valor) => {
      return acc + ' - ' + valor
    } )

    navigator.clipboard.writeText(postMessage)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <ModalOverlay
        bg='blackAlpha.600'
        backdropFilter='auto'
        backdropBlur='4px'
      />
      <ModalContent>
        <ModalHeader>Vitória!!!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Agora que ganhastes, lances um post na sua rede social favorita para seus 
            amigos tentarem vencer seu record
          </Text>
          <br />
          <Flex >
            <Button 
              bg={buttonColor}
              onClick={handleShareResults}
              _hover={{
                opacity: '0.7'
              }}
            >
              <Text color='black' fontWeight='medium'>
                {shareMessage}
              </Text>
            </Button>
          </Flex>
          <br />
          <Text fontWeight='medium'>
            Um novo WIKISPEED vai ser liberado cada dia!
          </Text>
        </ModalBody>

        <ModalFooter>
          {/* <Button onClick={onClose}>
            Começar
          </Button> */}
          {/* <Button variant='ghost'>Outra ação</Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}