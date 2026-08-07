import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'

const workHistory = [
  { company: 'Indeed', role: 'Inference Platform' },
  { company: 'Drivemode', role: 'Backend and infrastructure' },
  { company: 'Reaktor Japan', role: 'Full-stack web and iOS' },
  { company: 'Wantedly', role: 'Full-stack web and iOS' },
]

export function Bio() {
  return (
    <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-6">
      <div className="flex-1 order-2 md:order-1">
        <h1 className="text-2xl mb-2">
          Hello! I&apos;m <strong>Anton Van Eechaute</strong>.
        </h1>
        <p className="text-base">
          A full-stack software engineer from Belgium, based in Tokyo.
          <br />
          Building AI systems at{' '}
          <Link href="https://third-intelligence.com" className="fancy">
            Third Intelligence
          </Link>
          . Language learning enthusiast.
        </p>

        <p className="mt-3 text-base text-neutral-700">
          Find me on{' '}
          <Link
            href="https://x.com/antonve_be"
            target="_blank"
            rel="noreferrer"
            className="fancy"
          >
            Twitter
          </Link>
          ,{' '}
          <Link
            href="https://github.com/antonve"
            target="_blank"
            rel="noreferrer"
            className="fancy"
          >
            GitHub
          </Link>
          , or{' '}
          <Link
            href="https://www.linkedin.com/in/antonve/"
            target="_blank"
            rel="noreferrer"
            className="fancy"
          >
            LinkedIn
          </Link>
          .
        </p>

        <p className="mt-6 mb-2 text-xs font-bold uppercase tracking-widest text-black/40">
          Previously
        </p>
        <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-sm text-left mx-auto w-fit md:mx-0 md:w-auto">
          {workHistory.map(({ company, role }) => (
            <Fragment key={company}>
              <span className="font-bold">{company}</span>
              <span className="text-neutral-700">{role}</span>
            </Fragment>
          ))}
        </div>
      </div>
      <Image
        src="/img/profile-pic.jpg"
        alt="Headshot"
        width={110}
        height={110}
        className="rounded-full order-1 md:order-2"
      />
    </div>
  )
}
