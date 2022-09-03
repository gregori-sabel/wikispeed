import { NextApiRequest, NextApiResponse} from 'next'
import { fauna } from '../../services/fauna'
import { query as q} from 'faunadb'
import { wikiApi } from '../../services/api';

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
      .get('page/title/'+data.start_wiki)
      .then(res => res.data.items[0].title);

    const endTitle = await wikiApi
      .get('page/title/'+encodeURI('orgânico'))
      .then(res => res.data.items[0].title);


    const initialWikis = {
      startWiki: startTitle,
      endWiki: endTitle
    }
   
  
    return response.json(initialWikis)

  } catch (err) {
    console.log('erro:',err)
  }

  return response.json({erro: 'deu erro msm'})


}