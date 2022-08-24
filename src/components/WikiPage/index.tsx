import React, { useEffect, useState } from "react";
import { Container, Title } from "./styles";

interface WikiProps{
  wikiInfo: {
    title: string;
    html: string;
  }
  handleClickedLink(event: any, link: string): void;
}

export function WikiPage({ wikiInfo, handleClickedLink }: WikiProps){
  const [ dom, setDom ] = useState<Document>();
  
  function removeEachClass(dom: Document, classes: string[]){
    classes.forEach((classe) => {
      dom.querySelectorAll(`.${classe}`).forEach(box => {
        box.remove();
      });
    })
  }
  
  function cleanDom(){
    if(dom){
      const creaningDom = dom
      const classesToRemove = ['wikitable', 'mw-collapsible', 'reflist', 'refbegin', 'navbox']
      removeEachClass(creaningDom, classesToRemove)
      console.log('grg',dom)

      // document.querySelector('.container').appendChild(creaningDom.documentElement);
      alterLinks()
    }
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
    const newDom = new DOMParser().parseFromString(wikiInfo.html, 'text/html')
    setDom(newDom)
  
  },[])

  useEffect(() => {    
    cleanDom()
    alterLinks()
  },[dom])

  return(
    <Container>
      <Title>{wikiInfo.title}</Title>
      { dom &&
        <div dangerouslySetInnerHTML={{__html: dom.documentElement?.outerHTML}}/>
      }      
    </Container>
  )
}