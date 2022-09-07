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
  const baseLocalURL = 'http://localhost:3000/'
  const baseVercelURL = 'https://wikispeed.vercel.app/'
  
  function loadNewPage(linkName: string, cleanTitle: string) {
    if ( window.innerWidth < 770 ){
      wikiApi.get('page/mobile-html/' + linkName)
        .then(res => {
          // console.log(res.data)
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
      .replace(baseLocalURL, '')
      .replace(baseVercelURL, '')
      
    const pageCleanTitle = decodeURI(
      pageName
        .replaceAll('_', ' ')
        .replaceAll('#', ' - ')
    )

    const pageCleanTitleWithoutSpecifications = (pageCleanTitle.split('(')[0]).trim()

    if(pageCleanTitleWithoutSpecifications === successWiki.cleanTitle){
      openSuccessModal()
    }


    loadNewPage(pageName, pageCleanTitle)

    handleSetHistory({linkName: pageName, cleanTitle: pageCleanTitle})
  }

  
  function removeUndesirableClasses(dom: Document){

    const classesToRemove = ['.wikitable', '.mw-collapsible', '.reflist', '.refbegin', 
    '.navbox', '.mw-ref', '.metadata', '.noprint', '#Referências', 
    '.pcs-edit-section-title', '.pcs-edit-section-header']

    classesToRemove.forEach((classe) => {
      dom.querySelectorAll(classe).forEach(box => {
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
        if(tagA.href.includes(baseLocalURL) || tagA.href.includes(baseVercelURL)){
          tagA.onclick = (event) => {
            handleClickedLink(event, tagA.href)
            return false
          } 
        } else {
            // aqui deveria tirar a possibilidade de clicar nesse link
            tagA.removeAttribute('href')
            tagA.style.setProperty('text-decoration', 'none')
            tagA.style.setProperty('cursor', 'default')
            tagA.style.setProperty('color', 'gray')
          }
          return false // retorna false para não abrir o link
        })
    }
  }

  // chama a pagina da wiki
  useEffect(() => {     
    loadNewPage(startWiki.cleanTitle, startWiki.cleanTitle)
  },[])
    
  // atualiza dom que vai preencher a tela
  useEffect(() => {   
    if(wikiInfo.html) {

      const newDom = new DOMParser().parseFromString(wikiInfo.html, 'text/html')

      removeUndesirableClasses(newDom)
  
      setDom(newDom)
  
    }

  },[wikiInfo])


  useEffect(() => {   
    alterLinks()
  },[dom])
  

  return(
    <Box overflow='hidden'>

      <Flex maxW='860px' mt='5' >
        <HistoryWiki 
          history={history} 
          handleReturnLink={handleReturnLink}
        />      
      </Flex>
      {/* { window.innerWidth > 770 && */}
        <Text fontSize='3xl' fontWeight='bold'>{wikiInfo.cleanTitle}</Text>
      {/* } */}
      <hr />
      { dom &&
        <div className='wikipedia' dangerouslySetInnerHTML={{__html: dom.documentElement?.outerHTML}}/>   
      }
    </Box>
  )
}