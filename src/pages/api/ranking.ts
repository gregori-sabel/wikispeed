import { NextApiRequest, NextApiResponse} from 'next'
import { fauna } from '../../services/fauna'
import { query as q} from 'faunadb'

interface QueryData {
  data: {
    data: {
      user_id: string;
      user_name: string;
      historic: string[];
    }
  }[]
}

interface RankingData {
  userName: string;
  historic: string[]
}

export default async ( request: NextApiRequest, response: NextApiResponse<RankingData[]> ) => {
  const { historic, userName, userId } = request.body

  const date = Intl.DateTimeFormat('pt-BR',{
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(new Date());
  
  // ver se há usuario assim
  try {

    const { data } = await fauna.query<QueryData>(
      q.Map(
        q.Paginate(q.Match(q.Index("all_historics"))),
        q.Lambda('historicRef', q.Get(q.Var('historicRef')))
      )
    )

    const responseData = data.map(hist => {
      return {
        userId: hist.data.user_id,
        userName: hist.data.user_name,
        historic: hist.data.historic
      }
    })

    return response.json(responseData)

  } catch (err){
    console.log(err)

  }

  return response.status(500).send();


}