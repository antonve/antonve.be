import React from 'react'
import styled from 'styled-components'
import { Certificate } from 'app/domain'
import { H4 } from 'app/atoms'

interface Props {
  certificate: Certificate
}

const CertificateDetails = ({ certificate }: Props) => (
  <Wrapper>
    <Title>
      {certificate.name} / {certificate.when}
    </Title>
  </Wrapper>
)

export { CertificateDetails }

const Wrapper = styled.li`
  & + & {
    margin-top: 8px;
  }
`

const Title = styled(H4)`
  margin: 0 0 4px 0;
  opacity: 0.8;
`
