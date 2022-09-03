import React from "react";
import { Text, Modal, useDisclosure, ModalOverlay, ModalContent, ModalBody, ModalHeader, ModalCloseButton, ModalFooter, Button } from "@chakra-ui/react";

interface HelpModalProps{
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
}

export function HelpModal({ isOpen, onClose, onOpen}: HelpModalProps) {
  return(
    <Modal isOpen={isOpen} onClose={onClose} size='xl' >
      <ModalOverlay           
        bg='blackAlpha.600'
        backdropFilter='auto'
        backdropBlur='4px'
      />
      <ModalContent bg='white'>
        <ModalHeader>Como Jogar</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* <Text lineHeight='1'>
            Sabe como a <strong>wikipedia</strong> é cheia de 
            <Text color='blue.700' display='inline-block'>&nbsp;links&nbsp;</Text> 
            no meio do texto?
          </Text> */}
          <Text >
            O objetivo é&nbsp;
            <strong>sair de uma página da wikipedia </strong>
            aleatória e&nbsp;
            <strong>chegar em uma outra página </strong>
            apenas&nbsp;
            <strong>clicando nos </strong>
            <a>links</a>.
          </Text>
          <br />
          <Text fontWeight='regular'>
            Um novo <strong>WikiSpeed </strong> vai ser liberado cada dia!
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose} bg='blue.300'>
            Começar
          </Button>
          {/* <Button variant='ghost'>Outra ação</Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>    
  )
}