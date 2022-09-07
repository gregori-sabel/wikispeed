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
import { WikiPage } from "../pages";
import { ShareButton } from "./ShareButton";

interface SuccessModalProps {
  isOpen: boolean;
  onClose(): void;
  history: WikiPage[];
}

export function SuccessModal({ isOpen, onClose, history }: SuccessModalProps) {


  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <ModalOverlay
        bg='blackAlpha.600'
        backdropFilter='auto'
        backdropBlur='4px'
      />
      <ModalContent bg='white'>
        <ModalHeader>Vitória!!!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Agora que ganhastes, lances um post na sua rede social favorita para seus 
            amigos tentarem vencer seu record
          </Text>
          <br />
          <Flex flexDir='column' gap='20px' marginY='20px'>
            <ShareButton text='Compartilhar histórico' history={history} />
            <ShareButton text='Compartilhar sem revelar' history={history} secret />
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