import React, { SFC } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { Logo, StyledLink } from 'app/atoms'
import { useRouter } from 'next/router'

const Header = () => {
  return (
    <StyledHeader>
      <Logo width="232" height="38" />
      <Nav>
        <NavLink href={'/'}>Home</NavLink>
        <NavLink href={'/projects'}>Projects</NavLink>
      </Nav>
    </StyledHeader>
  )
}

export { Header }

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 90px;
`

const Nav = styled.nav`
  a + a {
    margin-left: 30px;
  }
`

const NavLink: SFC<{ href: string }> = ({ href, children }) => {
  const router = useRouter()

  return (
    <Link href={href} passHref>
      <StyledNavLink active={router.pathname === href}>
        {children}
      </StyledNavLink>
    </Link>
  )
}

const StyledNavLink = styled(StyledLink)`
  color: ${({ theme }) => theme.colors.foreground};
  text-decoration: none;
  text-transform: lowercase;
  font-weight: 700;
  font-size: 2.6em;
`
