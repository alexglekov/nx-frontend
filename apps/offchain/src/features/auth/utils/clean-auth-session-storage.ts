import { SESSION_STORAGE_REFFERAL_CODE } from '../constants'

export const cleanAuthSessionStorage = () => {
  sessionStorage.removeItem(SESSION_STORAGE_REFFERAL_CODE)
}
