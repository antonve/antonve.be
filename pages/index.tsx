import { usePostList } from '@/lib/api'
import { Bio } from '@/components/Bio'
import { Header } from '@/components/Header'
import Link from 'next/link'

export default function Home() {
  const posts = usePostList({ pageSize: 10, page: 0 })

  return (
    <div>
      <Header />
      <div className="space-y-12">
        <section>
          <Bio />
        </section>

        <section>
          <h2 className="text-xl font-bold font-serif mb-4">
            Recent writing
          </h2>
          {posts.isPending ? 'Loading...' : null}
          {posts.isError ? 'Failed to load recent posts.' : null}
          {posts.data && posts.data.total_size === 0 ? (
            <p>No posts published</p>
          ) : null}
          {posts.data ? (
            <ul className="space-y-4">
              {posts.data.posts.map(post => (
                <li key={post.id}>
                  <Link href={`/posts/${post.slug}`} className="fancy text-lg">
                    {post.title}
                  </Link>
                  <p className="text-sm text-black/40 mt-1">
                    {new Date(post.published_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </p>
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      </div>
    </div>
  )
}
