import { ComponentProps } from 'react'
import { ButtonGroupDirectionType, StyledButton } from './styles'

type ButtonGroupProps = ComponentProps<'button'> & {
  direction?: ButtonGroupDirectionType
  isActive?: boolean
}

const ButtonGroup = ({ children, direction = 'row', isActive = false, ...props }: ButtonGroupProps) => {
  return (
    <StyledButton direction={direction} isActive={isActive} {...props}>
      {children}
    </StyledButton>
  )
}

export default ButtonGroup
