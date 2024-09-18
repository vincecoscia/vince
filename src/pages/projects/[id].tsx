import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '../../components/layout/Layout'

const ProjectDetail: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <Layout>
      <h1>Project Detail</h1>
      <p>Project ID: {id}</p>
      {/* Add your project detail content here */}
    </Layout>
  )
}

export default ProjectDetail