import { Api, setBearer } from '@/services/Api'

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
