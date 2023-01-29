import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  return (
    <header className="my-20 h-stack spaced justify-between">
      <Image
        src={'/img/logo.png'}
        alt="Anton Van Eechaute"
        width={232}
        height={38}
        unoptimized={true}
      />
      <nav className="text-2xl space-x-7">
        <Link href={'/'} className="fancy !text-neutral-800">
          Home
        </Link>
        <Link href={'/projects'} className="fancy !text-neutral-800">
          Projects
        </Link>
      </nav>
    </header>
  )
}
