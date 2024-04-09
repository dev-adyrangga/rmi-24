import { createContext, PropsWithChildren, useCallback, useState } from 'react'
import { IDimension, IQuessionnaire } from '@/types'
import { deepClone, isValidStrObj } from '@lib/helpers'

export type AppState = {
  questionnaires: IQuessionnaire[]
  dimensions: IDimension[]
}

export type AppContextType = {
  appState: AppState
  setAppQuestionnaires: (questionnaires: IQuessionnaire[]) => Promise<boolean>
  setAppDimension: (dimension: IDimension) => Promise<boolean>
  shouldFetchQuestionnaires: boolean
  shouldFetchDimension: boolean
}

export const AppContext = createContext<AppContextType | null>(null)

const persistAppState = (value: AppState) => {
  localStorage.setItem('rmi-app', JSON.stringify(value))
}

const getInitialAppState = (): AppState => {
  const value = localStorage.getItem('rmi-app') || ''
  if (isValidStrObj(value)) {
    const parsedVal = JSON.parse(value)
    return parsedVal
  }
  return {
    questionnaires: [],
    dimensions: []
  }
}

const AppProvider = ({ children }: PropsWithChildren) => {
  const [appState, setAppState] = useState<AppState>(getInitialAppState())

  const handleSetQuestionnaires = useCallback(
    async (questionnaires: IQuessionnaire[]) => {
      const nextState = deepClone<AppState>(appState)
      questionnaires.forEach((quest) => {
        const indexed = nextState.questionnaires.findIndex(
          (q) => q.quessionnaire_id === quest.quessionnaire_id || q.mri_year === quest.mri_year
        )
        if (indexed >= 0) {
          nextState.questionnaires[indexed] = quest
        } else {
          nextState.questionnaires.push(quest)
        }
        persistAppState(nextState)
        setAppState(nextState)
      })
      return Promise.resolve(true)
    },
    [appState]
  )

  const handleSetDimension = useCallback(
    async (dimension: IDimension) => {
      const nextState = deepClone<AppState>(appState)
      const indexed = nextState.dimensions.findIndex((q) => q.dimension_id === dimension.dimension_id)
      if (indexed >= 0) {
        nextState.dimensions[indexed] = dimension
      } else {
        nextState.dimensions.push(dimension)
      }
      persistAppState(nextState)
      setAppState(nextState)
      return Promise.resolve(true)
    },
    [appState]
  )

  const checkShouldFetchQuestionnaires = useCallback(() => appState.questionnaires.length === 0, [appState])
  const checkShouldFetchDimension = useCallback(() => appState.dimensions.length === 0, [appState])

  return (
    <AppContext.Provider
      value={{
        shouldFetchQuestionnaires: checkShouldFetchQuestionnaires(),
        shouldFetchDimension: checkShouldFetchDimension(),
        appState,
        setAppQuestionnaires: handleSetQuestionnaires,
        setAppDimension: handleSetDimension
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
