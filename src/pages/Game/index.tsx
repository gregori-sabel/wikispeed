import React from "react";
import { useEffect, useState } from "react"

import { WikiPage } from "../../components/WikiPage/index";
import { History } from "../../components/History/index";


export default function Game() {
  const [ history, setHistory ] = useState(['Potato'])

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
