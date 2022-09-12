import React from "react";
import { Text, Modal, useDisclosure, ModalOverlay, ModalContent, ModalBody, ModalHeader, ModalCloseButton, ModalFooter, Button } from "@chakra-ui/react";

interface HelpModalProps{
  isOpen: boolean;
  onClose(): void;
}

export function HelpModal({ isOpen, onClose}: HelpModalProps) {
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
        <ModalBody paddingY='40px'>
          <Text >
            O objetivo é&nbsp;
            <strong>sair de uma página </strong>
            da wikipedia e&nbsp;
            <strong>chegar em outra página </strong>
            <strong>através dos </strong>
            <a>links</a>.
          </Text>
          <br />
          <Text fontWeight='regular'>
            Um novo <strong>WikiSpeed </strong> vai ser liberado cada dia!
          </Text>
        </ModalBody>

        <ModalFooter justifyContent='space-between'>
          <Text >
            By: <a href="https://www.linkedin.com/in/gregori-sabel/" target="_blank">Grégori Sabel</a>
          </Text>
          <Button onClick={onClose} bg='blue.300'>
            Começar
          </Button>
          {/* <Button variant='ghost'>Outra ação</Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>    
  )
}