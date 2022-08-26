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
      <StyledLink href={`https://www.indeed.com`}>
        <strong>Tokyo @ Indeed</strong>
      </StyledLink>
      .
    </Description>
  </Container>
)

const Container = styled.div`
  display: flex;
  align-items: center;

  @media only screen and (max-width: 570px) {
    flex-direction: column;

    br {
      display: none;
    }
  }
`

const Description = styled(Paragraph)`
  margin: 0;
  font-size: 2em;
  line-height: 1.5em;

  @media only screen and (max-width: 570px) {
    text-align: center;
  }
`

const ProfilePicture = styled.img`
  border-radius: 50%;
  height: 70px;
  width: 70px;
`

const ImageContainer = styled.div`
  margin-right: 1.75rem;

  @media only screen and (max-width: 570px) {
    margin-right: 0;
    margin-bottom: 1.75rem;
  }
`

export { Bio }
