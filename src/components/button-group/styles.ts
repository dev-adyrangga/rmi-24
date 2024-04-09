import { css } from '@emotion/react'
import styled from '@emotion/styled'
import tw from 'twin.macro'

export type ButtonGroupDirectionType = 'row' | 'col'

export const StyledButton = styled.button<{ direction: ButtonGroupDirectionType; isActive?: boolean }>`
  ${tw`px-4 py-2 text-xs font-medium text-gray-900 bg-white border-gray-200 hover:bg-blue-50/[.1]`}
  ${({ direction }) =>
    direction === 'row'
      ? css`
          ${tw`border-y border-l`}
          :first-of-type {
            ${tw`rounded-s-lg`}
          }
          :last-of-type {
            ${tw`border-r rounded-e-lg`}
          }
        `
      : css`
          ${tw`border-x border-t`}
          :first-of-type {
            ${tw`rounded-t-lg`}
          }
          :last-of-type {
            ${tw`border-b rounded-b-lg`}
          }
        `}
  ${({ isActive }) => isActive && tw`text-black bg-blue-100`}
`
