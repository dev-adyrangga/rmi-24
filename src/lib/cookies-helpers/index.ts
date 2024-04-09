import Cookies from 'js-cookie'
import { getEnvVars } from '@lib/get-env-vars'

const cookiesHelpers = {
  setToken: (token: string) => Cookies.set(getEnvVars().USER_TOKEN_KEY, token),
  getToken: () => Cookies.get(getEnvVars().USER_TOKEN_KEY),
  removeToken: () => Cookies.remove(getEnvVars().USER_TOKEN_KEY)
}

export default cookiesHelpers
