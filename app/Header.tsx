import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  return (
    <header className="my-10 md:my-20 flex flex-col md:flex-row gap-4 md:gap-0 md:justify-between items-center">
      <Image
        src={'/img/logo.png'}
        alt="Anton Van Eechaute"
        width={232}
        height={38}
        unoptimized={true}
        className="w-[180px] md:w-[232px] h-auto"
      />
      <nav className="text-xl md:text-2xl space-x-5 md:space-x-7">
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
