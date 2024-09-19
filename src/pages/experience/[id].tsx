import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const ExperienceDetail: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <h1>Experience Detail</h1>
      <p>Experience ID: {id}</p>
      {/* Add your experience detail content here */}
    </>
  )
}

export default ExperienceDetail