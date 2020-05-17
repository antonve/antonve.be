import React from 'react'
import App, { AppContext } from 'next/app'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'

import theme, { ThemeType } from 'app/theme'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <ThemeProvider theme={theme}>
        <Container>
          <Component {...pageProps} />
          <Styles />
        </Container>
      </ThemeProvider>
    )
  }
}

const Styles = createGlobalStyle<{ theme: ThemeType }>`
  body {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial,
      'Hiragino Sans', 'ヒラギノ角ゴシック', 'Hiragino Kaku Gothic ProN',
      'ヒラギノ角ゴ Pro W3', Roboto, 'メイリオ', Meiryo, 'ＭＳ Ｐゴシック',
      sans-serif;
    font-weight: 300;
    font-size: ${props => `${props.theme.baseFontSize}%`};
    background: ${props => props.theme.colors.background};
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Merriweather', serif;
  }
  @media print{
    body {
      font-size: calc(${props => `${props.theme.baseFontSize}%`}*0.9);
    }
  }
`

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 10px;
`

export default MyApp
