import React from 'react'
import styled from 'styled-components'

import { H2 } from '../atoms'
import { WorkExperienceView } from '../molecules'
import { WorkExperienceEntry } from '../domain'

interface Props {
  entries: WorkExperienceEntry[]
}

const WorkExperience = ({ entries }: Props) => (
  <>
    <H2>Work experience</H2>
    <List>
      {entries.map(entry => (
        <WorkExperienceView entry={entry} key={entry.company} />
      ))}
    </List>
  </>
)

export { WorkExperience }

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`
