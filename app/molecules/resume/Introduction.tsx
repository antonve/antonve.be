import React from 'react'
import styled from 'styled-components'
import { H1, Link } from 'app/atoms'

const Introduction = () => {
  const email = 'mail@antonve.be'

  return (
    <Wrapper>
      <Name>Anton Van Eechaute</Name>
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
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
`

const Name = styled(H1)`
  margin: 0;
`

const Body = styled.p`
  font-size: 1.6em;
  line-height: 1.4em;
  margin: 0;
  padding: 0;
  text-align: right;
`
