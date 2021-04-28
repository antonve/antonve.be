import React from 'react'
import Document, {
  Head,
  Html,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static getInitialProps({
    renderPage,
  }: DocumentContext): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet()

    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />),
    )

    const styles = sheet.getStyleElement()

    return new Promise(resolve => {
      resolve({ ...page, styles })
    })
  }

  render() {
    return (
      <Html>
        <Head>
          {this.props.styles}
          <link
            href="https://fonts.googleapis.com/css?family=Merriweather:400,700|Open+Sans:400,700&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/favicon.png" type="image/x-icon" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
