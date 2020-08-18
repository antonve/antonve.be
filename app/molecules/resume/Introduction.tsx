import React from 'react'
import styled from 'styled-components'
import { H2, StyledLink } from 'app/atoms'

const Introduction = () => {
  const email = 'mail@antonve.be'
  const github = 'https://github.com/antonve'
  const projects = 'https://antonve.be/projects'

  return (
    <>
      <H2>About me</H2>
      <Body>
        Tokyo, Japan
        <br />
        <StyledLink href={`mailto:${email}`}>{email}</StyledLink>
        <br />
        <StyledLink href={github} target="_blank" rel="noopener noreferrer">
          {github}
        </StyledLink>
        <br />
        <StyledLink href={projects} target="_blank" rel="noopener noreferrer">
          {projects}
        </StyledLink>
      </Body>
    </>
  )
}

export { Introduction }

const Body = styled.p`
  margin: 0 0 32px;
  font-size: 1.4em;
  line-height: 1.5em;
  width: 260px;
`
