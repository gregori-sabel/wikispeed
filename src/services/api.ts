import axios from 'axios'

const api = axios.create ({
  headers: { 
    "Access-Control-Allow-Origin": "*", 
    "Access-Control-Allow-Credentials": true 
  }
})


export { api }