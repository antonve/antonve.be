import Image from 'next/image'
import Link from 'next/link'

const workHistory = [
  { company: 'Indeed', role: 'Inference Platform' },
  { company: 'Drivemode', role: 'Backend and infrastructure' },
  { company: 'Reaktor Japan', role: 'Full-stack web and iOS' },
  { company: 'Wantedly', role: 'Full-stack web and iOS' },
]

export function Bio() {
  return (
    <main className="grid gap-x-16 pb-16 text-neutral-800 lg:grid-cols-[minmax(0,36rem)_minmax(0,1fr)]">
      <Image
        src="/img/profile-pic.jpg"
        alt="Headshot"
        width={96}
        height={96}
        className="mb-4 h-14 w-14 rounded-full outline outline-1 -outline-offset-1 outline-black/10 lg:col-start-2 lg:row-start-1 lg:mb-6 lg:h-24 lg:w-24"
      />
      <div className="mb-8 flex max-w-xl items-center lg:col-start-1 lg:row-start-1 lg:mb-10 lg:min-h-20 lg:self-start">
        <h1 className="text-2xl leading-snug tracking-tight sm:text-[1.875rem] [text-wrap:balance]">
          Hello! I&apos;m <strong>Anton Van Eechaute</strong>.
        </h1>
      </div>
      <div className="max-w-xl lg:col-start-1 lg:row-start-2">
        <div className="text-[1.0625rem] leading-[1.85] sm:text-lg sm:leading-[1.85] [&_p]:my-0 [&_p+p]:mt-7">
          <p>
            I&apos;m a full-stack software engineer from Belgium, based in Tokyo,
            building AI systems at{' '}
            <Link href="https://third-intelligence.com" className="fancy">
              Third Intelligence
            </Link>
            . I enjoy making it easier for others to build software, from
            self-service platforms for engineering teams to tools that help coding
            agents check whether their changes actually work.
          </p>

          <p>
            Outside work, I maintain{' '}
            <Link href="https://tadoku.app" className="fancy">
              Tadoku
            </Link>
            , a friendly contest and tracking platform that helps people build a
            habit of reading and listening in foreign languages. It brings together
            my interest in language learning and my love of building things.
            It&apos;s also my playground for exploring technologies I don&apos;t get
            to use at work, from infrastructure and backend systems to frontend
            design.
          </p>
        </div>

        <p className="mt-8 mb-0 text-sm leading-7 text-neutral-600">
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
      </div>

      <section
        aria-labelledby="previously"
        className="mt-9 max-w-xl border-t border-black/10 pt-6 lg:col-start-2 lg:row-start-2 lg:mt-0 lg:border-t-0 lg:pt-1"
      >
        <h2
          id="previously"
          className="mb-4 font-sans text-xs font-bold uppercase tracking-widest text-black/40"
        >
          Previously
        </h2>
        <dl className="space-y-4 text-sm leading-6">
          {workHistory.map(({ company, role }) => (
            <div key={company} className="grid grid-cols-[7rem_1fr] gap-x-4 lg:block">
              <dt className="font-bold">{company}</dt>
              <dd className="text-neutral-700">{role}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  )
}
