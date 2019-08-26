import React from 'react'
import App, { AppContext } from 'next/app'

import theme from './../theme'

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
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    )
  }
}

import styled, { ThemeProvider } from 'styled-components'

const Layout = styled.div`
  font-family: 'Josefin Sans', 'Helvetica Neue', Helvetica, Arial,
    'Hiragino Sans', 'ヒラギノ角ゴシック', 'Hiragino Kaku Gothic ProN',
    'ヒラギノ角ゴ Pro W3', Roboto, 'メイリオ', Meiryo, 'ＭＳ Ｐゴシック',
    sans-serif;
  font-weight: 300;
  font-size: ${props => `${props.theme.baseFontSize}%`};
  background: ${props => props.theme.colors.light2};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  max-width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
`

export default MyApp
