import React, { useEffect, useState } from "react";
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
import { api } from "../../services/api";
import { Ranking } from "./Ranking";

interface SuccessModalProps {
  isOpen: boolean;
  onClose(): void;
}

interface RankingData {
  userId: string;
  userName: string;
  historic: string[]
}

export function RankingModal({ isOpen, onClose }: SuccessModalProps) {
  const [ ranking, setRanking ] = useState<RankingData[]>([])
  
  async function getRanking(){
    const { data }  = await api.get('api/ranking')
    if(data[0]){
      setRanking(data)
    }
  }


  useEffect(() => {
    if(isOpen){
      getRanking()
      // console.log(ranking.length)
    }
  }, [isOpen])


  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <ModalOverlay
        bg='blackAlpha.600'
        backdropFilter='auto'
        backdropBlur='4px'
      />
      <ModalContent bg='white'>
        <ModalHeader>Ranking do dia</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Funcionalidade em testes đˇââď¸đ§đˇââď¸</Text>
          
          <Ranking ranking={ranking}/>

        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>
            Fechar
          </Button> 
          {/* {/* <Button variant='ghost'>Outra aĂ§ĂŁo</Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}