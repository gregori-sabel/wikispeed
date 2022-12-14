import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsClockHistory } from "react-icons/bs";
import { WikiPage } from "../pages";
import { api, wikiApi } from "../services/api";
import { HistoryWiki } from './HistoryWiki'
import Cookies from 'js-cookie'


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
  
  async function winGame() {

    const userName = Cookies.get('user-name')
    const userId = Cookies.get('user-id')
    
    await api.post('api/saveHistoric', {
      historic: history,
      userName,
      userId
    })

    openSuccessModal()
  }

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

    handleSetHistory({linkName: pageName, cleanTitle: pageCleanTitle})
    
    if(pageCleanTitleWithoutSpecifications === successWiki.cleanTitle){
      winGame()
    }

    loadNewPage(pageName, pageCleanTitle)

  }

  
  function removeUndesirableClasses(dom: Document){

    try{
      const classesToRemove = ['.wikitable', '.mw-collapsible', '.reflist', '.refbegin', 
      '.navbox', '.mw-ref', '.metadata', '.noprint', '#Refer??ncias', 
      '.pcs-edit-section-title', '.pcs-edit-section-header', '.pcs-edit-section-link-container']
  
      classesToRemove.forEach((classe) => {
        dom.querySelectorAll(classe).forEach(box => {
          box.remove();
        });
      })
  
      dom.querySelector('.hatnote').getElementsByTagName('img')[0].remove()
      dom.querySelector('.hatnote').getElementsByTagName('img')[0].remove()

    } catch (err) {
      console.log(err)
    }

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
        if(
          tagA.className == 'new' || !(tagA.href.includes(baseLocalURL) || tagA.href.includes(baseVercelURL))
        ){        
          // aqui deveria tirar a possibilidade de clicar nesse link
          tagA.removeAttribute('href')
          tagA.style.setProperty('text-decoration', 'none')
          tagA.style.setProperty('cursor', 'default')
          tagA.style.setProperty('color', 'gray')
        } else {
          tagA.onclick = (event) => {
            handleClickedLink(event, tagA.href)
            return false
          } 
        }
        return false // retorna false para n??o abrir o link
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

      <Flex maxW='860px' mt='5' mb='4' align='center' gap='10px'>
        <BsClockHistory />
        <HistoryWiki 
          history={history} 
          handleReturnLink={handleReturnLink}
        />      
      </Flex>
      <hr />
      {/* { window.innerWidth > 770 && */}
        <Text fontSize='3xl' fontWeight='bold'>{wikiInfo.cleanTitle}</Text>
      {/* } */}
      {/* <hr /> */}
      { dom &&
        <div className='wikipedia' dangerouslySetInnerHTML={{__html: dom.documentElement?.outerHTML}}/>   
      }
    </Box>
  )
}