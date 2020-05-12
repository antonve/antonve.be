import React from 'react'
import styled from 'styled-components'

import { H2 } from 'app/atoms'
import { WorkExperienceDetails } from 'app/molecules'
import { WorkExperienceEntry } from 'app/domain'

interface Props {
  entries: WorkExperienceEntry[]
}

const WorkExperience = ({ entries }: Props) => (
  <>
    <H2>Work experience</H2>
    <List>
      {entries.map(entry => (
        <WorkExperienceDetails entry={entry} key={entry.company} />
      ))}
    </List>
  </>
)

export { WorkExperience }

const List = styled.ul`
  margin: 0 0 32px 0;
  padding: 0;
  list-style-type: none;
`
