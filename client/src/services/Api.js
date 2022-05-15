import axios from 'axios'

export function Api () {
  return axios.create({
    baseURL: `http://localhost:3001/api/`,
    withCredentials: true,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3001',
      'Access-Control-Allow-Credentials': true,
      'Content-Type': 'application/json'
    }
  })
}

export function getCookie (name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
  return ''
}
