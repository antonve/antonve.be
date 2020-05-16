import React, { SFC } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { Logo, StyledLink } from 'app/atoms'
import { useRouter } from 'next/router'

const Header = () => {
  return (
    <StyledHeader>
      <LogoLink href="/">
        <Logo width="232" height="38" />
      </LogoLink>
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
  margin: 90px 0;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    text-align: center;
    margin: 30px 0;
  }
`

const LogoLink = styled.a`
  transition: opacity 0.25s ease-out;

  &:hover,
  &:active,
  &:focus {
    opacity: 0.5;
  }

  @media only screen and (max-width: 600px) {
    margin: 0 auto 30px;
  }
`

const Nav = styled.nav`
  a + a {
    margin-left: 30px;
  }

  @media only screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;

    a + a {
      margin: 10px 0 0 0;
    }
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
