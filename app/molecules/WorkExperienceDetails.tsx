import React from 'react'
import styled from 'styled-components'
import { WorkExperienceEntry } from 'app/domain'
import { H3, H4, Paragraph } from 'app/atoms'
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
      {entry.location} &nbsp; {entry.when}
    </Meta>
    <Description>{entry.description.join('\n')}</Description>
    <Tags list={entry.tags}></Tags>
  </Wrapper>
)

export { WorkExperienceDetails }

const Wrapper = styled.li`
  & + & {
    margin-top: 32px;
  }
`

const Title = styled(H3)`
  margin: 0 0 4px 0;
`

const Meta = styled(H4)`
  margin: 0;
`

const Description = styled(Paragraph)`
  padding: 0;
  margin: 16px 0 0 0;
  white-space: pre-wrap;
  font-size: 1.5em;
`
