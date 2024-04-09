import { IAnswer, IDimension } from '@/types'
import ButtonGroup from '@components/button-group'
import PageTitle from '@components/page-title'
import QuestionnaireTable from '@components/quesionnare-table'
import SaveButton from '@components/save-button'
import styled from '@emotion/styled'
import questionnaireAdapters from '@lib/adapters/questionnaire-adapter'
import { AppContext, AppContextType } from '@lib/contexts/app-context'
import { SpinnerLoadingContext, SpinnerLoadingContextType } from '@lib/contexts/spinner-loading-context'
import { deepClone } from '@lib/helpers'
import { MouseEvent, useCallback, useContext, useState } from 'react'
import { IoChevronBack } from 'react-icons/io5'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import tw from 'twin.macro'
import { mappingAnswerData, mappingReqBody } from './helpers/mapping-data'
import { QFStateType } from './types'
import { useAsync } from 'react-use'
import { HTTP_RESPONSE_CODE } from '@constants/http-response-code'

const StyledContainer = styled.section`
  ${tw`p-2`}
`

const QuestionnaireFormsPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const subDimQueryValue = `${searchParams.get('q')}`
  const { appState, setAppDimension } = useContext(AppContext) as AppContextType
  const { setIsLoading } = useContext(SpinnerLoadingContext) as SpinnerLoadingContextType
  const [currActiveCodes, setCurrActiveCodes] = useState({
    dimCode: '',
    subDimCode: subDimQueryValue,
    paramCode: ''
  })
  const [currDimensionData, setCurrDimensionData] = useState<IDimension | null>(null)
  const [answers, setAnswers] = useState<QFStateType>({
    response: [],
    customizedResponse: [],
    datatable: []
  })

  const getCurrIndexDimension = (data: IDimension) => data.subDimensions.findIndex((i) => i.code === subDimQueryValue)

  const parametersData = () =>
    (currDimensionData && currDimensionData?.subDimensions?.[getCurrIndexDimension(currDimensionData)]?.parameters) ||
    []

  const hasAnswerData = () => answers.customizedResponse.length > 0

  useAsync(async () => {
    setIsLoading(true)
    const splitedPathName = location.pathname.split('/')
    const len = splitedPathName.length
    const dimId = splitedPathName?.[len - 1]
    if (dimId) {
      const response = await questionnaireAdapters.getDimensionById(dimId)
      if (response.code === HTTP_RESPONSE_CODE.UNAUTHORIZED) {
        // UNAUTHORIZED
      } else {
        if (response.success && response?.data?.dimension_id) {
          await setAppDimension(response.data)
          const indexDimension = getCurrIndexDimension(response.data)
          const paramCode = response.data.subDimensions[indexDimension].parameters[0].code
          setCurrActiveCodes((prevState) => ({
            ...prevState,
            subDimCode: subDimQueryValue,
            dimCode: response.data.code,
            paramCode: paramCode
          }))
          setCurrDimensionData(response.data)
          const answersListResponse = response.data.subDimensions[indexDimension].parameters[0].answers || []
          const mapping = mappingAnswerData(
            answersListResponse.slice().sort((a, b) => {
              if (a.code < b.code) {
                return -1
              }
              if (a.code > b.code) {
                return 1
              }
              return 0
            })
          )
          setAnswers((prevState) => ({
            ...deepClone(prevState),
            response: answersListResponse,
            customizedResponse: mapping.oriAnswersData,
            datatable: mapping.answerDataTable
          }))
        }
      }
    }
    setIsLoading(false)
  }, [location.pathname])

  const handleChangeCB = useCallback((nextAnswersData: IAnswer[]) => {
    const mapping = mappingAnswerData(nextAnswersData)
    setAnswers((prevState) => ({
      ...deepClone(prevState),
      customizedResponse: mapping.oriAnswersData,
      datatable: mapping.answerDataTable
    }))
  }, [])

  const onClickSave = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event?.preventDefault()
      event?.stopPropagation()
      // setIsLoading(true)
      const reqBody = mappingReqBody(answers)
      console.log('araya onClickSave ', { reqBody })
    },
    [answers]
  )

  const handleClickDimMenu = (dim: IDimension) => {
    navigate(
      `/questionnaire/${dim?.['quessionnaire_id'] || dim.quessionaire_id}/${dim.dimension_id}?q=${encodeURIComponent(
        dim?.subDimensions?.[0]?.code
      )}`
    )
  }

  return (
    <StyledContainer>
      <section className="flex flex-row gap-4 justify-between mb-2">
        <section className="flex flex-row">
          <button type="button" className="flex flex-row items-center mr-2.5" onClick={() => navigate(-1)}>
            <IoChevronBack />
            <p className="pb-[2px] text-sm font-semibold">Kembali</p>
          </button>
          <div className="border-l border-gray-200 w-[10px] my-2" />
          <PageTitle>Formulir Kuesioner</PageTitle>
        </section>
        {hasAnswerData && <SaveButton onClick={onClickSave} />}
      </section>
      <section className="w-[calc(100vw-30px)] overflow-x-auto mb-2.5">
        <section className="inline-flex rounded-md shadow-sm pb-0.5">
          {currDimensionData &&
            appState.questionnaires[0].dimensions.map((d, index) => (
              <ButtonGroup
                key={index}
                isActive={d.code === currActiveCodes.dimCode}
                onClick={() => handleClickDimMenu(d)}
              >{`${d.code} ${d.title}`}</ButtonGroup>
            ))}
        </section>
      </section>
      <section className="w-[calc(100vw-30px)] overflow-x-auto mb-2.5">
        <section className="inline-flex rounded-md shadow-sm pb-0.5">
          {currDimensionData?.subDimensions.map((d, index) => (
            <ButtonGroup
              key={index}
              isActive={d.code === currActiveCodes.subDimCode}
              className="w-max"
            >{`${d.code} ${d.title}`}</ButtonGroup>
          ))}
        </section>
      </section>
      <section className="grid grid-cols-[minmax(150px,200px)_1fr] gap-2.5 mt-1 min-h-[calc(100vh/2)]">
        <section className="flex flex-col max-h-[calc(100vh)] overflow-y-auto pr-0.5">
          {parametersData().map((paramItem, index) => {
            return (
              <ButtonGroup
                key={index}
                isActive={paramItem.code === currActiveCodes.paramCode}
                direction="col"
                className="text-left"
              >{`${paramItem.code} ${paramItem.title}`}</ButtonGroup>
            )
          })}
        </section>
        {hasAnswerData && (
          <section className="relative overflow-x-auto">
            <QuestionnaireTable
              customizedResponse={answers.customizedResponse}
              datatable={answers.datatable}
              onChangeCB={handleChangeCB}
            />
          </section>
        )}
      </section>
      {hasAnswerData && (
        <section className="flex justify-end my-6">
          <SaveButton onClick={onClickSave} />
        </section>
      )}
    </StyledContainer>
  )
}

export default QuestionnaireFormsPage
