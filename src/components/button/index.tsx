import styled from '@emotion/styled'
import { ComponentProps } from 'react'
import tw from 'twin.macro'

type StyleTypes = 'primary' | 'default'

const StyledButton = styled.button<{ styleType: StyleTypes }>`
  ${tw`text-white rounded shadow p-2 font-medium`}
  ${tw`bg-blue-700 hover:bg-blue-800`}
  ${({ styleType }) => styleType === 'primary' && tw`bg-blue-700 hover:bg-blue-800`}
  ${({ styleType }) => styleType === 'default' && tw`text-gray-900 bg-white border rounded hover:bg-stone-50`}
`

type QuesionnareDimensionListProps = ComponentProps<'button'> & {
  styleType?: StyleTypes
}

const Button = ({ styleType = 'primary', children, ...props }: QuesionnareDimensionListProps) => {
  return (
    <StyledButton type="button" styleType={styleType} {...props}>
      {children}
    </StyledButton>
  )
}

export default Button
