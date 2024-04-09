import styled from '@emotion/styled'
import { ComponentProps } from 'react'
import tw from 'twin.macro'

const StyledHeading = styled.h1`
  ${tw`text-2xl font-semibold leading-8`}
`

const PageTitle = ({ children, ...props }: ComponentProps<'h1'>) => {
  return <StyledHeading {...props}>{children}</StyledHeading>
}

export default PageTitle
