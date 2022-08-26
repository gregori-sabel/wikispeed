import axios from 'axios'

const api = axios.create ({
})

axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

export { api }