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
  const [ wikiInfo, setWikiInfo ] = useState<WikiInfo>({} as WikiInfo);
  const [ history, setHistory ] = useState([])

  // ao clicar num link, chama a nova pagina da wiki
  function handleClickedLink(event: React.FormEvent<HTMLInputElement>, link: string) {
    event.preventDefault();
    const pageTitle = link
      .replace('http://en.wikipedia.org/wiki/', '')
      .replace('_', ' ')
      .replace('#', ' - ')

    const htmlPage = link.replace(
      'http://en.wikipedia.org/wiki/', 
      'https://en.wikipedia.org/api/rest_v1/page/html/')

    fetch(htmlPage)
    .then(res => res.text())
    .then(html => {
      setWikiInfo({ title: pageTitle, html})
      // console.log('handle chamado', html)
    })

    setHistory([...history, pageTitle])
  }

  // chama a pagina da wiki
  useEffect(() => { 
    fetch(`https://en.wikipedia.org/api/rest_v1/page/html/potato`)
      .then(res => res.text())
      .then(text => {
        setWikiInfo({title: 'potato', html: text})      
      })
  },[])


  return (
    <div>
      <History history={history}/>
      <div style={{width:'100%', display:'flex', justifyContent: 'center'}}>
        { wikiInfo.title  && 
          <WikiPage wikiInfo={wikiInfo} handleClickedLink={handleClickedLink}/>
          // <p style={{width: '50px', backgroundColor: 'black'}}>sfdf</p>
        }
      </div>
    </div>
  )
}
