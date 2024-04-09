import { ISignInResponse, SignInType } from '@/types/auth'
import { signInApi } from '@lib/apis/auth-api'
import { HttpResponseType } from '@lib/http-client'

const signInAdapter = async (payload: SignInType): Promise<HttpResponseType<ISignInResponse>> => {
  const response = await signInApi<ISignInResponse>(payload)
  return response
}

const authAdapters = {
  signInAdapter
}

export default authAdapters
