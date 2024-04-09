import { SignInType } from '@/types/auth'
import authAdapters from '@lib/adapters/auth-adapter'
import cookiesHelpers from '@lib/cookies-helpers'
import sessionHelpers from '@lib/sessions-helpers'
import { Dispatch, SetStateAction } from 'react'

export const doSignIn = async (
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  payload: SignInType,
  onSuccess: () => void,
  onFailure: () => void
) => {
  setIsLoading(true)
  const response = await authAdapters.signInAdapter(payload)
  if (response?.success) {
    cookiesHelpers.setToken(response.data.accessToken)
    sessionHelpers.setUserProfileAfterSignIn(response.data.user)
    onSuccess()
    setIsLoading(false)
  } else {
    onFailure()
    setIsLoading(false)
  }
}
