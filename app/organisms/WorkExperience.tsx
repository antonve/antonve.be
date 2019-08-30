import React, { Fragment } from 'react'
import styled from 'styled-components'

import { H2 } from '../atoms'
import { WorkExperienceEntry } from '../domain'

interface Props {
  entries: WorkExperienceEntry[]
}

const WorkExperience = ({ entries }: Props) => (
  <>
    <H2>Work experience</H2>
  </>
)

export { WorkExperience }
