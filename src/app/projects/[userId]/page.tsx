import ProjectsList from '@/components/ProjectsList/ProjectsList'
import axios from 'axios'

export default async function Projects({
  params: { userId },
}: {
  params: { userId: string }
}) {
  const {
    data: { projects },
  } = await axios.get(`${process.env.NEXTAUTH_URL}/api/projects/${userId}`)

  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">
        All my projects
      </h1>
      <ProjectsList data={projects} />
    </>
  )
}
