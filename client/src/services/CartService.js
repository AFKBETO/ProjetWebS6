import { Api } from '@/services/Api'
import { isAdmin } from './AuthService'

export function fetchCarts () {
  return Api().get('carts')
}

export function getCurrentCart () {
  return Api().put('carts')
}

export function changeInCart (idBook, increment) {
  return Api().post(`carts/books/${idBook}`, {increment: increment})
}

export function deleteCartItem (idBook) {
  Api().delete(`carts/books/${idBook}`)
}

export function validateCart () {
  Api().put(`carts/validate`)
}

export function deleteCart () {
  Api().delete(`carts`)
}

export function returnBooks (idCart) {
  if (!isAdmin()) {
    throw new Error('You do not have sufficient permission.')
  }
  Api().put(`carts/${idCart}`)
}
