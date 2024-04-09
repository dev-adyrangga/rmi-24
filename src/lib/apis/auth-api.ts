import { httpClient } from '@lib/http-client'
import { API_URLS } from './constants'
import { SignInType } from '@/types/auth'

export const signInApi = async <T>(payload: SignInType) => {
  const response = await httpClient<T>({ endPoint: API_URLS.SIGN_IN, body: JSON.stringify(payload), method: 'POST' })
  return response
}
