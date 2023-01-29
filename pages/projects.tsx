import { Header } from '@/app/Header'
import { Tags } from '@/app/Tags'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

const projects = [
  {
    title: 'Tadoku',
    when: '2019 — present',
    preview: 'tadoku.png',
    description: (
      <>
        <p>
          Tadoku is a friendly foreign-language immersion contest and tracking
          platform aimed at building a habit of reading and listening in your
          non-native languages.
        </p>
        <p>
          A minimal viable product was tested in 2019 and the website officially
          launched in 2020. About 100 people participate per official contest, a
          number which is steadily growing.
        </p>
        <p>
          On the frontend we have a collection of TypeScript Next.js apps using{' '}
          <Link href="https://tailwindcss.com/">TailwindCSS</Link>,{' '}
          <Link href="https://tanstack.com/query/latest">React Query</Link>,{' '}
          <Link href="https://github.com/colinhacks/zod">zod</Link>,{' '}
          <Link href="https://react-hook-form.com/">React Hook form</Link>,{' '}
          <Link href="https://www.chartjs.org/">chart.js</Link>, and more.
          There's also a <Link href="https://ui.tadoku.app">design system</Link>
          .
        </p>
        <p>
          The backend services are written in Golang and built through Bazel.
          The data is stored in a PostgreSQL database. It's deployed to a
          Kubernetes cluster on Linode via Argo CD.
        </p>
        <p>
          User management is handled by{' '}
          <Link href="https://www.ory.sh/kratos/">Ory Kratos</Link> and requests
          are authorized by{' '}
          <Link href="https://www.ory.sh/oathkeeper/">Ory Oathkeeper</Link>.
        </p>
        <p>
          Local development environment is built with{' '}
          <Link href="https://tilt.dev/">Tilt</Link>, a tool to run a local
          development environment in Kubernetes.
        </p>
      </>
    ),
    tags: [
      'Go',
      'PostgreSQL',
      'sqlc',
      'Kubernetes',
      'Docker',
      'Bazel',
      'Tilt',
      'TypeScript',
      'React',
      'Next.js',
      'TailwindCSS',
      'Data visualization',
    ],
    source: 'https://github.com/tadoku',
    url: 'https://tadoku.app',
  },
  {
    title: 'Wantedly Visit iOS',
    when: '2018',
    preview: 'visit_ios.jpg',
    description: (
      <>
        <p>
          Wantedly is a technology company which offers a social recruiting and
          employer branding platform.
        </p>
        <p>
          In 2018 they wanted to revamp their iOS app in order to increase the
          monthly active users. I was part of the team that built the new Visit
          app.
        </p>
        <p>
          My main contributions were towards the onboarding flow, LinkedIn &
          Facebook authentication, and the profile screen.
        </p>
        <p>
          The revamp was well received and lead to a significant increase in
          people applying to jobs.
        </p>
      </>
    ),
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
    description: (
      <>
        <p>
          Wantedly is a technology company which offers a social recruiting and
          employer branding platform.
        </p>
        <p>
          I was the first engineer on the international expansion product team.
          I was responsible for the growth of the product in Singapore,
          Indonesia, Hong Kong, and Germany.
        </p>
        <p>
          I built a variety of features to support our international growth such
          as an email template manager for marketers in local markets, online
          payments in Singapore with Stripe, a new onboarding flow, and more. A
          chunk of my time was spent analyzing user behavior. Those results were
          then used to figure out what to focus on next.
        </p>
        <p>
          Wantedly Visit is originally built as a monolithic Ruby on Rails
          application. During my time there we slowly migrated to a microservice
          architecture running on Kubernetes.
        </p>
      </>
    ),
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

const Page = () => (
  <>
    <Head>
      <title>Anton Van Eechaute :: Projects</title>
    </Head>
    <Header />
    <h1 className="title mb-8">Projects</h1>
    <ul className="space-y-20">
      {projects.map(p => (
        <li className="flex space-x-16" key={p.title}>
          <Image
            src={`/img/projects/${p.preview}`}
            width={376}
            height={240}
            alt={`Screenshot - ${p.title}`}
            className="mb-auto"
          />
          <div className="flex-1">
            <Link
              href={p.url}
              className="fancy font-serif !text-neutral-800 text-xl !underline"
            >
              {p.title}
            </Link>
            <h3 className="subtitle text-xs">{p.when}</h3>
            {p.description}
            {p.source ? (
              <p>
                <Link className="fancy" href={p.source}>
                  View source code
                </Link>
              </p>
            ) : null}
            <Tags list={p.tags} />
          </div>
        </li>
      ))}
    </ul>
    <p className="text-center my-20 text-3xl">
      Want to see more? Let's have a{' '}
      <strong>
        <Link className="fancy" href={`mailto:mail@antonve.be`}>
          chat
        </Link>
      </strong>
      !
    </p>
  </>
)

export default Page
