import axios from 'axios'

const api = axios.create ({
  baseURL: 'https://pt.wikipedia.org/api/rest_v1/page/html/'
})

api.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
api.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export { api }