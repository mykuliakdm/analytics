'use client'

import { useCallback } from 'react'
import { SquareArrowOutUpRight } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { format } from 'date-fns'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

const ProjectData = ({ project: _project }: { project: string }) => {
  const project = JSON.parse(_project)
  const { toast } = useToast()

  const src = `<script async  src="https://cdn.jsdelivr.net/gh/mykuliakdm/analytics/public/scripts/analytics-1.0.5.js?id=${project._id}"></script>`

  const handleCopy = useCallback(async () => {
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(src)
      toast({
        title: 'CDN link was successfully copied!',
      })
    } else {
      toast({
        variant: 'destructive',
        title: 'Oops, failed to copy!',
        description: 'Please try again.',
      })
    }
  }, [src, toast])

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
        <AlertDescription>
          Created: {format(project.createdAt, 'dd EEE, MMM yyyy')}
        </AlertDescription>
      </Alert>

      <h4 className="scroll-m-20 text-md font-semibold tracking-tight mt-6 mb-1">
        Copy CDN Link for Easy Integration
      </h4>
      <div className="flex w-full items-center space-x-2">
        <Input type="text" defaultValue={src} readOnly />
        <Button type="submit" onClick={handleCopy}>
          Copy
        </Button>
      </div>
    </>
  )
}

export default ProjectData
