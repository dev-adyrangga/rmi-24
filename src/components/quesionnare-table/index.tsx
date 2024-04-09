import { IAnswer, IAnswerTable, IIndikatorTable } from '@/types'
import styled from '@emotion/styled'
import { createMarkup } from '@lib/create-html-markup-from-string'
import { deepClone } from '@lib/helpers'
import { ComponentProps, useCallback } from 'react'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
import tw from 'twin.macro'

const StyledTable = styled.table`
  ${tw`table-fixed w-full bg-white shadow`}
  thead {
    ${tw`text-xs bg-blue-200`}
    th {
      ${tw`p-1 border`}
    }
  }
  tbody {
    ${tw`text-xs`}
    td {
      ${tw`pl-2 pb-1.5 border align-top`}
    }
  }
`

const StyledButton = styled.button`
  ${tw`relative flex flex-row gap-2 items-start text-left text-xs w-full hover:cursor-pointer`}
`

type QuesionnareItemProps = ComponentProps<'button'> & {
  isChecked?: boolean
  content: string
}

const QuesionnareItem = ({ content, onClick, isChecked, disabled, ...props }: QuesionnareItemProps) => {
  return (
    <StyledButton type="button" onClick={onClick} disabled={disabled} {...props}>
      <div className="pt-5" dangerouslySetInnerHTML={createMarkup(`${content}`)} />
      <div className="flex self-start transition-all">
        {isChecked ? (
          <MdCheckBox className="w-6 h-6 text-green-600" />
        ) : (
          <MdCheckBoxOutlineBlank className={`w-6 h-6 ${disabled ? 'text-gray-400' : ''}`} />
        )}
      </div>
    </StyledButton>
  )
}

type QuestionnaireTableProps = ComponentProps<'table'> & {
  customizedResponse: IAnswer[]
  datatable: IAnswerTable
  onChangeCB: (nextAnswerData: IAnswer[]) => void
}

const QuestionnaireTable = ({ customizedResponse, datatable, onChangeCB, ...props }: QuestionnaireTableProps) => {
  const handleChangeCB = useCallback(
    (indicator: IIndikatorTable) => {
      const nextAnswerData = deepClone(customizedResponse)
      customizedResponse.forEach((answerVal, answerIdx) => {
        answerVal.indikators.forEach((indicatorVal, indicatorIdx) => {
          const nextCheckedVal = !customizedResponse[answerIdx].indikators[indicatorIdx].is_checked
          if (indicatorVal.code === indicator.code) {
            nextAnswerData[answerIdx].indikators[indicatorIdx].is_checked = nextCheckedVal
            nextAnswerData.forEach((ans, ansIdx) => {
              ans.indikators.forEach((i) => {
                if (
                  i.dataMappingId === indicator.dataMappingId &&
                  ((!i.is_checked && ansIdx > answerIdx) || (!nextCheckedVal && ansIdx < answerIdx))
                ) {
                  i.is_checked = nextCheckedVal
                }
              })
            })
          }
        })
      })
      onChangeCB(nextAnswerData)
    },
    [customizedResponse, onChangeCB]
  )

  return (
    <StyledTable {...props}>
      <thead className="">
        <tr>
          {customizedResponse.map((i, index) => (
            <th key={index}>
              <p>{`${i.title}`}</p>
              <p>{`${i.description} (${i.code})`}</p>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-xs">
        {datatable.map((rowsData, rowsDataIdx) => {
          let removeBgStyle = rowsData.some((e) => e?.is_checked) || rowsDataIdx === 0
          if (rowsDataIdx - 1 >= 0 && datatable[rowsDataIdx - 1].some((e) => e?.is_checked)) {
            removeBgStyle = true
          }
          return (
            <tr className={`transition-all ${removeBgStyle ? '' : 'bg-gray-300'}`} key={rowsDataIdx}>
              {rowsData.map((colData, colDataIdx) => {
                return (
                  <td key={colDataIdx}>
                    {!!colData?.description && (
                      <QuesionnareItem
                        disabled={!removeBgStyle}
                        onClick={() => handleChangeCB(colData)}
                        isChecked={colData.is_checked}
                        content={colData.description}
                      />
                    )}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </StyledTable>
  )
}

export default QuestionnaireTable
