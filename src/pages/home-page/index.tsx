import { ComponentProps } from 'react'
import { useLocation } from 'react-router-dom'
import styled from '@emotion/styled'
import tw from 'twin.macro'

const StyledContainer = styled.section`
  ${tw`bg-red-400`}
`

const HomePage = (props: ComponentProps<'section'>) => {
  return <StyledContainer>Home Page</StyledContainer>
}

export default HomePage
