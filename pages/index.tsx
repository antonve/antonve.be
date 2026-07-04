import { usePostList } from '@/app/api'
import { Bio } from '@/app/Bio'
import { Header } from '@/app/Header'
import Link from 'next/link'

const projects = [
  {
    title: 'Tadoku',
    href: 'https://tadoku.app',
    description:
      'A friendly foreign-language reading contest, built to make reading in your non-native language a habit.',
  },
  {
    title: 'hsfp.tokyo',
    href: 'https://hsfp.tokyo',
    description:
      "A calculator to estimate your points for Japan's Highly Skilled Foreign Professional visa.",
  },
]

export default function Home() {
  const posts = usePostList({ pageSize: 10, page: 0 })

  return (
    <div>
      <Header />
      <div className="space-y-8">
        <section>
          <Bio />
        </section>

        <div className="h-[3px] w-16 bg-secondary opacity-60" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <section>
            <h2 className="text-xl font-bold font-serif mb-4">
              Selected projects
            </h2>
            <ul className="space-y-4">
              {projects.map(project => (
                <li key={project.href}>
                  <Link
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="fancy text-lg"
                  >
                    {project.title}
                  </Link>
                  <p className="text-sm text-black/60 mt-1">
                    {project.description}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold font-serif mb-4">
              Recent writing
            </h2>
            {posts.isLoading ? 'Loading...' : null}
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
    </div>
  )
}
