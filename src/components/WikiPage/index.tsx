import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

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
    const wikipediaElement = document.getElementsByClassName('wikipedia')[0]
    if(wikipediaElement){
      const tagsA = wikipediaElement.getElementsByTagName('a');
      console.log('tagsA',tagsA)
      var arrayTagsA = Array.from(tagsA);
      arrayTagsA.map(tagA => {
        tagA.onclick = (event) => {
          handleClickedLink(event, tagA.href)
          return false // retorna false para não abrir o link
        }
      })
    }
  }
  
  useEffect(() => {   
    alterLinks()

  },[dom])

  useEffect(() => {   
    const newDom = new DOMParser().parseFromString(wikiInfo.html, 'text/html')
    const classesToRemove = ['wikitable', 'mw-collapsible', 'reflist', 'refbegin', 
                             'navbox', 'mw-ref', 'metadata']
    removeEachClass(newDom, classesToRemove)

    setDom(newDom)    
    alterLinks()

  },[wikiInfo])
  
  // chama a pagina da wiki
  useEffect(() => { 
    fetch(`https://en.wikipedia.org/api/rest_v1/page/html/potato`)
      .then(res => res.text())
      .then(text => {
        setWikiInfo({title: 'Potato', html: text})      
      })

  },[])
  
  return(
    <Box>
      <Text fontSize='3xl' fontWeight='bold'>{wikiInfo.title}</Text>
      <hr />
      { dom &&
        <div className='wikipedia' dangerouslySetInnerHTML={{__html: dom.documentElement?.outerHTML}}/>   
      }
    </Box>
  )
}