import { useEffect, useState } from "react"

import { WikiPage } from "../components/WikiPage/index";
import { History } from "../components/History/index";

interface WikiInfo{
  title: string;
  html: string;
}

export default function Home() {
  const [ wikiInfo, setWikiInfo ] = useState<WikiInfo>({} as WikiInfo);
  const [ history, setHistory ] = useState([])

  // ao clicar num link, chama a nova pagina da wiki
  function handleClickedLink(event, link: string) {
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
    <>
      <History history={history}/>
      { wikiInfo.title  &&
        <WikiPage html={wikiInfo.html} title={wikiInfo.title} handleClickedLink={handleClickedLink}/>
      }
    </>
  )
}
