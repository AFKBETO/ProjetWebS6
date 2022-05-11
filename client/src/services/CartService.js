import { Api, setBearer } from '@/services/Api'

export function fetchCarts () {
  setBearer()
  return Api().get('carts')
}

export function getCurrentCart () {
  setBearer()
  return Api().put('carts')
}

/*
export function addToCart (idBook) {
  setBearer()
} */
