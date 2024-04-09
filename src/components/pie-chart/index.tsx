import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useMemo } from 'react'
import tw from 'twin.macro'

const StyledPieChart = styled.div<{ progress: number }>`
  ${tw`relative w-[calc(100vw_/_5_-_20px)] h-[calc(100vw_/_5_-_20px)] rounded-[50%] border shadow`}
  ${tw`min-w-[140px] min-h-[140px] max-w-[200px] max-h-[200px]`}
  ${({ progress }) => css`
    background-image: conic-gradient(rgb(187 247 208) ${progress}deg, white 0 360deg);
  `}
`

const StyledContentContainer = styled.div`
  ${tw`absolute inset-4 flex flex-col items-center justify-center text-center font-semibold`}
`

export type PieChartProps = {
  title: string
  desc: string
  progress: number
}

const PieChart = ({ title, desc, progress = 0 }: PieChartProps) => {
  const progressValue = useMemo(() => (progress * 360) / 100, [progress])

  return (
    <StyledPieChart progress={progressValue} title={`Progress Pengisian ${progress}%`}>
      <StyledContentContainer>
        <p>{title}</p>
        <p>{desc}</p>
      </StyledContentContainer>
    </StyledPieChart>
  )
}

export default PieChart
