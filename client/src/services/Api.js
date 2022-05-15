import axios from 'axios'

export function Api () {
  return axios.create({
    baseURL: `http://localhost:3001/api/`,
    withCredentials: true
  })
}

export function getCookie (name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
  return ''
}
