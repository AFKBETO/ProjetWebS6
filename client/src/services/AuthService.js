import { Api, getCookie } from '@/services/Api'

export function register (credentials) {
  return Api().post('register', credentials)
}

export async function login (credentials) {
  const response = await Api().post('login', credentials)
  document.cookie = `displayName=${response.data.username}; max-age=3600`
  document.cookie = `profile=${response.data.profile}; max-age=3600`
}

export function logout () {
  Api().post('logout')
  document.cookie = `displayName=;`
  document.cookie = `profile=;`
}

export function isAdmin () {
  if (getCookie('profile') === 'admin') {
    return true
  }
  return false
}

export function isLoggedIn () {
  return !(!getCookie('displayName'))
}
