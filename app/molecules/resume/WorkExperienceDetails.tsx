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
    {entry.description.length > 0 && (
      <Description
        dangerouslySetInnerHTML={{
          __html: entry.description.map(format).join('<br/>'),
        }}
      />
    )}
    {entry.tags.length > 0 && (
      <TagContainer>
        <Tags list={entry.tags} />
      </TagContainer>
    )}
  </Wrapper>
)

export { WorkExperienceDetails }

const Wrapper = styled.li`
  & + & {
    margin-top: 16px;
  }

  @media screen {
    & + & {
      margin-top: 24px;
      padding-top: 24px;
      border-top: 1px solid ${props => props.theme.colors.foreground}11;
    }
  }
`

const Title = styled(H3)`
  margin: 0 0 4px 0;
  opacity: 0.7;
`

const Meta = styled(H4)`
  margin: 0;
  opacity: 0.5;
`

const Description = styled(Paragraph)`
  padding: 0;
  margin: 16px 0 8px 0;
  font-size: 1.4em;
  line-height: 1.5em;

  strong {
    margin-top: 10px;
    display: inline-block;
    text-transform: uppercase;
    opacity: 0.7;
    font-size: 0.9em;

    &:first-child {
      margin-top: 0;
    }
  }

  @media print {
    margin: 4px 0 0;
  }
`

const TagContainer = styled.div`
  opacity: 0.8;

  @media print {
    margin-top: 4px;
  }
`

const format = (html: string): string =>
  html
    .replace(/\*\*(.*?)\*\*/gm, '<strong>$1</strong>')
    .replace(/(?:\r\n|\r|\n)/g, '<br />')
