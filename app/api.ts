import { z } from 'zod'
import { useQuery } from 'react-query'

const root = `https://staging.tadoku.app/api/internal/content`
const namespace = 'tadoku'

const Post = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  content: z.string(),
  published_at: z.string().datetime({ offset: true }),
})

export type Post = z.infer<typeof Post>

export const usePost = (slug: string) =>
  useQuery(['content_post', slug], async ({ queryKey }): Promise<Post> => {
    const [_, slug] = queryKey
    const response = await fetch(`${root}/posts/${namespace}/${slug}`)

    if (response.status !== 200) {
      throw new Error(response.status.toString())
    }

    return Post.parse(await response.json())
  })

const PostList = z.object({
  posts: z.array(Post),
  next_page_token: z.string(),
  total_size: z.number(),
})

export type PostList = z.infer<typeof PostList>

export const usePostList = ({
  pageSize,
  page,
}: {
  pageSize: number
  page: number
}) =>
  useQuery(
    ['content_post', 'list', page],
    async ({ queryKey }): Promise<PostList> => {
      const page = queryKey[2]
      const response = await fetch(
        `${root}/posts/${namespace}?page_size=${pageSize}&page=${page}`,
      )

      if (response.status !== 200) {
        throw new Error(response.status.toString())
      }

      return PostList.parse(await response.json())
    },
  )
