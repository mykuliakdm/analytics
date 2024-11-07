import ProjectsList from '@/components/ProjectsList/ProjectsList'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Projects() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">
          All my projects
        </h1>
        <Button asChild>
          <Link href="/projects/create">Create project</Link>
        </Button>
      </div>
      <ProjectsList />
    </>
  )
}
