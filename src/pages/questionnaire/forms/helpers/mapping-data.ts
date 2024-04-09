import { IAnswer, IAnswerTable, IIndikator } from '@/types'
import { deepClone } from '@lib/helpers'
import { v4 as uuid } from 'uuid'
import { QFStateType } from '../types'

export const mappingAnswerData = (answers: IAnswer[]): { oriAnswersData: IAnswer[]; answerDataTable: IAnswerTable } => {
  const maxRowCount = answers.reduce((acc, curr) => {
    const indicatorsLen = curr.indikators.length
    if (acc < curr.indikators.length) {
      acc = indicatorsLen
    }
    return acc
  }, 0)

  const maxColCount = answers.length
  const oriAnswersData = deepClone(answers)
  const answerDataTable = Array.from(Array(maxRowCount).keys()).map((rowIdx) => {
    let prevDesc = ''
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let lastIndicator: IIndikator | any = undefined
    return Array.from(Array(maxColCount).keys()).map((_, colIdx) => {
      const dataMappingId = uuid()
      const parameter = deepClone(answers)?.slice()?.[colIdx]
      const indicator = parameter?.indikators?.[rowIdx]
      if (indicator?.description) {
        const currDesc = indicator.description.replace(/[^\w\d]/gm, ' ')
        indicator.dataMappingId = dataMappingId
        const isExist = oriAnswersData?.[colIdx]?.indikators?.[rowIdx]
        if (isExist && isExist?.description) {
          oriAnswersData[colIdx].indikators[rowIdx].dataMappingId = dataMappingId
        }
        if (currDesc === prevDesc) {
          if (isExist && isExist?.description) {
            oriAnswersData[colIdx].indikators[rowIdx].dataMappingId = lastIndicator?.dataMappingId
          }
          indicator.dataMappingId = lastIndicator?.dataMappingId
        }
        prevDesc = currDesc
      }
      lastIndicator = indicator || {}
      return lastIndicator
    })
  }) as IAnswerTable

  return { oriAnswersData, answerDataTable }
}

export const mappingReqBody = (answers: QFStateType) => {
  const nextAnswerData = deepClone(answers.customizedResponse)
  const reqBody: {
    score: number
    indicators: Array<{
      indikator_id: string
      is_checked: boolean
    }>
  } = {
    score: 1,
    indicators: []
  }
  nextAnswerData.forEach((ans, ansIdx) => {
    ans.indikators.forEach((i, iIdx) => {
      const respIndicator = answers.response?.[ansIdx]?.indikators?.[iIdx]
      if (respIndicator && i.is_checked !== respIndicator?.is_checked) {
        reqBody.indicators.push({
          indikator_id: i.indikator_id,
          is_checked: i.is_checked
        })
      }
    })
    if (!ans.indikators.some((obj) => !obj.is_checked)) {
      reqBody.score = Number(ans.code.replace(/[^\d]/gim, ''))
    }
  })

  return reqBody
}
