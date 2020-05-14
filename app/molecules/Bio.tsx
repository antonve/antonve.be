import React from 'react'
import styled from 'styled-components'

import { Paragraph, StyledLink } from 'app/atoms'

const Bio = () => (
  <Container>
    <ImageContainer>
      <ProfilePicture src="/img/profile-pic.jpg" alt="Anton Van Eechaute" />
    </ImageContainer>
    <Description>
      A full-stack software engineer from Belgium. <br />
      Currently stationed in {` `}
      <StyledLink href={`https://reaktor.com`}>
        <strong>Tokyo @ Reaktor</strong>
      </StyledLink>
      .
    </Description>
  </Container>
)

const Container = styled.div`
  display: flex;
  align-items: center;

  @media only screen and (max-width: 500px) {
    br {
      display: none;
    }
  }
`

const Description = styled(Paragraph)`
  margin: 0;
  font-size: 2em;
  line-height: 1.5em;
`

const ProfilePicture = styled.img`
  border-radius: 50%;
  height: 70px;
  width: 70px;
  margin-right: 1.75rem;
`

const ImageContainer = styled.div`
  @media only screen and (max-width: 500px) {
    display: none;
  }
`

export default Bio
