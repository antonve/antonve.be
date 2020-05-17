import React from 'react'
import Head from 'next/head'
import { NextPageContext } from 'next'
import styled from 'styled-components'

import constants from 'app/constants'
import { Resume } from 'app/domain'
import { SingleColumnTemplate } from 'app/templates'
import { Introduction } from 'app/molecules/resume'
import {
  WorkExperience,
  Education,
  Certificates,
  Skills,
} from 'app/organisms/resume'

interface Props {
  resume: Resume
}

const ResumePage = ({ resume }: Props) => (
  <SingleColumnTemplate width="784px">
    <Head>
      <title>Anton Van Eechaute :: Resume</title>
    </Head>
    <Introduction />
    <WorkExperience entries={resume.experience} />
    <Skills skillCategories={resume.skills} />
    <Education entries={resume.education} />
    <Certificates certificates={resume.certificates} />
  </SingleColumnTemplate>
)

ResumePage.getInitialProps = async ({ query, res }: NextPageContext) => {
  const url = `${constants.apiRoot}/resume/${query.slug}`
  const response = await fetch(url)

  if (!response.ok) {
    res.statusCode = 404
    res.end('Not found')
    return
  }

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
