import React from 'react'
import { NextPageContext } from 'next'
import styled from 'styled-components'

import constants from 'app/constants'
import { Resume } from 'app/domain'
import { SingleColumnTemplate } from 'app/templates'
import { Introduction } from 'app/molecules'
import { WorkExperience } from 'app/organisms'
import { Education } from 'app/organisms'
import { Certificates } from 'app/organisms'

interface Props {
  resume: Resume
}

const ResumePage = ({ resume }: Props) => (
  <SingleColumnTemplate>
    <Introduction />
    <WorkExperience entries={resume.experience} />
    <Education entries={resume.education} />
    <Certificates certificates={resume.certificates} />
  </SingleColumnTemplate>
)

ResumePage.getInitialProps = async ({ query }: NextPageContext) => {
  const url = `${constants.apiRoot}/resume/${query.slug}`
  const response = await fetch(url)
  const json = await response.json()

  return { resume: json }
}

export default ResumePage

const Separator = styled.hr`
  margin: 50px auto;
  max-width: 500px;
  height: 1px;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
`
