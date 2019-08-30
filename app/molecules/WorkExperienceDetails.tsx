import React from 'react'
import styled from 'styled-components'
import { WorkExperienceEntry } from '../domain'
import { H3, H4, Paragraph } from '../atoms'
import { Tags } from './Tags'

interface Props {
  entry: WorkExperienceEntry
}

const WorkExperienceDetails = ({ entry }: Props) => (
  <Wrapper>
    <Title>
      {entry.company} / {entry.title}
    </Title>
    <Meta>
      {entry.location} &mdash; {entry.when}
    </Meta>
    <Description>{entry.description.join('\n')}</Description>
    <Tags list={entry.tags}></Tags>
  </Wrapper>
)

export { WorkExperienceDetails }

const Wrapper = styled.li`
  & + & {
    margin-top: 45px;
  }
`

const Title = styled(H3)`
  margin: 0;
`

const Meta = styled(H4)`
  margin: 8px 0 15px 0;
`

const Description = styled(Paragraph)`
  padding: 0;
  margin: 0;
  white-space: pre-wrap;
`
