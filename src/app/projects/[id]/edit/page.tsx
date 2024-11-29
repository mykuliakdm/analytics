'use client'

import { useEffect, useState } from 'react'
import FormLayout from '@/components/FormLayout/FormLayout'
import ProjectCreateForm from '@/forms/ProjectCreate/ProjectCreateForm'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { IProject } from '@/utils/types'
import { getAPI } from '@/utils/fetching/getAPI'
import { Skeleton } from '@/components/ui/skeleton'

export default function ProjectEdit() {
  const { id } = useParams()
  const [project, setProject] = useState<IProject | null>(null)

  const fetchData = async () => {
    try {
      const { data } = await getAPI(`/api/project/${id}`)
      setProject(data)
      console.log('project ', data)
    } catch (error) {
      console.error('Failed to fetch data: ', error)
    }
  }

  useEffect(() => {
    let isMounted = true

    if (isMounted) {
      fetchData()
    }

    return () => {
      isMounted = false
    }
  }, [id])

  return (
    <>
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/projects">Projects</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <FormLayout>
        {project ? (
          <ProjectCreateForm title="Edit project" data={project} />
        ) : (
          <>
            <div className="flex flex-col gap-y-2">
              <Skeleton className="h-[48px] mb-8" />
              <Skeleton className="h-[64px]" />
              <Skeleton className="h-[64px]" />
              <Skeleton className="h-[64px]" />
              <Skeleton className="h-[40px]" />
            </div>
          </>
        )}
      </FormLayout>
    </>
  )
}
