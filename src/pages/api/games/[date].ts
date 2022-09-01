import { NextApiRequest, NextApiResponse} from 'next'
import { fauna } from '../../../services/fauna'
import { query as q} from 'faunadb'

export default async ( request: NextApiRequest, response: NextApiResponse ) => {
  const { date } = request.query;

    const dailyGame: any = await fauna.query(
    q.Get(
      q.Match(
        q.Index('game_by_date'),
        q.Casefold("31/08/2022")
      )
    )
  )

  const initialWikis = {
    startWiki: dailyGame.data.start_wiki,
    endWiki: dailyGame.data.end_wiki
  }
 

  return response.json(initialWikis)

}