import React, { useEffect, useState } from "react";
import { Container, Title } from "./styles";

interface WikiProps{
  handleSetHistory(link: string): void;
}

interface WikiInfo{
  title: string;
  html: string;
}

export function WikiPage({ handleSetHistory }: WikiProps){
  const [ wikiInfo, setWikiInfo ] = useState<WikiInfo>({} as WikiInfo);
  const [ dom, setDom ] = useState<Document>();
  

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
      // console.log('handle chamado', html)
    })
    handleSetHistory(pageTitle)
  }

  
  function removeEachClass(dom: Document, classes: string[]){
    classes.forEach((classe) => {
      dom.querySelectorAll(`.${classe}`).forEach(box => {
        box.remove();
      });
    })
  }
  

  function alterLinks(){
    const tagsA = document.getElementsByTagName('a');
    console.log('tagsA',tagsA)
    var arrayTagsA = Array.from(tagsA);
    arrayTagsA.map(tagA => {
      tagA.onclick = (event) => {
        handleClickedLink(event, tagA.href)
        return false // retorna false para não abrir o link
      }
    })
  }
  
  useEffect(() => {   
    alterLinks()

  },[dom])

  useEffect(() => {   
    const newDom = new DOMParser().parseFromString(wikiInfo.html, 'text/html')
    const classesToRemove = ['wikitable', 'mw-collapsible', 'reflist', 'refbegin', 'navbox']
    removeEachClass(newDom, classesToRemove)

    setDom(newDom)    
    alterLinks()

  },[wikiInfo])
  
  // chama a pagina da wiki
  useEffect(() => { 
    fetch(`https://en.wikipedia.org/api/rest_v1/page/html/potato`)
      .then(res => res.text())
      .then(text => {
        setWikiInfo({title: 'potato', html: text})      
      })

  },[])
  
  return(
    <div style={{width:'1000px'}}>
      <Title>{wikiInfo.title}</Title>
      { dom &&
        <div dangerouslySetInnerHTML={{__html: dom.documentElement?.outerHTML}}/>
      }      
    </div>
  )
}