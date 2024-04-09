export type SignInType = {
  NIP: string
  password: string
}

export interface ISignInResponse {
  accessToken: string
  user: IUser
}

export interface IUser {
  user_id: string
  NIP: string
  email: string
  username: string
  full_name: string
  company: string
  position: string
  correspondent_type: string
  role: string
  created_at: string
  updated_at: string
}

export interface IProfileResponse {
  userId: string
  email: string
  username: string
  company: string
  position: string
  correspondentType: string
  role: string
}
