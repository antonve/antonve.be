import { NextPageContext } from 'next'
import fetch from 'isomorphic-unfetch'

import constants from '../constants'
import { Resume } from '../domain'

interface Props {
  resume: Resume
}

const ResumePage = ({ resume }: Props) => {
  return <p>slug: {resume.skills[0].label}</p>
}

ResumePage.getInitialProps = async ({ query }: NextPageContext) => {
  const url = `${constants.apiRoot}/resume/${query.slug}`
  const response = await fetch(url)
  const json = await response.json()

  return { resume: json }
}

export default ResumePage
