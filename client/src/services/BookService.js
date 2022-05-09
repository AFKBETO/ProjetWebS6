import { Api, AUTH_TOKEN_KEY } from '@/services/Api'
import axios from 'axios'

function setBearer () {
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage[AUTH_TOKEN_KEY]}`
}

export function fetchBooks () {
  setBearer()
  return Api().get('books')
}

export function createBook (bookData) {
  setBearer()
  return Api().post('books', bookData)
}

export function editBook (bookId, bookData) {
  setBearer()
  return Api().put(`books/${bookId}`, bookData)
}

export function deleteBook (bookId) {
  setBearer()
  return Api().delete(`books/${bookId}`)
}
