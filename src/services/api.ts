import axios from 'axios'

const api = axios.create ({
  headers: { 
    "Access-Control-Allow-Origin": "*"
  }
})


export { api }