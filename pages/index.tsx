import React from 'react'
import styled from 'styled-components'

import { SingleColumnTemplate } from 'app/templates'
import { Bio } from 'app/molecules'
import { Logo, H2 } from 'app/atoms'
import { Header } from 'app/molecules'

interface Props {}

const Home = ({}: Props) => (
  <>
    <Header />
    <SingleColumnTemplate>
      <Intro>
        Hello! I’m <strong>Anton Van Eechaute</strong>.
      </Intro>
      <Bio />
    </SingleColumnTemplate>
  </>
)

const StyledLogo = styled(Logo)`
  max-width: 400px;
  width: 100%;
  margin: 3rem auto 6rem;
`

const Intro = styled(H2)`
  margin: 0 auto 1.75rem;
  font-size: 1.8rem;
  line-height: 2.625rem;
  font-weight: 400;
`

export default Home
