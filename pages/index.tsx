import React from 'react'
import Router from 'next/router'

const defaultRoute = '/public'

export default class extends React.Component {
  static async getInitialProps({ res }) {
    if (res) {
      res.writeHead(302, {
        Location: defaultRoute,
      })
      res.end()
    } else {
      Router.push(defaultRoute)
    }
    return {}
  }
}
