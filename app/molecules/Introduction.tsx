import React from 'react'
import styled from 'styled-components'
import { H1, Link } from '../atoms'

const Introduction = () => {
  const email = 'mail@antonve.be'

  return (
    <Wrapper>
      <H1>Anton Van Eechaute</H1>
      <Body>
        Tokyo, Japan
        <br />
        <Link href={`mailto:${email}`}>{email}</Link>
      </Body>
    </Wrapper>
  )
}

export { Introduction }

const Wrapper = styled.div`
  text-align: center;
`

const Body = styled.p`
  font-size: 2.8em;
  line-height: 1.4em;
  margin: 0;
  padding: 0;
`
