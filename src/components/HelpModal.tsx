import React from "react";
import { Text, Modal, useDisclosure, ModalOverlay, ModalContent, ModalBody, ModalHeader, ModalCloseButton, ModalFooter, Button } from "@chakra-ui/react";

interface HelpModalProps{
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
}

export function HelpModal({ isOpen, onClose, onOpen}: HelpModalProps) {
  return(
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <ModalOverlay           
        bg='blackAlpha.600'
        backdropFilter='auto'
        backdropBlur='4px'
      />
      <ModalContent>
        <ModalHeader>Como Jogar</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text lineHeight='1'>
            Sabe como a <strong>wikipedia</strong> é cheia de 
            <Text color='blue.700' display='inline-block'>&nbsp;links&nbsp;</Text> 
            no meio do texto?
          </Text>
          <Text >
            O objetivo aqui é <strong>começar em uma página da wikipedia</strong> aleatória e <strong>chegar em uma outra página</strong> apenas <strong>clicando nos links</strong>.
          </Text>
          <Text >
            Tente ser o mais eficiente possível
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
  )
}