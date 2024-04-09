import { SignInType } from '@/types/auth'
import { SpinnerLoadingContext, SpinnerLoadingContextType } from '@lib/contexts/spinner-loading-context'
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { doSignIn } from './helpers'
import { useNavigate } from 'react-router-dom'
import Button from '@components/button'
import sessionHelpers from '@lib/sessions-helpers'

const SignInPage = () => {
  const navigate = useNavigate()
  const { setIsLoading } = useContext(SpinnerLoadingContext) as SpinnerLoadingContextType
  const [formValues, setFormValues] = useState<SignInType>({
    NIP: '190501005318',
    password: 'welcome@123'
  })

  useEffect(() => {
    sessionHelpers.clearSession()
  }, [])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target
    setFormValues((prevState) => ({
      ...prevState,
      [id]: value
    }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    event?.stopPropagation()
    doSignIn(
      setIsLoading,
      formValues,
      () => navigate('/questionnaire'),
      () => {
        alert('Opps, Terjadi kesalahan')
      }
    )
  }

  return (
    <section className="grid  grid-flow-row md:grid-flow-col">
      <section className="grid items-center justify-center">
        <h1 className="text-3xl font-bold">Risk Management Index Systems</h1>
      </section>
      <section className="bg-blue-900 grid justify-center items-center">
        <section className="shadow flex bg-white rounded-md">
          <form noValidate className="p-6 min-w-80" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-900">
                Username
              </label>
              <input
                type="text"
                id="NIP"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="masukkan email anda"
                required
                value={formValues.NIP}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="masukkan password anda"
                required
                value={formValues.password}
                onChange={handleChange}
              />
            </div>
            <Button type="submit" className="!px-4 w-full">
              Sign In
            </Button>
          </form>
        </section>
      </section>
    </section>
  )
}

export default SignInPage
