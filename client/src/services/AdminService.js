import { Api } from '@/services/Api'
import { isAdmin } from './AuthService'

export function fetchAllCarts () {
  isAdmin()
  return Api().get('carts/all')
}
