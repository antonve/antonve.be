import { Bio } from '@/app/Bio'
import { Header } from '@/app/Header'
import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Header />
      <div className="h-stack">
        <div className="">
          <h1 className="text-3xl mb-5">
            Hello! I&apos;m <strong>Anton Van Eechaute</strong>.
          </h1>
          <Bio />
        </div>
      </div>
    </div>
  )
}
