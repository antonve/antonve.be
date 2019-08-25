import { useRouter } from 'next/router'

const Resume = () => {
  const router = useRouter()
  const { slug } = router.query

  return <p>slug: {slug}</p>
}

export default Resume
