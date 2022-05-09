import axios from 'axios'

export function Api () {
  return axios.create({
    baseURL: `http://localhost:3001/api/`
  })
}

export const AUTH_TOKEN_KEY = 'authToken'

export function setBearer () {
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage[AUTH_TOKEN_KEY]}`
}
