'use client'

import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { format } from 'date-fns'
import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { IProject } from '@/utils/types'
import { Button } from '@/components/ui/button'
import {
  Trash,
  Eye,
  Pencil,
  Circle,
  CircleCheck,
  Unplug,
  ChartNoAxesColumnIncreasing,
} from 'lucide-react'
import AlertInfo from '@/components/AlertInfo/AlertInfo'
import { getAPI } from '@/utils/fetching/getAPI'
import { PAGINATION } from '@/config/constants'
import { Skeleton } from '@/components/ui/skeleton'

export default function ProjectsList() {
  const [projects, setProjects] = useState<IProject[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = async (isMounted: boolean) => {
    setIsLoading(true)
    try {
      if (isMounted) {
        const { data } = await getAPI(`/api/projects`)
        setProjects(data)
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.error)
      } else {
        console.error('Unexpected error: ', error)
        setError('Something went wrong.')
      }
    } finally {
      if (isMounted) {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    let isMounted = true

    fetchProjects(isMounted)

    return () => {
      isMounted = false
    }
  }, [])

  const handleRemove = useCallback((projectId: string) => {
    axios.delete(`/api/project/${projectId}/delete`).then(({ status }) => {
      if (status === 200) {
        fetchProjects(true)
      }
    })
  }, [])

  if (projects && projects.length > 0) {
    return (
      <TooltipProvider>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead className="text-center">Google Analytics</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project, index) => (
              <TableRow key={project._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.url}</TableCell>
                <TableCell>
                  {format(project.createdAt, 'dd/MM/yyyy HH:mm')}
                </TableCell>
                <TableCell>
                  {project.google?.isConnected ? (
                    <CircleCheck className="w-5 h-5 text-green-600 mx-auto" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-300 mx-auto" />
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-x-4 justify-end">
                    {project.google?.propertyId &&
                    !project.google.isConnected ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" asChild>
                            <Link href={`/projects/${project._id}/ga/connect`}>
                              <Unplug />
                            </Link>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Integrate with Google Analytics</p>
                        </TooltipContent>
                      </Tooltip>
                    ) : project.google?.isConnected ? (
                      <Button variant="outline" asChild>
                        <Link href={`/projects/${project._id}/ga`}>
                          <ChartNoAxesColumnIncreasing className="text-orange-500" />
                        </Link>
                      </Button>
                    ) : (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span>
                            <Button variant="outline" disabled>
                              <Unplug />
                            </Button>
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>No Property ID</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                    <Button variant="outline" asChild>
                      <Link href={`/project/${project._id}/visits`}>
                        <Eye />
                      </Link>
                    </Button>
                    <Button variant="ghost" asChild>
                      <Link href={`/projects/${project._id}/edit`}>
                        <Pencil />
                      </Link>
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost">
                          <Trash />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you absolutely sure?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently
                            remove your data from our servers.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex items-center justify-end gap-x-2">
                          <DialogClose asChild>
                            <Button variant="ghost">Cancel</Button>
                          </DialogClose>
                          <Button
                            variant="outline"
                            onClick={() => handleRemove(project._id)}
                          >
                            Yes, remove project
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TooltipProvider>
    )
  }

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-1">
        {Array(PAGINATION.LIMIT)
          .fill({})
          .map((e, index) => (
            <Skeleton key={`visit-skeleton-${index}`} className="h-24 w-full" />
          ))}
      </div>
    )
  }

  if (error) {
    return (
      <>
        <AlertInfo title="Unauthorized Access." description={error} />
        <Button asChild>
          <Link href="/sign-in">Sign in</Link>
        </Button>
      </>
    )
  }

  return (
    <AlertInfo
      title="You don't have any projects yet."
      description="To work with our app, you need to create a project."
    />
  )
}
