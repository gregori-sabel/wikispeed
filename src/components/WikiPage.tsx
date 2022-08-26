import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { api } from "../services/api";

interface WikiProps{
  handleSetHistory(link: string): void;
  openSuccessModal(): void;
  successWiki: string;
}

interface WikiInfo{
  title: string;
  html: string;
}

export function WikiPage({ handleSetHistory, openSuccessModal, successWiki }: WikiProps){
  const [ wikiInfo, setWikiInfo ] = useState<WikiInfo>({} as WikiInfo);
  const [ dom, setDom ] = useState<Document>();
  

  // ao clicar num link, chama a nova pagina da wiki
  function handleClickedLink(event, link: string) {
    const pageName = link
    .replace('http://en.wikipedia.org/wiki/', '')

    const pageCleanTitle = pageName
      .replace('_', ' ')
      .replace('#', ' - ')

    if(pageCleanTitle === successWiki){
      openSuccessModal()
    }

    api.get(pageName)
      .then(res => {
        setWikiInfo({ title: pageCleanTitle, html: res.data})
      })

    window.scrollTo({
        top: 0,
        // behavior: 'smooth',
    });

    handleSetHistory(pageCleanTitle)
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

  },[wikiInfo])
  
  // chama a pagina da wiki
  useEffect(() => { 
    api.get('potato')
      .then(res => {
        setWikiInfo({title: 'Potato', html: res.data})      
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