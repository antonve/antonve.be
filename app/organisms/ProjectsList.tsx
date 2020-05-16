import React from 'react'
import styled from 'styled-components'

import { Project } from 'app/domain'
import { ProjectDetails } from 'app/molecules'

interface Props {
  projects: Project[]
}

const ProjectsList = ({ projects }: Props) => (
  <List>
    {projects.map(project => (
      <ProjectDetails project={project} key={project.title} />
    ))}
  </List>
)

export { ProjectsList }

const List = styled.ul`
  margin: 0 0 32px 0;
  padding: 0;
  list-style-type: none;
`
