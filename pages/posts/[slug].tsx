import { PostDetail } from '@/app/Post'
import { useRouter } from 'next/router'
import { usePost } from '@/app/api'
import Head from 'next/head'
import { Header } from '@/app/Header'

export function Page() {
  const router = useRouter()
  const { slug } = router.query

  const post = usePost(slug as string)

  if (post.isLoading || post.isIdle) {
    return 'Loading...'
  }

  if (post.isError) {
    return <p>Could not load page, please try again later.</p>
  }

  return (
    <>
      <Head>
        <title>Blog - {post.data.title} - Tadoku</title>
      </Head>
      <Header />
      <PostDetail post={post.data} />
    </>
  )
}

export default Page
