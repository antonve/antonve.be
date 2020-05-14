import React from 'react'
import styled from 'styled-components'

import { H2 } from 'app/atoms'
import { SkillCategory } from 'app/domain'
import { SkillCategoryDetails } from 'app/molecules/resume'

interface Props {
  skillCategories: SkillCategory[]
}

const Skills = ({ skillCategories }: Props) => (
  <>
    <H2>Skills</H2>
    <List>
      {skillCategories.map(skillCategory => (
        <SkillCategoryDetails
          skillCategory={skillCategory}
          key={skillCategory.label}
        />
      ))}
    </List>
  </>
)

export { Skills }

const List = styled.ul`
  margin: 0 0 32px 0;
  padding: 0;
  list-style-type: none;
`
