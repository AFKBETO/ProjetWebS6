import { Api } from '@/services/Api'
import { isAdmin } from './AuthService'

export function fetchBooks () {
  return Api().get('books')
}

export function createBook (bookData) {
  if (!isAdmin()) {
    throw new Error('You do not have sufficient permission.')
  }
  return Api().post('books', bookData)
}

export function editBook (bookId, bookData) {
  if (!isAdmin()) {
    throw new Error('You do not have sufficient permission.')
  }
  return Api().put(`books/${bookId}`, bookData)
}

export function deleteBook (bookId) {
  if (!isAdmin()) {
    throw new Error('You do not have sufficient permission.')
  }
  return Api().delete(`books/${bookId}`)
}
