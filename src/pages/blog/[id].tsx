import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '../../components/layout/Layout'

const BlogPostDetail: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <Layout>
      <h1>Blog Post Detail</h1>
      <p>Blog Post ID: {id}</p>
      {/* Add your blog post detail content here */}
    </Layout>
  )
}

export default BlogPostDetail