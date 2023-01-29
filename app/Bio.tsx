import Image from 'next/image'
import Link from 'next/link'

export function Bio() {
  return (
    <div className="h-stack">
      <Image
        src={'/img/profile-pic.jpg'}
        alt="Headshot"
        width={70}
        height={70}
        className="rounded-full mr-7 my-auto"
      />
      <div className="">
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
