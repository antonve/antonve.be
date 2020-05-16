import React from 'react'
import styled from 'styled-components'
import { H3, H4, Paragraph } from 'app/atoms'
import { Project } from 'app/domain'
import { Tags } from 'app/molecules/resume'

interface Props {
  project: Project
}

const ProjectDetails = ({ project }: Props) => (
  <Wrapper>
    <Preview src={`/img/projects/${project.preview}`} alt={project.title} />
    <Content>
      <Title>{project.title}</Title>
      <Meta>{project.when}</Meta>
      {project.description.length > 0 && (
        <Description>{project.description.join('\n')}</Description>
      )}
      {project.tags.length > 0 && (
        <TagContainer>
          <Tags list={project.tags} />
        </TagContainer>
      )}
    </Content>
  </Wrapper>
)

export { ProjectDetails }

const Wrapper = styled.li`
  display: flex;

  & + & {
    margin-top: 90px;
  }
`

const Preview = styled.img`
  max-width: 470px;
  width: 100%;
  display: block;
`

const Content = styled.div`
  margin-left: 60px;
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
  white-space: pre-wrap;
  font-size: 1.5em;

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
