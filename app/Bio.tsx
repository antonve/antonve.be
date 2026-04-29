import Image from 'next/image'
import Link from 'next/link'

const socials = [
  {
    label: 'Twitter',
    href: 'https://x.com/antonve_be',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          fill="currentColor"
          d="M22.5 5.9c-.8.4-1.6.6-2.5.7.9-.5 1.6-1.4 1.9-2.4-.8.5-1.8.9-2.8 1.1A4.4 4.4 0 0 0 11.6 9c0 .3 0 .7.1 1C8.1 9.8 4.9 8.1 2.8 5.5c-.4.6-.6 1.4-.6 2.2 0 1.5.8 2.9 2 3.7-.7 0-1.4-.2-2-.6v.1c0 2.2 1.5 4 3.6 4.4-.4.1-.8.2-1.2.2-.3 0-.6 0-.8-.1.6 1.8 2.2 3.1 4.1 3.1A8.8 8.8 0 0 1 2.5 20c-.4 0-.7 0-1-.1A12.4 12.4 0 0 0 8.2 22c8.1 0 12.5-6.7 12.5-12.5v-.6c.8-.6 1.5-1.3 2.1-2.2-.8.3-1.6.6-2.5.7Z"
        />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/antonve/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          fill="currentColor"
          d="M20.5 3h-17C2.7 3 2 3.7 2 4.5v15c0 .8.7 1.5 1.5 1.5h17c.8 0 1.5-.7 1.5-1.5v-15c0-.8-.7-1.5-1.5-1.5ZM8 18.3H5.2V9.7H8v8.6ZM6.6 8.5C5.7 8.5 5 7.8 5 7s.7-1.5 1.6-1.5S8.2 6.2 8.2 7s-.7 1.5-1.6 1.5Zm11.8 9.8h-2.8v-4.2c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2v4.3H9.8V9.7h2.7v1.2c.4-.7 1.3-1.4 2.6-1.4 2.8 0 3.3 1.8 3.3 4.2v4.6Z"
        />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/antonve',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          fill="currentColor"
          d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.9.6-3.5-1.2-3.5-1.2-.5-1.2-1.2-1.5-1.2-1.5-.9-.7.1-.7.1-.7 1 .1 1.6 1.1 1.6 1.1.9 1.6 2.5 1.1 3 .8.1-.7.4-1.1.7-1.3-2.3-.3-4.7-1.1-4.7-4.9 0-1.1.4-2 1.1-2.7-.1-.3-.5-1.3.1-2.7 0 0 .9-.3 2.8 1.1A9.7 9.7 0 0 1 12 7c.9 0 1.7.1 2.5.3 1.9-1.3 2.8-1.1 2.8-1.1.6 1.4.2 2.4.1 2.7.7.8 1.1 1.6 1.1 2.7 0 3.8-2.4 4.6-4.7 4.9.4.3.8 1 .8 2V21c0 .3.2.6.8.5A10 10 0 0 0 12 2Z"
        />
      </svg>
    ),
  },
]

export function Bio() {
  return (
    <div className="flex flex-col items-center text-center md:flex-row md:text-left">
      <Image
        src={'/img/profile-pic.jpg'}
        alt="Headshot"
        width={110}
        height={110}
        className="mb-4 rounded-full md:mb-0 md:mr-10"
      />
      <div className="md:flex-1">
        <h1 className="text-xl mb-2">
          Hello! I&apos;m <strong>Anton Van Eechaute</strong>.
        </h1>
        <p className="my-auto text-base">
          A full-stack software engineer from Belgium. <br />
          Currently stationed in {` `}
          <Link href="https://www.indeed.com" className="fancy">
            Tokyo @ Indeed
          </Link>
          . <br />
          Language learning enthusiast.
        </p>
      </div>
      <nav
        aria-label="Social links"
        className="mt-4 flex justify-center gap-3 md:ml-6 md:mt-0 md:flex-col md:gap-2"
      >
        {socials.map(social => (
          <Link
            key={social.href}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={social.label}
            title={social.label}
            className="reset inline-flex h-8 w-8 items-center justify-center text-neutral-800 transition hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            {social.icon}
          </Link>
        ))}
      </nav>
    </div>
  )
}
