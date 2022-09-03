import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { trim } from "jquery";
import React, { useEffect, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { WikiPage } from "../pages";
import { wikiApi } from "../services/api";
import { HistoryWiki } from './HistoryWiki'


interface WikiProps{
  startWiki: WikiPage;
  handleSetHistory(historyBlock: WikiPage): void;
  history: WikiPage[];
  openSuccessModal(): void;
  successWiki: WikiPage;
}

interface WikiInfo{
  cleanTitle: string;
  html: string;
}

export function WikiPage({ handleSetHistory, openSuccessModal, history, successWiki, startWiki }: WikiProps){
  const [ wikiInfo, setWikiInfo ] = useState<WikiInfo>({} as WikiInfo);
  const [ dom, setDom ] = useState<Document>();
  const [ isMobile, setIsMobile ] = useState(true);
  
  function loadNewPage(linkName: string, cleanTitle: string) {
    if ( isMobile ){
      wikiApi.get('page/mobile-html/' + linkName)
        .then(res => {
          setWikiInfo({cleanTitle: cleanTitle, html: res.data})      
        })
    } else {
      wikiApi.get('page/html/' + linkName)
      .then(res => {
        setWikiInfo({ cleanTitle: cleanTitle, html: res.data})
      })
    }

    window.scrollTo({
        top: 0
    });  
    
  }

  function handleReturnLink(wikiPage: WikiPage){

    loadNewPage(wikiPage.linkName, wikiPage.cleanTitle)
  }

  // ao clicar num link, chama a nova pagina da wiki
  function handleClickedLink(event, link: string) {
    const pageName = link
      .replace('http://localhost:3000/', '')
      .replace('https://wikispeed.vercel.app/', '')
      
    const pageCleanTitle = decodeURI(
      pageName
        .replaceAll('_', ' ')
        .replaceAll('#', ' - ')
    )

    const pageCleanTitleWithoutSpecifications = trim(pageCleanTitle.split('(')[0])

    console.log('pageCleanTitle', pageCleanTitle)
    console.log('successWiki', successWiki.cleanTitle)
    console.log('pageCleanTitleWithoutSpecifications', pageCleanTitleWithoutSpecifications)

    if(pageCleanTitleWithoutSpecifications === successWiki.cleanTitle){
      openSuccessModal()
    }


    loadNewPage(pageName, pageCleanTitle)

    handleSetHistory({linkName: pageName, cleanTitle: pageCleanTitle})
  }

  
  function removeEachClass(dom: Document, classes: string[]){
    classes.forEach((classe) => {
      dom.querySelectorAll(`.${classe}`).forEach(box => {
        box.remove();
      });
    })
  }
  
  // altera todos os links da wiki
  function alterLinks(){
    const wikipediaElement = document.getElementsByClassName('wikipedia')[0]

    const baseURLElement = wikipediaElement?.getElementsByTagName('base')[0]
    baseURLElement?.remove()

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
  
  // atualiza dom que vai preencher a tela
  useEffect(() => {   
    const newDom = new DOMParser().parseFromString(wikiInfo.html, 'text/html')
    const classesToRemove = ['wikitable', 'mw-collapsible', 'reflist', 'refbegin', 
                             'navbox', 'mw-ref', 'metadata', 'noprint']
    removeEachClass(newDom, classesToRemove)

    setDom(newDom) 

  },[wikiInfo])


  useEffect(() => {   
    alterLinks()
  },[dom])
  
  // chama a pagina da wiki
  useEffect(() => { 
    setIsMobile(window.innerWidth < 770)
    
    if (window.innerWidth < 770) {
      wikiApi.get('page/mobile-html/' + startWiki.cleanTitle)
        .then(res => {
          // console.log(res.data.lead.sections)
          setWikiInfo({cleanTitle: startWiki.cleanTitle, html: res.data})      
        })
    } else {
      wikiApi.get('page/html/' + startWiki.cleanTitle)
      .then(res => {
        setWikiInfo({cleanTitle: startWiki.cleanTitle, html: res.data})      
      })
    }


  },[])
  
  return(
    <Box overflow='hidden'>

      <Flex maxW='860px' mt='5' >
        <HistoryWiki 
          history={history} 
          handleReturnLink={handleReturnLink}
        />      
      </Flex>
      <Text fontSize='3xl' fontWeight='bold'>{wikiInfo.cleanTitle}</Text>
      <hr />
      { dom &&
        <div className='wikipedia' dangerouslySetInnerHTML={{__html: dom.documentElement?.outerHTML}}/>   
      }
    </Box>
  )
}