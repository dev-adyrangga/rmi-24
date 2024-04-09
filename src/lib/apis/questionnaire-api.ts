import cookiesHelpers from '@lib/cookies-helpers'
import { API_HEADERS } from './constants'
import { httpClient } from '@lib/http-client'

export const dimensionApi = async <T>(endpoint: string) => {
  const headers = { [API_HEADERS.AUTHORIZATION]: `Bearer ${cookiesHelpers.getToken()}` }
  const response = await httpClient<T>({ endPoint: endpoint, method: 'GET', headers: headers })
  return response
}

export const questionnaireApi = async <T>(endpoint: string) => {
  const headers = { [API_HEADERS.AUTHORIZATION]: `Bearer ${cookiesHelpers.getToken()}` }
  const response = await httpClient<T>({ endPoint: endpoint, method: 'GET', headers: headers })
  return response
}
