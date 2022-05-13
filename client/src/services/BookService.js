import { Api, setBearer } from '@/services/Api'
import { isAdmin } from './AuthService'

export function fetchBooks () {
  setBearer()
  return Api().get('books')
}

export function createBook (bookData) {
  if (!isAdmin()) {
    throw new Error('You do not have sufficient permission.')
  }
  setBearer()
  return Api().post('books', bookData)
}

export function editBook (bookId, bookData) {
  if (!isAdmin()) {
    throw new Error('You do not have sufficient permission.')
  }
  setBearer()
  return Api().put(`books/${bookId}`, bookData)
}

export function deleteBook (bookId) {
  if (!isAdmin()) {
    throw new Error('You do not have sufficient permission.')
  }
  setBearer()
  return Api().delete(`books/${bookId}`)
}
