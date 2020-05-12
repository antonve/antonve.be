import React from 'react'
import styled from 'styled-components'

import { H2 } from 'app/atoms'
import { School } from 'app/molecules'
import { EducationEntry } from 'app/domain'

interface Props {
  entries: EducationEntry[]
}

const Education = ({ entries }: Props) => (
  <>
    <H2>Education</H2>
    <List>
      {entries.map(entry => (
        <School entry={entry} key={entry.name} />
      ))}
    </List>
  </>
)

export { Education }

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`
