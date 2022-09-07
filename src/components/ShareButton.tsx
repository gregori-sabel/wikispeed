import { Button, Text } from "@chakra-ui/react";
import React, { useState } from "react";

import { WikiPage } from "../pages";

interface Props {
  history: WikiPage[];
  text: string;
  secret?: boolean
}

export function ShareButton({ text, history, secret = false}:Props) {
  const [ shareMessage, setShareMessage ] = useState(text);
  const [ buttonColor, setButtonColor ] = useState('green.400');

  function handleShareResults(){
    setShareMessage('Copied!')
    setButtonColor('gray.100')

    const historyNames = history.map(historyBLock => historyBLock.cleanTitle)

    const postMessage = `Cheguei em ${historyNames.length -1} cliques hoje: 🎉\n`  
      + ' - '
      + historyNames.reduce( (acc, valor) => {
        if(secret){
          return historyNames[0] 
          + '\n - ' + '_(segredo)_'
          + '\n - ' + historyNames[historyNames.length -1]
        } else {
          return  (`${acc} \n - ${valor}`)
        }
      } )
      + '\n'
      + '\n'
      + '*Te ⚔desafio⚔ a tentar:*\n'  
      + '---> *wikispeed.vercel.app* <---' 

    navigator.clipboard.writeText(postMessage)
  }

  return(
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

  )
}