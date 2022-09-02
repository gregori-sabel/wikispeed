import { NextApiRequest, NextApiResponse} from 'next'
import { fauna } from '../../../services/fauna'
import { query as q} from 'faunadb'

interface DailyGame {
  data: {
    start_wiki: string;
    end_wiki: string;
  }
}

export default async ( request: NextApiRequest, response: NextApiResponse ) => {
  // const { date } = request.query;

  const date = Intl.DateTimeFormat('pt-BR',{
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(new Date());
  console.log(date)
  
  try{
    const dailyGame: DailyGame = await fauna.query(
      q.Get(
        q.Match(
          q.Index('game_by_date'),
          q.Casefold(date)
        )
      )
    )

    const initialWikis = {
      startWiki: dailyGame.data.start_wiki,
      endWiki: dailyGame.data.end_wiki
    }
   
  
    return response.json(initialWikis)

  } catch (err) {
    console.log('erro:',err)
  }

  return response.json({erro: 'deu erro msm'})


}