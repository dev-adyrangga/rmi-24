import SpinnerOverlay from '@components/spinner-overlay'
import { createContext, Dispatch, SetStateAction, useState } from 'react'

export type SpinnerLoadingContextType = { isLoading: boolean; setIsLoading: Dispatch<SetStateAction<boolean>> }

export const SpinnerLoadingContext = createContext<SpinnerLoadingContextType | null>(null)

const SpinnerLoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <SpinnerLoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
      {isLoading && <SpinnerOverlay />}
    </SpinnerLoadingContext.Provider>
  )
}

export default SpinnerLoadingProvider
