import React from 'react'
import styled from 'styled-components'

import { SingleColumnTemplate } from 'app/templates'
import Bio from 'app/molecules/Bio'

interface Props {}

const Home = ({}: Props) => (
  <SingleColumnTemplate>
    <Bio />
  </SingleColumnTemplate>
)

export default Home
