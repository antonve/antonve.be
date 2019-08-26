import { NextPageContext } from 'next'
import fetch from 'isomorphic-unfetch'

import constants from '../constants'
import { Resume } from '../domain'
import styled from 'styled-components'

interface Props {
  resume: Resume
}

const ResumePage = ({ resume }: Props) => (
  <Wrapper>
    personal
    <Separator />
  </Wrapper>
)

ResumePage.getInitialProps = async ({ query }: NextPageContext) => {
  const url = `${constants.apiRoot}/resume/${query.slug}`
  const response = await fetch(url)
  const json = await response.json()

  return { resume: json }
}

export default ResumePage

const Wrapper = styled.div`
  max-width: 784px;
  box-sizing: border-box;
  padding: 60px 20px;
`

const Separator = styled.hr`
  margin: 50px auto;
  max-width: 500px;
  height: 1px;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
`
