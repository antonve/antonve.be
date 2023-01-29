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
      <nav>
        <Link href={'/'}>Home</Link>
        <Link href={'/projects'}>Projects</Link>
      </nav>
    </header>
  )
}
