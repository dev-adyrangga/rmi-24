import { IDimension, IQuessionnaire } from '@/types'
import QuesionnareDimensionList from '@components/quesionnare-dimension-list'
import { HTTP_RESPONSE_CODE } from '@constants/http-response-code'
import styled from '@emotion/styled'
import questionnaireAdapters from '@lib/adapters/questionnaire-adapter'
import { AppContext, AppContextType } from '@lib/contexts/app-context'
import { SpinnerLoadingContext, SpinnerLoadingContextType } from '@lib/contexts/spinner-loading-context'
import { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAsync } from 'react-use'
import tw from 'twin.macro'

const StyledContainer = styled.section`
  ${tw`p-2`}
`

const QuestionnaireProgressPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { appState, setAppQuestionnaires, shouldFetchQuestionnaires } = useContext(AppContext) as AppContextType
  const { setIsLoading } = useContext(SpinnerLoadingContext) as SpinnerLoadingContextType
  const [questionnaire, setQuestionnaire] = useState<IQuessionnaire>(null)

  useAsync(async () => {
    setIsLoading(true)
    const splitted = location.pathname.split('/') || []
    const id = splitted?.[splitted?.length - 1] || ''
    if (id.length === 36) {
      const response = await questionnaireAdapters.getQuestionnaireById(id)
      if (response.code === HTTP_RESPONSE_CODE.UNAUTHORIZED) {
        // UNAUTHORIZED
      } else {
        if (response.success && response.data.quessionnaire_id) {
          await setAppQuestionnaires([response.data])
          setQuestionnaire(response.data)
        }
      }
    }
    setIsLoading(false)
  }, [])

  const onClickQuestionHandler = (dim: IDimension, subDimCode: string) => {
    const splitted = location.pathname.split('/') || []
    const id = splitted?.[splitted?.length - 1] || ''
    if (id.length === 36) {
      navigate(`/questionnaire/${id}/${dim.dimension_id}?q=${encodeURIComponent(subDimCode)}`)
    }
  }

  return (
    <StyledContainer>
      <h1 className="text-2xl font-semibold leading-8 mb-6">{`Formulir Kuesioner ${questionnaire?.mri_year || ''}`}</h1>
      <section className="grid grid-cols-[repeat(5,1fr)] gap-4 md:gap-6 lg:gap-8">
        {questionnaire &&
          questionnaire?.dimensions.map((dim, idxDim) => {
            return (
              <QuesionnareDimensionList
                key={idxDim}
                title={dim.title}
                desc={dim.description}
                progress={dim.progress}
                subDimentions={dim.subDimensions}
                onClick={(subDimCode) => onClickQuestionHandler(dim, subDimCode)}
              />
            )
          })}
      </section>
    </StyledContainer>
  )
}

export default QuestionnaireProgressPage
