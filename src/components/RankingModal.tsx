import React from "react";
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

interface SuccessModalProps {
  isOpen: boolean;
  onClose(): void;
}

export function RankingModal({ isOpen, onClose }: SuccessModalProps) {

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <ModalOverlay
        bg='blackAlpha.600'
        backdropFilter='auto'
        backdropBlur='4px'
      />
      <ModalContent bg='white'>
        <ModalHeader>Ranking</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Funcionalidade em construção!
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>
            Fechar
          </Button> 
          {/* {/* <Button variant='ghost'>Outra ação</Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}