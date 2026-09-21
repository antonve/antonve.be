import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  return (
    <header className="mt-10 mb-10 flex max-w-xl flex-col items-start gap-4 md:mt-20 md:mb-16 md:flex-row md:items-center md:gap-8">
      <Image
        src="/img/logo.png"
        alt="Anton Van Eechaute"
        width={232}
        height={38}
        unoptimized={true}
        className="h-auto w-[180px]"
      />
      <nav className="space-x-5 text-xl">
        <Link href="/" className="fancy !text-neutral-800">
          Home
        </Link>
        <Link href="/projects" className="fancy !text-neutral-800">
          Projects
        </Link>
        <Link href="/books" className="fancy !text-neutral-800">
          Bookshelf
        </Link>
      </nav>
    </header>
  )
}
