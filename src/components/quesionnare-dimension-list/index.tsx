import { ISubDimension } from '@/types'
import Button from '@components/button'
import PieChart, { PieChartProps } from '@components/pie-chart'
import styled from '@emotion/styled'
import { ComponentProps } from 'react'
import tw from 'twin.macro'

const StyledContainer = styled.section`
  ${tw`flex flex-col items-center`}
`

type QuesionnareDimensionListProps = Omit<ComponentProps<'button'>, 'onClick'> &
  PieChartProps & {
    subDimentions: ISubDimension[]
    onClick: (subDimCode: string) => void
  }

const QuesionnareDimensionList = ({ title, desc, progress, subDimentions, onClick }: QuesionnareDimensionListProps) => {
  return (
    <StyledContainer>
      <PieChart title={title} desc={desc} progress={progress} />
      <div className="flex flex-col gap-2 mt-4 w-full">
        {subDimentions.map((subDim, idxSubDim) => (
          <Button type="button" key={idxSubDim} onClick={() => onClick(subDim.code)} className="text-left">
            {`${subDim.code}. ${subDim.title}`}
          </Button>
        ))}
      </div>
    </StyledContainer>
  )
}

export default QuesionnareDimensionList
