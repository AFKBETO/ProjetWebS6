import { Api, setBearer } from '@/services/Api'
import { isAdmin } from './AuthService'

export function fetchAllCarts () {
  isAdmin()
  setBearer()
  return Api().get('carts/all')
}
