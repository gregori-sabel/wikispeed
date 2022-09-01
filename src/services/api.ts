import axios from 'axios'

const wikiApi = axios.create ({
  baseURL: 'https://pt.wikipedia.org/api/rest_v1/'
})

wikiApi.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
wikiApi.defaults.headers.post['Access-Control-Allow-Origin'] = '*';


// console.log('baseURL', process.env.BASE_URL)
// console.log('fauna', process.env.FAUNADB_KEY)
const api = axios.create ({
  baseURL: 'http://localhost:3000/'
  
})

api.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
api.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export { api, wikiApi }