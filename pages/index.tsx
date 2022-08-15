import { useEffect, useState } from "react"

export default function Home() {
  const [ potato, setPotato ] = useState('');

  // ao clicar num link, chama a nova pagina da wiki
  function handleClickedLink(event, link: string) {
    event.preventDefault()
    console.log(link)

    fetch(`https://en.wikipedia.org/api/rest_v1/page/html/${link}`)
      .then(res => res.text())
      .then(text => setPotato(text))
  }

  // chama a pagina da wiki
  useEffect(() => { 
    fetch(`https://en.wikipedia.org/api/rest_v1/page/html/potato`)
      .then(res => res.text())
      .then(text => setPotato(text))

    // tentativa falha de alterar as tags
    const aTags = document.getElementsByTagName('a');
    const aTagsList = Array.from(aTags);
    aTagsList.map(tag => {
      tag.onclick = () => handleClickedLink(event, tag.href)
      // tag.href = '#'
    })
      
    // outra tentativa falha de alterar as tags
    // const ases = document.getElementsByTagName('a');
    // var arr = Array.from(ases);
    // arr.map(ar => {
    //   ar.href = '#'
    //   ar.onclick = () => {
    //     console.log('clicou fei')
    //   }
    //   console.log(ar.href)
    // })
  },[])


  return (
    <>
      {/* tags para tentar alterar  */}
      <h1>Helo uma ova!</h1>
      <a href="/potato">coisas loucas</a>
      <br />
      <a href="/batata">coisas loucas</a>
      <br />
      <a href="/polvora">coisas loucas</a>

      {/* A pagina da wiki, comentada pra teste*/}
      {/* { potato && (
        <>
          <div 
            dangerouslySetInnerHTML={{__html: potato}}
          />
        </>
      )} */}
    </>
  )
}
