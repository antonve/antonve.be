import React from 'react'
import styled from 'styled-components'

import { H2 } from 'app/atoms'
import { CertificateDetails } from 'app/molecules/resume'
import { Certificate } from 'app/domain'

interface Props {
  certificates: Certificate[]
}

const Certificates = ({ certificates }: Props) => (
  <>
    <H2>Certificates</H2>
    <List>
      {certificates.map(certificate => (
        <CertificateDetails certificate={certificate} key={certificate.name} />
      ))}
    </List>
  </>
)

export { Certificates }

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`
