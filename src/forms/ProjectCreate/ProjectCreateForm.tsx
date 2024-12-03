'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from '@/forms/ProjectCreate/schema'
import axios from 'axios'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { IProject } from '@/utils/types'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'

type Inputs = {
  name: string
  url: string
  propertyId?: string
}

type ProjectCreateFormProps = {
  title: string
  data?: IProject
}

const defaultValues = {
  name: '',
  url: '',
  propertyId: '',
}

const ProjectCreateForm = ({
  title,
  data: project,
}: ProjectCreateFormProps) => {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: project
      ? {
          name: project.name,
          url: project.url,
          propertyId: project.google?.propertyId || '',
        }
      : defaultValues,
  })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true)
    const part = project ? `${project._id}/edit` : 'create'
    axios
      .post(`/api/project/${part}`, { ...data })
      .then(({ data: { data }, status }) => {
        if (status === 200 || (status === 201 && data)) {
          router.push(`/projects`)
        }
      })
      .catch((error) => {
        toast({
          variant: 'destructive',
          title: error.response.data.error,
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">
        {title}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        data-test-id="project-form"
      >
        <div>
          <Label htmlFor="name">Project name</Label>
          <Input {...register('name')} id="name" autoComplete="new-name" />
          {errors.name?.message ? (
            <p className="mt-1 text-sm text-red-600 dark:text-red-500">
              {errors.name.message}
            </p>
          ) : null}
        </div>
        <div>
          <Label htmlFor="url">Web site URL</Label>
          <Input {...register('url')} id="url" autoComplete="new-url" />
          {errors.url?.message ? (
            <p className="mt-1 text-sm text-red-600 dark:text-red-500">
              {errors.url.message}
            </p>
          ) : null}
        </div>
        <div>
          <Label htmlFor="url">GA property ID</Label>
          <Input
            {...register('propertyId')}
            id="propertyID"
            autoComplete="new-propertyId"
          />
          {errors.propertyId?.message ? (
            <p className="mt-1 text-sm text-red-600 dark:text-red-500">
              {errors.propertyId.message}
            </p>
          ) : null}
        </div>
        <Button type="submit">
          {isLoading ? <Loader2 className="animate-spin" /> : null}Save data
        </Button>
      </form>
    </>
  )
}

export default ProjectCreateForm
