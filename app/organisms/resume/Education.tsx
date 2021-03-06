import React from 'react'
import styled from 'styled-components'

import { H2 } from 'app/atoms'
import { School } from 'app/molecules/resume'
import { EducationEntry } from 'app/domain'

interface Props {
  entries: EducationEntry[]
}

const Education = ({ entries }: Props) => (
  <>
    <H2>Education</H2>
    <List>
      {entries.map(entry => (
        <School entry={entry} key={entry.degree} />
      ))}
    </List>
  </>
)

export { Education }

const List = styled.ul`
  margin: 0 0 32px 0;
  padding: 0;
  list-style-type: none;
`
