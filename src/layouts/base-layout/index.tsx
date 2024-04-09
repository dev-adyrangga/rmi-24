import { ComponentProps, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from '@emotion/styled'
import tw from 'twin.macro'
import AccountAvatar from '@components/account-avatar'

const LayoutContainer = styled.section<{ hideNavBar?: boolean }>`
  ${tw`min-h-screen bg-stone-100 grid grid-rows-[auto_1fr]`}
  ${({ hideNavBar }) => hideNavBar && tw`grid-rows-[1fr]`}
  max-width: 100vw;
  max-width: 100dvw;
`

const StyledNavContainer = styled.section`
  ${tw`bg-white h-[62px] min-h-[62px] w-full shadow z-1`}
  ${tw`grid grid-cols-[auto_auto] items-center px-2`}
  > section:last-of-type {
    ${tw`flex justify-end`}
  }
`

const StyledLogoLink = styled(Link)`
  ${tw`relative border border-red-300 h-10 w-20 flex items-center justify-center`}
`

const BaseLayout = ({ children }: ComponentProps<'section'>) => {
  const location = useLocation()

  const hideNavBar = useMemo(() => location.pathname.includes('/sign-in'), [location.pathname])

  return (
    <LayoutContainer hideNavBar={hideNavBar}>
      {!hideNavBar && (
        <StyledNavContainer>
          <section className="flex flex-row items-center gap-4">
            <StyledLogoLink to="#">Logo</StyledLogoLink>
            <p className="font-bold text-xl">Risk Maturity Index</p>
          </section>
          <section>
            <AccountAvatar />
          </section>
        </StyledNavContainer>
      )}
      {children}
    </LayoutContainer>
  )
}

export default BaseLayout
