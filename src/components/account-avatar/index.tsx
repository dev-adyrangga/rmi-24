import { useEffect, useMemo, useRef, useState } from 'react'
import styled from '@emotion/styled'
import tw from 'twin.macro'
import { FaRegUser } from 'react-icons/fa'
import sessionHelpers from '@lib/sessions-helpers'
import { useNavigate } from 'react-router-dom'
import { APP_PAGES } from '@constants/app-pages'

const StyledButton = styled.button`
  ${tw`relative flex items-center justify-center h-10 w-10 rounded-full border border-gray-700`}
  ${tw`hover:shadow`}
`

const StyledPopoverContainer = styled.div`
  ${tw`absolute z-1 top-10 right-0 bg-white shadow border py-1 px-2 rounded w-max`}
  p {
    ${tw`py-2 text-sm font-semibold`}
  }
  > p:not(:last-of-type) {
    ${tw`border-b`}
  }
`

const AccountAvatar = () => {
  const navigate = useNavigate()
  const user = useMemo(() => sessionHelpers.getUserProfile(), [])
  const ref = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (ref.current && e?.target && !ref.current.contains(e.target)) {
        e.preventDefault()
        e.stopPropagation()
        setOpen(false)
      }
    }

    const onKeyDownHandler = (e: KeyboardEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setOpen(false)
    }

    document.addEventListener('click', checkIfClickedOutside)
    document.addEventListener('keydown', onKeyDownHandler)

    if (!sessionHelpers.getUserProfile()) {
      navigate(APP_PAGES.SIGN_IN)
    }

    return () => {
      document.removeEventListener('click', checkIfClickedOutside)
      document.removeEventListener('keydown', onKeyDownHandler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="relative" ref={ref}>
      <StyledButton type="button" onClick={() => setOpen(!open)}>
        <FaRegUser />
      </StyledButton>
      {!!user && open && (
        <StyledPopoverContainer>
          <p className="uppercase">{user.username}</p>
          <p>{user.position}</p>
          <p>{`${user.role} (${user.correspondent_type})`}</p>
        </StyledPopoverContainer>
      )}
    </section>
  )
}

export default AccountAvatar
