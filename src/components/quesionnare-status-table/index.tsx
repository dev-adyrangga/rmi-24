import { IQuessionnaire } from '@/types'
import Button from '@components/button'
import styled from '@emotion/styled'
import sessionHelpers from '@lib/sessions-helpers'
import { DateTime } from 'luxon'
import { ComponentProps, useMemo } from 'react'
import tw from 'twin.macro'

const StyledTable = styled.table`
  ${tw`table-fixed w-full bg-white shadow`}
  thead {
    ${tw`bg-blue-200`}
  }
  th {
    ${tw`p-1 border`}
  }
  td {
    ${tw`p-2 border`}
  }
`

const ActionButtonWrapper = styled.div`
  ${tw`flex justify-center flex-wrap gap-4`}
`

type QuesionnareStatusTableProps = ComponentProps<'table'> & {
  datatable: IQuessionnaire[]
  onClickAccessQuest: (q: IQuessionnaire) => void
}

const QuesionnareStatusTable = ({ datatable, onClickAccessQuest, ...props }: QuesionnareStatusTableProps) => {
  const user = useMemo(() => sessionHelpers.getUserProfile(), [])

  return (
    <section>
      <StyledTable {...props}>
        <thead>
          <tr>
            <th>Kategori</th>
            <th>Tahun RMI</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {user &&
            datatable.map((q, idx) => {
              return (
                <tr key={idx}>
                  <td>{`${user.role} (${user.correspondent_type})`}</td>
                  <td>{q.mri_year}</td>
                  <td className="capitalize">{q.status}</td>
                  <td className="text-center">
                    <ActionButtonWrapper>
                      <Button type="button" styleType="default" onClick={() => onClickAccessQuest(q)} disabled>
                        Lihat Progress
                      </Button>
                      <Button type="button" onClick={() => onClickAccessQuest(q)}>{`Akses Kuesioner ${
                        DateTime.now().year
                      }`}</Button>
                    </ActionButtonWrapper>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </StyledTable>
    </section>
  )
}

export default QuesionnareStatusTable
