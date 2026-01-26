import Image from 'next/image'
import Link from 'next/link'

export function Bio() {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
      <Image
        src={'/img/profile-pic.jpg'}
        alt="Headshot"
        width={70}
        height={70}
        className="rounded-full mb-4 md:mb-0 md:mr-7 md:my-auto"
      />
      <div>
        <h1 className="text-xl mb-2">
          Hello! I&apos;m <strong>Anton Van Eechaute</strong>.
        </h1>
        <p className="my-auto text-base">
          A full-stack software engineer from Belgium. <br />
          Currently stationed in {` `}
          <Link href="https://www.indeed.com" className="fancy">
            Tokyo @ Indeed
          </Link>
        </p>
      </div>
    </div>
  )
}
