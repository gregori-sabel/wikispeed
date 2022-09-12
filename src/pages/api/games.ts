import { NextApiRequest, NextApiResponse} from 'next'
import { fauna } from '../../services/fauna'
import { query as q} from 'faunadb'
import { wikiApi } from '../../services/api';
import duos from '../../../duos.json'
import fs from 'fs'
import { v4 as uuidv4} from 'uuid'

interface DailyGame {
  data: {
    start_wiki: string;
    end_wiki: string;
  }
}

function encodeTitle(title: string) {
  return encodeURI(title)
}

export default async ( request: NextApiRequest, response: NextApiResponse ) => {
  // const { date } = request.query;

  const date = Intl.DateTimeFormat('pt-BR',{
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(new Date());

  
  try{
    const { data }: DailyGame = await fauna.query(
      q.Get(
        q.Match(
          q.Index('game_by_date'),
          q.Casefold(date)
        )
      )
    )

    const startTitle = await wikiApi
      .get('page/title/'+encodeTitle(data.start_wiki))
      .then(res => res.data.items[0].title);

    const endTitle = await wikiApi
      .get('page/title/'+encodeTitle(data.end_wiki))
      .then(res => res.data.items[0].title);


    const initialWikis = {
      startWiki: startTitle,
      endWiki: endTitle
    }
   
  
    return response.json(initialWikis)

  } catch (err) {
    // console.log('erro:',err)

    try{


      const initialWikis = {
        startWiki: duos[0][0],
        endWiki: duos[0][1]
      }

      const newDailyGame = {
          id: uuidv4(),
          date: date,
          start_wiki: duos[0][0],
          end_wiki: duos[0][1]
        }

      await fauna.query(
        q.Create(
          q.Collection('daily_games'),
          {data: newDailyGame}
        )
      )
      // console.log(resposta)

      duos.shift()

      fs.writeFile('./duos.json', JSON.stringify(duos, null, 2), 'utf-8', (error, result) => {
        if(error){
          console.log(error)
          return;
        }
      })

      return response.json(initialWikis)    


    } catch (err) {
      console.log(err)
    }

  }

  return response.json({erro: 'deu erro msm'})


}