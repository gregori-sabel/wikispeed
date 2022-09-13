import React, { useState } from "react";
import { Text, Modal, useDisclosure, ModalOverlay, ModalContent, ModalBody, ModalHeader, ModalCloseButton, ModalFooter, Button, Input, FormControl, FormLabel, FormHelperText } from "@chakra-ui/react";
import cookie from 'js-cookie'
import { v4 as uuidv4 } from 'uuid'

interface HelpModalProps{
  isOpen: boolean;
  onClose(): void;
  handleSetUserName(name: string): void; 
  userName: string;
}

export function LoginModal({ isOpen, onClose, handleSetUserName, userName}: HelpModalProps) {
  const [ errorMessage, setErrorMessage ] = useState('')

  function handleInformName(){
    if(userName?.length >= 4){
      cookie.set('user-name', userName)
      cookie.set('user-id', uuidv4())
      onClose()
    } else {
      setErrorMessage('Deve conter pelo menos 4 caracteres')
    }
  }
  
  return(
    <Modal isOpen={isOpen} onClose={onClose} size='xl' >
      <ModalOverlay           
        bg='blackAlpha.600'
        backdropFilter='auto'
        backdropBlur='4px'
      />
      <ModalContent bg='white'>
        <ModalHeader>Informe</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Nome</FormLabel>
            <Input type='email' onChange={(e) => handleSetUserName(e.target.value)}/>
            { errorMessage !== '' &&
              <FormHelperText color='red'>{errorMessage}</FormHelperText> 
            } 
            { errorMessage === '' &&
              <FormHelperText>Informe o nome que aparecerá no ranking</FormHelperText> 
            }
            <br />           
            <Button type='submit' onClick={handleInformName} bg='blue.300'>
              Começar
            </Button>
          </FormControl>          
        </ModalBody>

        <ModalFooter justifyContent='space-between'>
          {/* <Button onClick={onClose} bg='blue.300'>
            Começar
          </Button> */}
          {/* <Button variant='ghost'>Outra ação</Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>    
  )
}