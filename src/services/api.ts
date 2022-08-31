import axios from 'axios'

const wikiApi = axios.create ({
  baseURL: 'https://pt.wikipedia.org/api/rest_v1/'
})

wikiApi.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
wikiApi.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const api = axios.create ({
})

api.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
api.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export { api, wikiApi }