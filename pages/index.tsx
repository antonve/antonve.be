import React from 'react'
import styled from 'styled-components'

import { SingleColumnTemplate } from 'app/templates'
import Bio from 'app/molecules/Bio'
import { Logo } from 'app/atoms'

interface Props {}

const Home = ({}: Props) => (
  <SingleColumnTemplate>
    <StyledLogo />
    <Bio />
  </SingleColumnTemplate>
)

const StyledLogo = styled(Logo)`
  max-width: 400px;
  width: 100%;
  margin: 0 auto 6rem;
`

export default Home
