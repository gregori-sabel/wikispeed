import axios from 'axios'

const api = axios.create ({
  // headers: {"Access-Control-Allow-Origin": "*"}
})

api.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
api.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export { api }