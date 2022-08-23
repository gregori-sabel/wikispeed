import React from "react";
import { Container, Link, Title } from "./styles";

interface HistoryProps{
  history: string[]
}

export function History({ history }: HistoryProps){
  return(
    <Container>
      {history?.map(link => (
        <Link key={link}>
          <Title>
            {link}
          </Title>
        </Link>
      ))}
    </Container>
  )
}