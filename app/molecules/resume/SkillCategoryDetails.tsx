import React from 'react'
import styled from 'styled-components'
import { SkillCategory } from 'app/domain'
import { H4 } from 'app/atoms'
import { Tags } from './Tags'

interface Props {
  skillCategory: SkillCategory
}

const SkillCategoryDetails = ({ skillCategory }: Props) => (
  <Wrapper>
    <Title>{skillCategory.label}</Title>
    <TagContainer>
      <Tags list={skillCategory.tags} />
    </TagContainer>
  </Wrapper>
)

export { SkillCategoryDetails }

const Wrapper = styled.li`
  display: flex;
  align-items: center;

  & + & {
    margin-top: 8px;
  }
`

const Title = styled(H4)`
  margin: 0;
  opacity: 0.7;
  width: 100px;
`

const TagContainer = styled.div`
  opacity: 0.8;

  ul,
  li {
    margin-top: 0;
  }
`
