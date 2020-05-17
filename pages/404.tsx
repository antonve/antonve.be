import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

import { H1, Paragraph, StyledLink } from 'app/atoms'
import { Header } from 'app/molecules'

function Custom404() {
  return (
    <>
      <Head>
        <title>Anton Van Eechaute :: Page not found</title>
      </Head>
      <Header />
      <H1>Oh no, we couldn't find this page</H1>
      <Paragraph>
        Take me back to the{' '}
        <Link href="/" passHref>
          <StyledLink>homepage</StyledLink>
        </Link>
        .
      </Paragraph>
    </>
  )
}

export default Custom404
