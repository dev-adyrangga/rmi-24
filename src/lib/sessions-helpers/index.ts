import { IUser } from '@/types/auth'
import cookiesHelpers from '@lib/cookies-helpers'
import { getEnvVars } from '@lib/get-env-vars'
import { isValidStrObj } from '@lib/helpers'

const getUserProfile = (): IUser | null => {
  const str = sessionStorage.getItem(getEnvVars().USER_PROFILE_KEY)
  if (isValidStrObj(str)) {
    return JSON.parse(str) satisfies IUser as IUser
  }
  return null
}

const setUserProfileAfterSignIn = (user: IUser) => {
  sessionStorage.setItem(getEnvVars().USER_PROFILE_KEY, JSON.stringify(user))
}

const clearSession = () => {
  cookiesHelpers.removeToken()
  sessionStorage.clear()
}

const sessionHelpers = {
  getUserProfile,
  setUserProfileAfterSignIn,
  clearSession
}

export default sessionHelpers
