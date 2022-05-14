import { Api, setBearer } from '@/services/Api'
import { isAdmin } from './AuthService'

export function fetchCarts () {
  setBearer()
  return Api().get('carts')
}

export function getCurrentCart () {
  setBearer()
  return Api().put('carts')
}

export function changeInCart (idBook, increment) {
  setBearer()
  return Api().post(`carts/books/${idBook}`, {increment: increment})
}

export function deleteCartItem (idBook) {
  setBearer()
  Api().delete(`carts/books/${idBook}`)
}

export function validateCart () {
  setBearer()
  Api().put(`carts/validate`)
}

export function deleteCart () {
  setBearer()
  Api().delete(`carts`)
}

export function returnBooks (idCart) {
  if (!isAdmin()) {
    throw new Error('You do not have sufficient permission.')
  }
  setBearer()
  Api().put(`carts/${idCart}`)
}
