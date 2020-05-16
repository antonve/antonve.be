import React from 'react'
import styled from 'styled-components'
import { H3, H4, Paragraph, StyledLink } from 'app/atoms'
import { Project } from 'app/domain'
import { Tags } from 'app/molecules/resume'

interface Props {
  project: Project
}

const ProjectDetails = ({ project }: Props) => (
  <Wrapper>
    <Preview>
      <img src={`/img/projects/${project.preview}`} alt={project.title} />
    </Preview>
    <Content>
      <Title>
        <StyledLink
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {project.title}
        </StyledLink>
      </Title>
      <Meta>{project.when}</Meta>
      {project.description.length > 0 &&
        project.description.map(content => (
          <Description>{content}</Description>
        ))}
      {project.source && (
        <Description>
          <StyledLink
            href={project.source}
            target="_blank"
            rel="noopener noreferrer"
          >
            View source code
          </StyledLink>
        </Description>
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

const Preview = styled.div`
  width: 470px;

  img {
    display: block;
    width: 100%;
  }
`

const Content = styled.div`
  margin-left: 60px;
  flex: 1;
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
`

const TagContainer = styled.div`
  opacity: 0.8;
`
