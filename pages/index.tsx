import { usePostList } from '@/app/api'
import { Bio } from '@/app/Bio'
import { Header } from '@/app/Header'
import Link from 'next/link'

export default function Home() {
  const posts = usePostList({ pageSize: 10, page: 0 })

  return (
    <div>
      <Header />
      <div className="h-stack space-x-16">
        <Bio />
        <div className="flex-grow">
          <h2 className="title mb-4">Recent posts</h2>
          {posts.isLoading ? 'Loading...' : null}
          {posts.isError ? 'Failed to load recent posts.' : null}
          {posts.data ? (
            <ul>
              {posts.data.posts.map(post => (
                <li key={post.id}>
                  <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  )
}
