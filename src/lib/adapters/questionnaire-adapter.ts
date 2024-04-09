import { IDimension, IQuessionnaire } from '@/types'
import { API_URLS } from '@lib/apis/constants'
import { dimensionApi, questionnaireApi } from '@lib/apis/questionnaire-api'
import { HttpResponseType } from '@lib/http-client'

const getDimensionById = async (dimension_id: string): Promise<HttpResponseType<IDimension>> => {
  return await dimensionApi(API_URLS.DIMENSION_BY_ID.replace('{{dimensionId}}', dimension_id))
}

const getQuestionnaires = async (): Promise<HttpResponseType<IQuessionnaire[]>> => {
  return await questionnaireApi(API_URLS.QUESSIONNAIRES)
}

const getQuestionnaireById = async (quessionaireId: string): Promise<HttpResponseType<IQuessionnaire>> => {
  return await questionnaireApi(API_URLS.QUESSIONNAIRE_BY_ID.replace('{{quessionaireId}}', quessionaireId))
}

const questionnaireAdapters = {
  getDimensionById,
  getQuestionnaires,
  getQuestionnaireById
}

export default questionnaireAdapters
