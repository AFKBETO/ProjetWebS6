import { Api, getCookie } from '@/services/Api'
import decode from 'jwt-decode'

export function register (credentials) {
  return Api().post('register', credentials)
}

export async function login (credentials) {
  const response = await Api().post('login', credentials)
  document.cookie = `token=${response.data.token}; max-age=3600`
}

export function logout () {
  clearAuthToken()
}

export function setAuthToken () {
  const token = getCookie('token')
  Api().defaults.headers.common['Authorization'] = `Bearer ${token}`
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
  return getCookie('token')
}

export function clearAuthToken () {
  document.cookie = 'token='
}

export function isLoggedIn () {
  const authToken = getAuthToken()
  if (authToken) {
    const data = decode(authToken)
    document.cookie = `displayName=${data.username}; max-age=3600`
  } else {
    document.cookie = `displayName=`
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
