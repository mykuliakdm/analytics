import { SquareArrowOutUpRight } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { IProject } from '@/utils/types'

const ProjectData = ({ project }: { project: IProject }) => {
  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">
        {project.name}
      </h1>
      <Alert>
        <SquareArrowOutUpRight className="h-4 w-4" />
        <AlertTitle>
          <a href={project.url} target="_blank">
            {project.url}
          </a>
        </AlertTitle>
        <AlertDescription>Some details</AlertDescription>
      </Alert>

      <div className="flex w-full items-center space-x-2 mt-4">
        <Input
          type="text"
          defaultValue={`<script src="https://cdn.jsdelivr.net/gh/artemats/analytics/scripts/analytics-1.0.5.js?id=${project._id}"></script>`}
        />
        <Button type="submit">Copy</Button>
      </div>
    </>
  )
}

export default ProjectData
