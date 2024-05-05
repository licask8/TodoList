import axios from 'axios'

// faz a conexão com a API
export const api = axios.create({
  baseURL: 'http://localhost:3333',
})