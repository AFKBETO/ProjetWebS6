import { Api, AUTH_TOKEN_KEY } from '@/services/Api'
import decode from 'jwt-decode'

export function register (credentials) {
  return Api().post('register', credentials)
}

export function login (credentials) {
  return Api().post('login', credentials)
}

export function logout () {
  clearAuthToken()
}

export function setAuthToken (token) {
  Api().defaults.headers.common['Authorization'] = `Bearer ${token}`
  localStorage.setItem(AUTH_TOKEN_KEY, token)
}

export function isAdmin () {
  const authToken = getAuthToken()
  if (authToken) {
    const data = decode(authToken)
    if (data.profile === 'admin') {
      return true
    }
  }
  return false
}

export function getAuthToken () {
  return localStorage.getItem(AUTH_TOKEN_KEY)
}

export function clearAuthToken () {
  Api().defaults.headers.common['Authorization'] = ''
  localStorage.removeItem(AUTH_TOKEN_KEY)
}

export function isLoggedIn () {
  const authToken = getAuthToken()
  if (authToken) {
    const data = decode(authToken)
    localStorage.setItem(`displayName`, data.username)
    localStorage.setItem(`userId`, data.id_user)
  } else {
    localStorage.removeItem(`displayName`)
    localStorage.removeItem(`userId`)
  }
  return !(!authToken) && !isTokenExpired(authToken)
}

function getTokenExpirationDate (encodedToken) {
  let token = decode(encodedToken)
  if (!token.exp) {
    return null
  }

  let date = new Date(0)
  date.setUTCSeconds(token.exp)

  return date
}

function isTokenExpired (token) {
  let expirationDate = getTokenExpirationDate(token)
  return expirationDate < new Date()
}
