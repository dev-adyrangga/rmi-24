export const getEnvVars = () => ({
  API_HOST: import.meta.env.VITE_API_HOST,
  USER_TOKEN_KEY: import.meta.env.VITE_USER_TOKEN_KEY,
  USER_PROFILE_KEY: import.meta.env.VITE_USER_PROFILE_KEY
})
