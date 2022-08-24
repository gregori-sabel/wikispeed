import React from "react";
import { useEffect, useState } from "react"

import { WikiPage } from "../../components/WikiPage/index";
import { History } from "../../components/History/index";
import { Container, Wrapper } from "./styles";

interface WikiInfo{
  title: string;
  html: string;
}

export default function Home() {
  const [ history, setHistory ] = useState([''])

  function handleSetHistory(newLink:string){
    console.log(newLink)
    setHistory([...history, newLink])
  }

  return (
    <div>
      <History history={history}/>
      <div style={{width:'100%', display:'flex', justifyContent: 'center'}}>
        <WikiPage handleSetHistory={handleSetHistory} />
      </div>
    </div>
  )
}
