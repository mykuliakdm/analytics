'use client'

import { useCallback, useEffect, useState } from 'react'
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
import { IProject } from '@/utils/types'
import { Button } from '@/components/ui/button'
import { Trash, Eye } from 'lucide-react'
import AlertInfo from '@/components/AlertInfo/AlertInfo'
import { getAPI } from '@/utils/fetching/getAPI'
import { PAGINATION } from '@/config/constants'
import { Skeleton } from '@/components/ui/skeleton'

export default function ProjectsList() {
  const [projects, setProjects] = useState<IProject[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    let isMounted = true
    setIsLoading(true)

    const fetchProjects = async () => {
      try {
        if (isMounted) {
          const { data } = await getAPI(`/api/projects`)
          setProjects(data)
        }
      } catch (error) {
        console.error('Failed to fetch projects: ', error)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchProjects()

    return () => {
      isMounted = false
    }
  }, [])

  const handleRemove = useCallback(() => {
    console.log('Removing project')
  }, [])

  if (projects && projects.length > 0) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>URL</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project._id}>
              <TableCell>1</TableCell>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.url}</TableCell>
              <TableCell>
                {format(project.createdAt, 'dd/MM/yyyy HH:mm')}
              </TableCell>
              <TableCell>
                <div className="flex gap-x-4 justify-end">
                  <Button variant="outline" asChild>
                    <Link href={`/project/${project._id}/visits`}>
                      <Eye />
                    </Link>
                  </Button>
                  <Button variant="ghost" onClick={handleRemove}>
                    <Trash />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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

  return (
    <AlertInfo
      title="You don't have any projects yet"
      description="To work with our app, you need to create a project"
    />
  )
}
