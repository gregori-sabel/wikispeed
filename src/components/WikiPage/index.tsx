import React, { useEffect, useState } from "react";
import { Container, Title } from "./styles";

interface WikiProps{
  title: string;
  html: string;
  handleClickedLink(event: any, link: string): void;
}

export function WikiPage({ html, title, handleClickedLink }: WikiProps){
  const [ dom, setDom ] = useState<Document>();
  
  
  function cleanDom(){
    if(dom){
      const cleanedDom = dom;
      // cleanedDom.querySelector('.infobox')?.remove(); // não retira
      cleanedDom.querySelector('.wikitable')?.remove();
      cleanedDom.querySelector('.mw-collapsible')?.remove();
      cleanedDom.querySelector('.reflist')?.remove();
      document.body.appendChild(cleanedDom.documentElement);
      alterLinks()
    }
  }

  function alterLinks(){
    const ases = document.getElementsByTagName('a');
    var arr = Array.from(ases);
    arr.map(ar => {
      ar.onclick = (event) => {
        handleClickedLink(event, ar.href)
        return false // retorna false para não abrir o link
      }
    })
  }
  
  useEffect(() => {
    const newDom = new DOMParser().parseFromString(html, 'text/html')
    console.log(newDom)
    setDom(newDom)
  
    console.log('chamado 1')

  },[])

  useEffect(() => {
    
    cleanDom()
    console.log('chamado 2')
  },[dom])

  return(
    <Container>
      <Title>{title}</Title>
    </Container>
  )
}