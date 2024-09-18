import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '../../components/layout/Layout'

const ExperienceDetail: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <Layout>
      <h1>Experience Detail</h1>
      <p>Experience ID: {id}</p>
      {/* Add your experience detail content here */}
    </Layout>
  )
}

export default ExperienceDetail