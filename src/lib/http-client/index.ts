import { HTTP_RESPONSE_CODE } from '@constants/http-response-code'
import { getEnvVars } from '@lib/get-env-vars'

export type HttpClientType = RequestInit & {
  endPoint: string
  method?: 'GET' | 'POST' | 'PUT'
}

export type HttpResponseType<T = unknown> = {
  success: boolean
  message: string
  code: number
  data: T
}

export const httpClient = async <T>(req: HttpClientType): Promise<HttpResponseType<T>> => {
  const url = `${getEnvVars().API_HOST}${req.endPoint}`
  const reqInit: RequestInit = {
    method: req?.method || 'GET',
    headers: {
      ...(req?.headers || {}),
      'Content-Type': 'application/json',
      Accept: '*/*',
      'Access-Control-Allow-Origin': '*'
    },
    mode: 'cors'
  }
  if (req?.body) {
    reqInit.body = req.body
  }
  try {
    const response = await fetch(url, reqInit)
    const respJson = await response.json()

    const responseData = {
      success: false,
      message: (respJson && new Error(respJson)?.message) || 'Something went wrong',
      code: response.status,
      data: respJson
    }

    if (response.ok) {
      return { success: response.ok, message: 'Success', code: response.status, data: respJson }
    }
    if (response.status === HTTP_RESPONSE_CODE.UNAUTHORIZED) {
      responseData.message = respJson?.message || 'Unauthorized'
      return responseData
    }
    throw responseData
  } catch (error) {
    return error
  }
}
