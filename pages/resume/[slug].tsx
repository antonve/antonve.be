import React from 'react'
import Head from 'next/head'
import { NextPageContext } from 'next'
import styled from 'styled-components'

import constants from 'app/constants'
import { Resume } from 'app/domain'
import { SingleColumnTemplate, TwoColumnTemplate } from 'app/templates'
import { Introduction } from 'app/molecules/resume'
import {
  WorkExperience,
  Education,
  Certificates,
  Skills,
} from 'app/organisms/resume'
import { H1 } from 'app/atoms'

interface Props {
  resume: Resume
}

const ResumePage = ({ resume }: Props) => (
  <SingleColumnTemplate width="784px">
    <Head>
      <title>Anton Van Eechaute :: Resume</title>
    </Head>
    <Header />
    <TwoColumnTemplate>
      <div style={{ flex: '1' }}>
        <WorkExperience entries={resume.experience} />
      </div>
      <div style={{ width: '260px' }}>
        <Introduction />
        <Skills skillCategories={resume.skills} />
        <Education entries={resume.education} />
        <Certificates certificates={resume.certificates} />
      </div>
    </TwoColumnTemplate>
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

const Header = () => (
  <HeaderWrapper>
    <Name>Anton Van Eechaute</Name>
  </HeaderWrapper>
)

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
`

const Name = styled(H1)`
  margin: 0;
`
