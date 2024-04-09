import { IQuessionnaire } from '@/types'
import Button from '@components/button'
import PageTitle from '@components/page-title'
import QuesionnareStatusTable from '@components/quesionnare-status-table'
import { HTTP_RESPONSE_CODE } from '@constants/http-response-code'
import styled from '@emotion/styled'
import questionnaireAdapters from '@lib/adapters/questionnaire-adapter'
import { AppContext, AppContextType } from '@lib/contexts/app-context'
import { SpinnerLoadingContext, SpinnerLoadingContextType } from '@lib/contexts/spinner-loading-context'
import { DateTime } from 'luxon'
import { useCallback, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAsync } from 'react-use'
import tw from 'twin.macro'

const StyledContainer = styled.section`
  ${tw`p-2`}
`

const QuestionnaireStatusPage = () => {
  const { appState, setAppQuestionnaires, shouldFetchQuestionnaires } = useContext(AppContext) as AppContextType
  const { setIsLoading } = useContext(SpinnerLoadingContext) as SpinnerLoadingContextType
  const navigate = useNavigate()

  const doGetQuestionnaresData = useCallback(async () => {
    const response = await questionnaireAdapters.getQuestionnaires()
    if (response.code === HTTP_RESPONSE_CODE.UNAUTHORIZED) {
      // UNAUTHORIZED
    } else {
      if (response.success) {
        await setAppQuestionnaires(response.data)
      }
    }
  }, [setAppQuestionnaires])

  useAsync(async () => {
    if (shouldFetchQuestionnaires) {
      setIsLoading(true)
      await doGetQuestionnaresData()
      setIsLoading(false)
    } else {
      // silently
      doGetQuestionnaresData()
    }
  }, [])

  const handleClickAccessQuest = (q: IQuessionnaire) => {
    navigate(`/questionnaire/${q.quessionnaire_id}`)
  }

  return (
    <StyledContainer>
      <section className="mb-2 flex justify-between items-center">
        <PageTitle>Status Formulir Kuesioner</PageTitle>
      </section>
      {!shouldFetchQuestionnaires && (
        <section>
          <QuesionnareStatusTable datatable={appState.questionnaires} onClickAccessQuest={handleClickAccessQuest} />
        </section>
      )}
    </StyledContainer>
  )
}

export default QuestionnaireStatusPage
