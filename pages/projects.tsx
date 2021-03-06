import React from 'react'
import Head from 'next/head'

import { H1, Paragraph, StyledLink } from 'app/atoms'
import { Project } from 'app/domain'
import { ProjectsList } from 'app/organisms'
import styled from 'styled-components'
import { Header } from 'app/molecules'

const projects: Project[] = [
  {
    title: 'Tadoku',
    when: '2019 — present',
    preview: 'tadoku.png',
    description: [
      'Tadoku is a friendly foreign-language reading contest aimed at building a habit of reading in your non-native languages.',
      'A minimal viable product was tested in 2019 and the website officially launched in 2020. About 50 people participate per round, a number which is steadily growing.',
      "The frontend is a single page application built with Next.js. The backend is a RESTful Golang API using a PostgreSQL database. The content is managed through Ghost, a headless CMS. It's hosted on a Linode Kubernetes cluster.",
    ],
    tags: [
      'Go',
      'PostgreSQL',
      'Sentry',
      'Kubernetes',
      'Docker',
      'TypeScript',
      'React',
      'Redux',
      'Next.js',
      'Bazel',
      'styled components',
      'Data visualization',
    ],
    source: 'https://github.com/tadoku',
    url: 'https://tadoku.app',
  },
  {
    title: 'Wantedly Visit iOS',
    when: '2018',
    preview: 'visit_ios.jpg',
    description: [
      'Wantedly is a technology company which offers a social recruiting and employer branding platform.',
      'In 2018 they wanted to revamp their iOS app in order to increase the monthly active users. I was part of the team that built the new Visit app.',
      'My main contributions were towards the onboarding flow, LinkedIn & Facebook authentication, and the profile screen.',
      'The revamp was well received and lead to a significant increase in people applying to jobs.',
    ],
    tags: [
      'Swift',
      'MVVM+Coordinator',
      'RxSwift',
      'ReactorKit',
      'Moya',
      'R.swift',
      'Sourcery',
      'Swinject',
    ],
    url: 'https://apps.apple.com/jp/app/wantedly-visit/id804727886',
  },
  {
    title: 'Wantedly Visit',
    when: '2016-2018',
    preview: 'visit.jpg',
    description: [
      'Wantedly is a technology company which offers a social recruiting and employer branding platform.',
      'I was the first engineer on the international expansion product team. I was responsible for the growth of the product in Singapore, Indonesia, Hong Kong, and Germany.',
      'I built a variety of features to support our international growth such as an email template manager for marketers in local markets, online payments in Singapore with Stripe, a new onboarding flow, and more. A chunk of my time was spent analyzing user behavior. Those results were then used to figure out what to focus on next.',
      'Wantedly Visit is originally built as a monolithic Ruby on Rails application. During my time there we slowly migrated to a microservice architecture running on Kubernetes.',
    ],
    tags: [
      'Ruby',
      'Rails',
      'Go',
      'TypeScript',
      'React',
      'Redux',
      'SCSS',
      'CoffeeScript',
      'JavaScript',
      'i18n',
      'microservice architecture',
      'GCP Pub/Sub',
      'gRPC',
    ],
    url: 'https://sg.wantedly.com',
  },
]

const Projects = () => (
  <>
    <Head>
      <title>Anton Van Eechaute :: Projects</title>
    </Head>
    <Header />
    <H1>Projects</H1>
    <ProjectsList projects={projects} />
    <Contact>
      Want to see more? Let's have a{' '}
      <strong>
        <StyledLink href={`mailto:mail@antonve.be`}>chat</StyledLink>
      </strong>
      !
    </Contact>
  </>
)

const Contact = styled(Paragraph)`
  text-align: center;
  margin: 90px 0;
  font-size: 3em;
`

export default Projects
