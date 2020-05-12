import React from 'react'
import App, { AppContext } from 'next/app'
import { ThemeProvider, createGlobalStyle } from 'styled-components'

import theme, { ThemeType } from 'app/theme'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }: AppContext) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <ThemeProvider theme={theme}>
        <>
          <Component {...pageProps} />
          <Styles />
        </>
      </ThemeProvider>
    )
  }
}

const Styles = createGlobalStyle<{ theme: ThemeType }>`
  body {
    font-family: 'Josefin Sans', 'Helvetica Neue', Helvetica, Arial,
      'Hiragino Sans', 'ヒラギノ角ゴシック', 'Hiragino Kaku Gothic ProN',
      'ヒラギノ角ゴ Pro W3', Roboto, 'メイリオ', Meiryo, 'ＭＳ Ｐゴシック',
      sans-serif;
    font-weight: 300;
    font-size: ${props => `${props.theme.baseFontSize}%`};
    background: ${props => props.theme.colors.light2};
  }
`

export default MyApp
