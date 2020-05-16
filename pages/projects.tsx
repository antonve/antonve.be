import React from 'react'
import styled from 'styled-components'

import { SingleColumnTemplate } from 'app/templates'
import { H1 } from 'app/atoms'
import { Project } from 'app/domain'
import { ProjectsList } from 'app/organisms'

const projects: Project[] = [
  {
    title: 'Tadoku',
    when: '2019 — present',
    preview: 'tadoku.png',
    description: [
      'Tadoku is a friendly foreign-language reading contest aimed at building a habit of reading in your non-native languages.',
    ],
    tags: ['golang'],
  },
  {
    title: 'Wantedly Visit iOS',
    when: '2018',
    preview: 'visit_ios.png',
    description: [
      'Tadoku is a friendly foreign-language reading contest aimed at building a habit of reading in your non-native languages.',
    ],
    tags: ['golang'],
  },
  {
    title: 'Wantedly Visit',
    when: '2016-2018',
    preview: 'visit.png',
    description: [
      'Tadoku is a friendly foreign-language reading contest aimed at building a habit of reading in your non-native languages.',
    ],
    tags: ['golang'],
  },
]

const Projects = () => (
  <SingleColumnTemplate width="1100px">
    <H1>Projects</H1>
    <ProjectsList projects={projects} />
  </SingleColumnTemplate>
)

export default Projects
