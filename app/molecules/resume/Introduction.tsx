import React from 'react'
import styled from 'styled-components'
import { H1, StyledLink } from 'app/atoms'

const Introduction = () => {
  const email = 'mail@antonve.be'
  const github = 'https://github.com/antonve'
  const projects = 'https://antonve.be/projects'

  return (
    <Wrapper>
      <Name>Anton Van Eechaute</Name>
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
    </Wrapper>
  )
}

export { Introduction }

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
`

const Name = styled(H1)`
  margin: 0;
  white-space: nowrap;
`

const Body = styled.p`
  font-size: 1.6em;
  line-height: 1.4em;
  margin: 0;
  padding: 0;
  text-align: right;
`
