import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const ProjectDetail: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <h1>Project Detail</h1>
      <p>Project ID: {id}</p>
      {/* Add your project detail content here */}
    </>
  )
}

export default ProjectDetail