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
        className="rounded-full mr-10"
      />
      <p className="my-auto text-xl">
        A full-stack software engineer from Belgium. <br />
        Currently stationed in {` `}
        <Link href="https://www.indeed.com">Tokyo @ Indeed</Link>
      </p>
    </div>
  )
}
