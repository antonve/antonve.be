import { Bio } from '@/app/Bio'
import { Header } from '@/app/Header'

export default function Home() {
  return (
    <div>
      <Header />
      <div className="h-stack space-x-10">
        <div className="">
          <Bio />
        </div>
        <div className="flex-grow border-l-2 pl-10">
          <h2 className="title">Recent posts</h2>
        </div>
      </div>
    </div>
  )
}
