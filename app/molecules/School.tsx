import React from 'react'
import styled from 'styled-components'
import { EducationEntry } from 'app/domain'
import { H3, Paragraph } from 'app/atoms'
import { Tags } from './Tags'

interface Props {
  entry: EducationEntry
}

const School = ({ entry }: Props) => (
  <Wrapper>
    <Title>
      {entry.name} / {entry.when}
    </Title>
    <Description>{entry.notes}</Description>
  </Wrapper>
)

export { School }

const Wrapper = styled.li`
  & + & {
    margin-top: 24px;
    padding-top: 24px;
    border-top: 1px solid ${props => props.theme.colors.foreground}11;
  }
`

const Title = styled(H3)`
  margin: 0 0 4px 0;
  opacity: 0.7;
`

const Description = styled(Paragraph)`
  padding: 0;
  margin: 8px 0;
  white-space: pre-wrap;
  font-size: 1.5em;
`
