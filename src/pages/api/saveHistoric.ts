import { NextApiRequest, NextApiResponse} from 'next'
import { fauna } from '../../services/fauna'
import { query as q} from 'faunadb'

// USER          | id, name
// user_historic | user_id, date,  historic

// interface DailyGame {
//   data: {
//     start_wiki: string;
//     end_wiki: string;
//   }
// }

export default async ( request: NextApiRequest, response: NextApiResponse ) => {
  const { historic, userName, userId } = request.body
  console.log(historic)

  const date = Intl.DateTimeFormat('pt-BR',{
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(new Date());
  

  // ver se há usuario assim
  try {

    const res = await fauna.query(
      q.Get(
        q.Match(
          q.Index('user_by_id'),
          q.Casefold(userId)
        )
      )
    )
    console.log(res)

  } catch (err){
    // console.log(err) 
    try {
      // salvar usuário
      const UserToSave = {
        user_id: userId,
        name: userName
      }

      await fauna.query(
        q.Create(
          q.Collection('users'),
          {data: UserToSave}
        )
      )

    } catch (err) {
      console.log(err)
    }
  } finally {

    try{
      
      const cleanHistoric = historic.map(hist => {
        return hist.cleanTitle;
      })
      console.log(cleanHistoric)
    
    
      await fauna.query(
        q.Create(
          q.Collection('user_historic'),
          {
            data: {
              user_id: userId,
              user_name: userName,
              date,
              historic: cleanHistoric
            } 
          }
        )
      )
    } catch (err) {
      console.log(err)
    }

  }

  return response.json({erro: 'deu erro msm'})


}